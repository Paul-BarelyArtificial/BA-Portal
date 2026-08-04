# Customer Portal — User Manual

An internal reference for what a signed-in customer sees and can do in the Portal — useful for supporting customers, onboarding a new team member, or just remembering how it all fits together. For the technical/data-model side, see the Console repo's `docs/ARCHITECTURE.md` and `docs/FIREBASE.md` (both apps share one Firebase project).

Keep this updated as features change — check the Console repo's `docs/ChangeLog.md` for the most recent changes across both apps.

## Signing in

A customer signs in with an email and password created for them via the Console (see the Console manual's "Portal invite" section). There's no self-service sign-up — an account only exists once an admin has created it, and a customer only ever sees content once their contact email is linked to a real Customer record in the Console (via the `customerAccess` mapping, kept in sync automatically).

On narrow/mobile screens, the sidebar navigation collapses behind a ☰ button next to "BA Portal" — tap it to open the menu, tap any section to jump there (the menu closes itself automatically). On wider screens the sidebar is always visible as before.

If a signed-in customer isn't linked to a customer record yet (or their customer has been archived — see below), most pages will show a message like "your account is signed in, but it has not yet been linked to a customer," and Your Library / Your Bookings / Share a Document will all appear empty.

## Your Dashboard

A welcome screen with a couple of quick-access cards (Open Resources, Book a Session) and a short "what's new" list.

If Barely Artificial has left a personal note for this customer, it appears as a highlighted card near the top of the page (e.g. "Hi Paul, welcome to the portal, it was great catching up yesterday."). It only shows up when a note has actually been set — otherwise this card doesn't appear at all.

## Your Library

Everything the customer is allowed to see: documents, templates, downloads and links, grouped by Category (Training, Document, Template, Download).

- Only **Published** items are ever visible — anything Draft or Archived in the Console simply doesn't appear.
- Visibility rules: an item shows up if it's set to "All Customers", or "Selected Customers" and this specific customer is one of the selected ones.
- **Collections**: if several items share a Collection tag (set in the Console), they cluster together under a labelled, coloured box within their category, with each card also showing a "Part of {collection}" tag — e.g. every part of a training course grouped visually together.
- Customers can search the library and open/download each item via its own button.
- If an archived customer somehow tries to view this page, it will be empty even though their login still works — that's expected, not a bug (see the Console manual's "Archiving a customer" section for why).

## Your Training

A dedicated Training page (currently mostly placeholder course cards) plus a "Book a Training Session" shortcut that opens the same Calendly booking widget as Your Bookings.

## Share a Document

Customers can upload a file directly, with a title (auto-suggested from the filename, editable) and a short summary of why it's useful.

- **Limits**: 20 MB per file, 500 MB total per customer — enforced by Firebase itself (not just the form), so it can't be bypassed.
- Every upload lands as **Draft/Internal** behind the scenes — completely invisible to anyone, including the customer who uploaded it, until an admin reviews it in the Console's Library section and decides whether/how to publish it.
- **Your Uploads**: a list on the same page showing everything that customer has submitted and its status — "Under review" while waiting, "Shared with you" once an admin has published it back to them, or "Archived".

## Support

A simple page pointing customers to book a session if they need help, plus a placeholder "Contact Barely Artificial" card (not yet wired to real contact details).

## Your Bookings

- **Book a New Session**: a few session type cards (Training Session, AI Advice, Project/Strategy Session) — all currently open the same real Calendly booking link (a Calendly popup widget, not a page redirect).
- **My Meetings**: bookings logged for this customer in the Console appear here automatically, split into Upcoming and Past. Each shows title, type, date, time, duration and status.
- Customers can add their own **notes** to any of their meetings — these are visible to admins in the Console's Bookings section, so it's useful for a customer to jot down what they want to discuss ahead of a session, or a summary afterward.
- This is a manual, admin-maintained log, not a live Calendly sync — a booking only appears here once an admin has logged it in the Console.

## Your Account

Shows the customer's own details (customer name, project name, contact name, access status) and their signed-in email address, plus a sign-out button. Nothing here is currently editable by the customer themselves.
