import path from 'path';

/**
 * Returns the app root directory
 * @param {args} [appPath] Optional path
 * @return {String} The directory path
 */
export function appDir(...appPath) {
    if (appPath.length === 0) {
        return process.cwd();
    }

    return path.join(appDir(), ...appPath);
}

/**
 * Returns the app server directory
 * @param {args} [appPath] The optional path list
 * @return {String} The directory path
 */
export function appServerDir(...appPath) {
    return appDir('server', ...appPath);
}

/**
 * Returns the app server views directory
 * @param {args} [appPath] The optional path list
 * @return {String} The directory path
 */
export function appServerViewsDir(...appPath) {
    return appServerDir('views', ...appPath);
}

/**
 * Returns the app storage directory
 * @param {args} [appPath] The optional path list
 * @return {String} The directory path
 */
export function appStorageDir(...appPath) {
    return appDir('storage', ...appPath);
}

/**
 * Returns the app public storage directory
 * @return {String} The directory path
 */
export function appPublicStorageDir() {
    return appStorageDir('public');
}

/**
 * Returns the app client directory
 * @param {args} [appPath] The optional path list
 * @return {String} The directory path
 */
export function appClientDir(...appPath) {
    return appDir('client', ...appPath);
}

/**
 * Returns the app client build directory
 * @param {args} [appPath] The optional path list
 * @return {String} The directory path
 */
export function appClientBuildDir() {
    return appClientDir('build');
}
