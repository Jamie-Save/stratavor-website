const DEFAULT_BOOK_DEMO_CALENDAR =
  "https://meetings-eu1.hubspot.com/jamie-saveall/group-schedule";

/** HubSpot group schedule — used for "Book a demo" CTAs site-wide. Override via NEXT_PUBLIC_BOOK_DEMO_CALENDAR_URL. */
export const BOOK_DEMO_CALENDAR_URL =
  (typeof process !== "undefined" &&
    process.env.NEXT_PUBLIC_BOOK_DEMO_CALENDAR_URL?.trim()) ||
  DEFAULT_BOOK_DEMO_CALENDAR;

/** Contact form deep links (must stay in sync with contact page handling). */
export const CONTACT_LOGIN_URL = "https://app.stratavor.com/login";
/** Same as BOOK_DEMO_CALENDAR_URL — demo bookings use HubSpot; /contact?intent=demo redirects there. */
export const CONTACT_DEMO_URL = BOOK_DEMO_CALENDAR_URL;
export const CONTACT_PILOT_URL = "/contact?intent=pilot";
export const CONTACT_SECURITY_URL = "/contact?intent=security";
export const CONTACT_GENERAL_URL = "/contact?intent=general";
