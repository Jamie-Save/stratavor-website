import { createOpenAI } from "@ai-sdk/openai";
import {
  convertToModelMessages,
  safeValidateUIMessages,
  streamText,
  type UIMessage,
} from "ai";
import { buildChatSystemPrompt } from "@/lib/chat-knowledge";

export const maxDuration = 60;

const MAX_MESSAGES = 20;
const MAX_USER_MESSAGE_CHARS = 2000;

function userMessageTooLong(messages: UIMessage[]): boolean {
  for (const m of messages) {
    if (m.role !== "user") continue;
    let len = 0;
    for (const part of m.parts ?? []) {
      if (part.type === "text") len += part.text.length;
    }
    if (len > MAX_USER_MESSAGE_CHARS) return true;
  }
  return false;
}

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Chat is not configured. Set OPENAI_API_KEY on the server." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body || typeof body !== "object" || !("messages" in body)) {
    return Response.json({ error: "Missing messages" }, { status: 400 });
  }

  const rawMessages = (body as { messages: unknown }).messages;
  if (!Array.isArray(rawMessages)) {
    return Response.json({ error: "messages must be an array" }, { status: 400 });
  }

  const validation = await safeValidateUIMessages({
    messages: rawMessages,
  });

  if (!validation.success) {
    return Response.json({ error: "Invalid message payload" }, { status: 400 });
  }

  let messages = validation.data as UIMessage[];
  messages = messages.slice(-MAX_MESSAGES);

  if (userMessageTooLong(messages)) {
    return Response.json(
      { error: `Each user message must be at most ${MAX_USER_MESSAGE_CHARS} characters.` },
      { status: 400 },
    );
  }

  let modelMessages;
  try {
    modelMessages = await convertToModelMessages(messages);
  } catch {
    return Response.json({ error: "Could not convert messages" }, { status: 400 });
  }

  const modelId = process.env.OPENAI_CHAT_MODEL ?? "gpt-4o-mini";
  const openai = createOpenAI({ apiKey });

  const result = streamText({
    model: openai(modelId),
    system: buildChatSystemPrompt(),
    messages: modelMessages,
    maxOutputTokens: 1024,
  });

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
  });
}
