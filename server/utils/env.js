/**
 * A helper to get environment variables
 * @param {String} key The environment variable
 * @param {*} [defaultValue=null] The value to return if the variable does not exist
 * @return {String} The environment varibal value
 */
export default function env(key, defaultValue = null) {
  if (process.env[key]) {
    return process.env[key];
  } else {
    return defaultValue;
  }
}
