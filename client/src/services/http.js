import { hasWorkspaceKey, getWorkspaceKey } from './workspace';

/**
 * Cnfigures the headers
 * @param {Headers} [headers] Optional headers obejct
 * @return {Headers} The configured headers oject
 */
function configureHeaders(headers = new window.Headers()) {
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  if (hasWorkspaceKey()) {
    headers.append('Blink-Workspace-Key', getWorkspaceKey());
  }

  return headers;
}
/**
 * Makes a GET request using fetch
 * @param {String} url The url
 * @param {Object} options The fetch options
 * @return {Promise} Returns a promise for the request
 */
export async function get(url, options = {}) {
  try {
    options.headers = configureHeaders(options.headers);

    const response = await fetch(url, { ...options, method: 'GET' });
    const data = await response.json();

    if (response.ok) {
      return data;
    }

    throw new Error(data.message);
  } catch (e) {
    throw e;
  }
}

export async function post(url, data = null, options = {}) {
  if (data) {
    try {
      options.body = window.JSON.stringify(data);
    } catch (error) {
      throw error;
    }
  }

  try {
    options.headers = configureHeaders(options.headers);

    const response = await fetch(url, { ...options, method: 'POST' });
    const data = await response.json();

    if (response.ok) {
      return data;
    }

    throw new Error(data.message);
  } catch (e) {
    throw e;
  }
}

export async function del(url, options = {}) {
  try {
    options.headers = configureHeaders(options.headers);

    const response = await fetch(url, { ...options, method: 'DELETE' });
    const data = await response.json();

    if (response.ok) {
      return data;
    }

    throw new Error(data.message);
  } catch (e) {
    throw e;
  }
}
