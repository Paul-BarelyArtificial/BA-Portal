# BA Portal v0.2.6 – Live Customer Library

## Changes
- Portal reads published items from the Firestore library collection.
- All Customers and Selected Customers visibility are supported.
- Internal and Draft items are not displayed.
- Files and website links open from Library cards.
- Customer identity is resolved through customerAccess using the signed-in email address.

## Testing
1. Ensure the Console customer contact email matches the Portal login email.
2. Open the Console once to create/synchronise the customerAccess mapping.
3. Create a Published All Customers item.
4. Create a Published Selected Customers item for the test customer.
5. Create an Internal item and a Draft item.
6. Sign into the Portal.
7. Confirm the two published permitted items appear.
8. Confirm Internal and Draft items do not appear.
9. Open one file and one link.
