import { hasWorkspaceKey, getWorkSpaceKey } from './workspace';

/**
 * Cnfigures the header
 * @param {Header} [header] Optional header obejct
 * @return {Header} The configured header oject
 */
function configureHeader(header = new window.Headers()) {
  header.append('Content-Type', 'application/json');
  header.append('Accept', 'application/json');
  if (hasWorkspaceKey()) {
    header.append('Blink-Workspace-Key', getWorkSpaceKey());
  }

  return header;
}
/**
 * Makes a GET request using fetch
 * @param {String} url The url
 * @param {Object} options The fetch options
 * @return {Promise} Returns a promise for the request
 */
export function get(url, options = {}) {
  options.header = configureHeader(options.header);

  return fetch(url, { ...options, method: 'GET' });
}
