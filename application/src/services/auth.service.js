import { requestHandler } from "./request-handler.service"

export const authService = {
  register,
}

function register(email, password) {
  return requestHandler.makeRequest('POST', 'sign-up', {
    email,
    password,
  })
  .then(({ success, data }) => {
    if (!success) return Promise.reject('Register Failed');

    return data;
  })
  .catch(error => {
    console.log(error);
  })
}
