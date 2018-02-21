import { get, post } from './http';
import { API_VERSION } from './constants';

export async function getUpdateDetails() {
  return get(`${API_VERSION}/updates`);
}

export async function startUpdate() {
  return post(`${API_VERSION}/updates`);
}

export async function checkUpdateStatus() {
  return get(`${API_VERSION}/updates/status`);
}
