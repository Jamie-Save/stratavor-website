const DEFAULT_BOOK_DEMO_CALENDAR =
  "https://stratavor.com/meetings/jamie-saveall/group-schedule";

/** HubSpot group schedule — used for "Book a demo" CTAs site-wide. Override via NEXT_PUBLIC_BOOK_DEMO_CALENDAR_URL. */
export const BOOK_DEMO_CALENDAR_URL =
  (typeof process !== "undefined" &&
    process.env.NEXT_PUBLIC_BOOK_DEMO_CALENDAR_URL?.trim()) ||
  DEFAULT_BOOK_DEMO_CALENDAR;

/** Contact form deep links (must stay in sync with contact page handling). */
export const CONTACT_LOGIN_URL = "/contact?intent=login";
export const CONTACT_DEMO_URL = "/contact?intent=demo";
export const CONTACT_PILOT_URL = "/contact?intent=pilot";
export const CONTACT_SECURITY_URL = "/contact?intent=security";
export const CONTACT_GENERAL_URL = "/contact?intent=general";
