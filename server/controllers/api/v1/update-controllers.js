import {
  getUpdateDetails,
  getUpdateStatus,
  startUpdate,
} from '../../../services/updates';
import { respondServerError, respondOk } from '../../../utils/http-responses';

export function getUpdateDetailsController(req, res) {
  getUpdateDetails()
    .then(updateDetails => respondOk(res, updateDetails))
    .catch(error => respondServerError(res, error.message));
}

export function getUpdateStatusController(req, res) {
  getUpdateStatus()
    .then(updateStatus => respondOk(res, updateStatus))
    .catch(error => respondServerError(res, error.message));
}

export function startUpdateController(req, res) {
  const workspace = res.locals.workspaceId;

  startUpdate({ workspace })
    .then(updateStatus => respondOk(res, updateStatus))
    .catch(error => respondServerError(res, error.message));
}
