# BA Portal v0.2.6b – My Meetings

## Changes
- Added a "Your Meetings" section to the top of the Book a Session page, showing each customer their own bookings from the Console's live `bookings` collection — grouped into Upcoming and Past, sorted chronologically.
- Each meeting card shows its title, type, date, time, duration and status, plus a notes field the customer can write in and save. These notes are visible to the admin in the Console.
- Customers can only ever read or edit their own bookings — matched the same way Library visibility already works, via the `customerAccess` mapping keyed on their sign-in email.
- Customers can only change the `customerNotes` field on a booking — nothing else about the record can be edited from the Portal.

## Requires a Firestore rules update
This release needs the `bookings` section of your Firestore security rules updated before it will work — the Console repo's `docs/firestore.rules.txt` has the full corrected file. Until that's published in the Firebase Console, customers will see "Your meetings could not be loaded. Check Firebase permissions."

## Testing
1. In the Console, ensure a customer has at least one booking with a past date/status "Completed" and one with a future date/status "Upcoming".
2. Sign in to the Portal as that customer and open Book a Session.
3. Confirm both meetings appear in the right group (Upcoming vs Past).
4. Add a note to one, click Save Notes, and confirm it shows "Saved."
5. Reload the page and confirm the note is still there.
6. In the Console, open that booking's detail panel and confirm the customer's note is visible there too.
7. Sign in as a different customer (or a customer with no bookings) and confirm they see "No meetings yet" and not the first customer's bookings.
