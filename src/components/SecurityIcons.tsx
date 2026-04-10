import Image from "next/image";
import { SECURITY_ICON_SRC, type SecurityIconId } from "@/data/security";

export function SecurityIcon({
  name,
  className = "",
}: {
  name: SecurityIconId;
  className?: string;
}) {
  const src = SECURITY_ICON_SRC[name];
  return (
    <span
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-gunmetal/10 p-1.5 ${className}`.trim()}
    >
      <Image
        src={src}
        alt=""
        width={40}
        height={40}
        unoptimized
        className="max-h-9 w-full object-contain transition-[filter] duration-normal group-hover:brightness-0 group-hover:invert"
      />
    </span>
  );
}
