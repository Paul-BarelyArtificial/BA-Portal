# BA Portal v0.2.7a – Storage SDK Fix

## Changes
- Fixed `TypeError: firebase.storage is not a function` when trying to upload a document. The Portal had never needed the Firebase Storage SDK before this release — the Library page only ever linked to a `downloadUrl` string already stored in Firestore, it never called the Storage SDK directly. Customer Uploads was the first feature to actually call `firebase.storage()`, and the `firebase-storage-compat.js` script tag was missing from `index.html`. Added it, matching the Console (which already loads it, since it does its own uploads).

## Testing
1. Hard-refresh the Portal.
2. Open the browser console and confirm `typeof firebase.storage` is `"function"`.
3. Try uploading a document again and confirm it completes successfully this time.
