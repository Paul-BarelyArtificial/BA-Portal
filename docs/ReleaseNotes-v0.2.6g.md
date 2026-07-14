# BA Portal v0.2.6g – Collection Box Colour Revert

## Changes
- Reverted the Collection group box back to the original, more subtle blue tint from v0.2.6e (border `rgba(94, 140, 232, 0.35)`, background `rgba(45, 76, 148, 0.14)`) — the stronger v0.2.6f version was too saturated.
- Bumped the cache-busting version again, since v0.2.6f had already been deployed and loaded by at least one browser.

## Testing
1. Hard-refresh the Portal.
2. Open Your Library and confirm the Collection box has the softer blue tint, not the strong saturated one from the previous release.
