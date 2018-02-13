import { get } from './http';
import { API_VERSION } from './constants';

export async function getUpdateDetails() {
  return get(`${API_VERSION}/updates`);
}
