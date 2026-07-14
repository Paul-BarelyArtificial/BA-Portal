# BA Portal v0.2.7 – Customer Uploads

## Changes
- New "Share a Document" page: customers can upload a file, give it a title (prefilled from the filename, editable), and write a short summary of why it's useful.
- Limits: 20 MB per file, 500 MB total — enforced by Firebase itself (Firestore and Storage rules), not just the form, so it can't be accidentally or deliberately bypassed.
- A "Your Uploads" list on the same page shows everything you've submitted with its review status: "Under review" while waiting, "Shared with you" once published back to you, or "Archived".
- Uploaded documents are private by default — only visible to Barely Artificial for review — until reviewed and shared back.

## Requires Console-side setup
This release only works once the matching Firestore and Storage rules are published — see the Console repo's `docs/firestore.rules.txt` and `docs/storage.rules.txt`, and its v0.2.8b release notes.

## Testing
1. Sign in as a customer and open Share a Document.
2. Choose a file and confirm the title field auto-fills from the filename.
3. Fill in a summary and submit. Confirm a success message and that it appears in Your Uploads as "Under review".
4. Try a file over 20 MB and confirm it's rejected with a clear message before upload starts.
5. In the Console, confirm the item appears (search "Customer") as Draft/Internal, then publish it back to this customer.
6. Reload Your Uploads in the Portal and confirm the status changed to "Shared with you".
