# BA Portal v0.2.7b – Quota Increment Fix

## Changes
- Fixed `Missing or insufficient permissions` right after a successful file upload. The Storage upload and the Library record were both succeeding, but the next step — recording the file size against the customer's quota — used a read-then-write transaction that first read the customer's own record. Customers were never granted read access to that record (it can hold internal admin notes), only a narrow permission to raise the one usage field.
- Replaced the transaction with a plain `FieldValue.increment()` update, which doesn't need to read the current value first, so it works within the existing narrow write permission without exposing the rest of the customer record.

## Testing
1. Hard-refresh the Portal.
2. Upload a document again and confirm it completes successfully end to end (no errors at any stage).
3. Confirm it appears in Your Uploads as "Under review".
4. In the Console, confirm the uploading customer's "Uploads used" reflects the file size.
