import { post } from './http';
import { API_VERSION } from './constants';

/**
 * Checks if there is a workspace key
 * @returns {Boolean} A boolean indicating if the workspace is set or not
 */
export function hasWorkspaceKey() {
  return getWorkSpaceKey() !== null;
}

/**
 * Returns the workspace key if it exists
 * @return {String} The workspace key
 */
export function getWorkSpaceKey() {
  return window.localStorage.getItem('blink:workspace:key');
}

export function setWorkSpaceId(id) {
  return post(`${API_VERSION}/workspaces`, { id }).then(({ id, key }) => {
    // window.localStorage.setItem('blink:workspace:key', id);

    return { id, key };
  });
}
