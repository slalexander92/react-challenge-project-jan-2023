import { LOGIN, LOGOUT, LOGIN_ERROR } from './types';
import { requestHandler } from '../../services/request-handler.service';

const finishLogin = (email, token) => {
    return {
        type: LOGIN,
        payload: {
            email,
            token,
        }
    }
}

const setLoginError = errorMessage => {
    return {
        type: LOGIN_ERROR,
        payload: {
            errorMessage,
        }
    }
}

export const loginUser = (email, password) => {
    return (dispatch) => {
        requestHandler.makeRequest('POST', 'login', {
            email,
            password
        })
        .then(response => {
            console.log(response);
            if (!response || !response.success) return Promise.reject(response);

            dispatch(finishLogin(response.email, response.token));
        })
        .catch(({ error }) => {
            dispatch(setLoginError(error));

            // automatically clear login error
            setTimeout(() => {
                dispatch(setLoginError(null))
            }, 2000);
        })
    };
}

export const logoutUser = () => {
    return {
        type: LOGOUT,
        payload: null,
    }
}
