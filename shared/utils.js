export function isValidWorkspaceId(id) {
  return /^[a-zA-Z0-9.\-@]{6,50}$/.test(id);
}
