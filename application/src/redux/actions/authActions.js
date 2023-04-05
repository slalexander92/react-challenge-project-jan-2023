import { LOGIN, LOGOUT } from './types';
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

export const loginUser = (email, password) => {
    return (dispatch) => {
        requestHandler.makeRequest('POST', 'login', {
            email,
            password
        })
        .then(({ success, email, token }) => {
            if (!success) return console.log('login failed');

            dispatch(finishLogin(email, token));
        });
    };
}

export const logoutUser = () => {
    return {
        type: LOGOUT,
        payload: null,
    }
}
