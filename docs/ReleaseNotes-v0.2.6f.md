# BA Portal v0.2.6f – Collection Box Colour

## Changes
- Made the Collection group box a much stronger, unmistakable dark blue (previously too subtle to read as a real colour change against the dark background).
- Bumped the cache-busting version, since the previous release (v0.2.6e) had already been loaded once — without this bump, browsers that had already visited the Portal could keep serving the old, unchanged CSS even after the new file was deployed.

## Testing
1. Hard-refresh the Portal (Cmd+Shift+R) to make sure you're not looking at a cached copy.
2. Open Your Library and confirm the Collection box now has a clearly blue-tinted background and border, obviously different from the rest of the page.
