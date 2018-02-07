import { get } from './http';
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

/**
 * Verifies the workspace key
 * @param {String} key The workspace key
 * @return {Promise} The request promise
 */
export function verifyWorkSpaceKey(key) {
  return get(`${API_VERSION}/workspace/${key}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(
        'Could not verify your workspace. Please refresh the page.'
      );
    })
    .catch(error => {
      console.log(error.message);
      throw new Error(`Error: ${error.message}`);
    });
}
