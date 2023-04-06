import { SERVER_IP } from '../private';
const BASE_URL = `${SERVER_IP}/api`;

export const requestHandler = {
  makeRequest,
};


function makeRequest(method, endpoint, data = {}) {
  if (!endpoint) return Promise.reject('Missing endpoint');

  const url = `${BASE_URL}/${endpoint}`;

  const config = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };

  if (method === 'POST') config.body = JSON.stringify(data);

  return fetch(url, config).then(response => response.json());
}
