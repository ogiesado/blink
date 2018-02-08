import { hasWorkspaceKey, getWorkSpaceKey } from './workspace';

/**
 * Cnfigures the headers
 * @param {Headers} [headers] Optional headers obejct
 * @return {Headers} The configured headers oject
 */
function configureHeaders(headers = new window.Headers()) {
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  if (hasWorkspaceKey()) {
    headers.append('Blink-Workspace-Key', getWorkSpaceKey());
  }

  return headers;
}
/**
 * Makes a GET request using fetch
 * @param {String} url The url
 * @param {Object} options The fetch options
 * @return {Promise} Returns a promise for the request
 */
export function get(url, options = {}) {
  options.headers = configureHeaders(options.headers);

  return fetch(url, { ...options, method: 'GET' });
}

export function post(url, data = null, options = {}) {
  options.headers = configureHeaders(options.headers);

  if (data) {
    options.body = window.JSON.stringify(data);
  }

  return fetch(url, { ...options, method: 'POST' })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`Request error: ${response.statusText}`);
    })
    .catch(error => {
      throw error;
    });
}
