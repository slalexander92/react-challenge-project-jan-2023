import { requestHandler } from "./request-handler.service"

export const authService = {
  register,
}

function register(email, password) {
  return requestHandler.makeRequest('POST', 'sign-up', {
    email,
    password,
  })
  .then(response => {
    if (!response || !response.success) return Promise.reject(response.error);

    return response.data;
  })
}
