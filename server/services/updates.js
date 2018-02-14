import {
  getRedisClient,
  REDIS_UPDATE_DETAILS_KEY,
  REDIS_UPDATE_STATUS_KEY,
} from '../utils/redis';

export function getUpdateDetails() {
  return getRedisClient()
    .get(REDIS_UPDATE_DETAILS_KEY)
    .then(JSON.parse);
}

export function setUpdateDetails({
  lastUpdate = '-',
  totalRecords = 0,
  lastUpdateBy = '-',
} = {}) {
  return getRedisClient().set(
    REDIS_UPDATE_DETAILS_KEY,
    JSON.stringify({ lastUpdate, totalRecords, lastUpdateBy })
  );
}

export function getUpdateStatus() {
  return getRedisClient()
    .get(REDIS_UPDATE_STATUS_KEY)
    .then(JSON.parse);
}

export function setUpdateStatus({
  isUpdating = false,
  hasError = false,
  message = '',
  startedBy = '',
  logs = [],
} = {}) {
  return getRedisClient().set(
    REDIS_UPDATE_STATUS_KEY,
    JSON.stringify({ isUpdating, hasError, message, startedBy, logs })
  );
}

export async function startUpdate({ workspace }) {
  try {
    const updateStatus = await getUpdateStatus();
    if (updateStatus.isUpdating) {
      return updateStatus;
    } else {
      updateStatus.isUpdating = true;
      updateStatus.startedBy = workspace;
      updateStatus.hasError = false;
      updateStatus.message = 'Checking for GLEIF update';

      await setUpdateStatus(updateStatus);

      return updateStatus;
    }
  } catch (error) {
    throw error;
  }
}
