import { post, get, del } from './http';
import { API_VERSION } from './constants';

const LS_WORKSPACE_KEY = 'blink:workspace:key';

/**
 * Checks if there is a workspace key
 * @returns {Boolean} A boolean indicating if the workspace is set or not
 */
export function hasWorkspaceKey() {
  return getWorkspaceKey() !== null;
}

/**
 * Returns the workspace key if it exists
 * @return {String} The workspace key
 */
export function getWorkspaceKey() {
  return window.localStorage.getItem(LS_WORKSPACE_KEY);
}

export function removeWorkspaceKey() {
  window.localStorage.removeItem(LS_WORKSPACE_KEY);
}

export function setWorkspaceId(id) {
  return post(`${API_VERSION}/workspaces`, { id }).then(({ id, key }) => {
    window.localStorage.setItem(LS_WORKSPACE_KEY, key);

    return { id, key };
  });
}

export function verifyWorkspaceKey(key) {
  return get(`${API_VERSION}/workspaces/${key}`);
}

export function exitWorkspace(key) {
  return del(`${API_VERSION}/workspaces/${key}`);
}
