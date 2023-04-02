import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../redux/store';

import LoginForm from './loginForm';

describe('Login Form', () => {
    test('form renders', () => {
        render(
            <Provider store={store}>
                <LoginForm />
            </Provider>
        );

        // there should be a properly labelled email field
        expect(screen.getByLabelText('Email')).toBeInTheDocument();

        // there should be a password field
        expect(screen.getByLabelText('Password')).toBeInTheDocument();

        // there should be a login button
        expect(screen.getByRole('button')).toBeInTheDocument();
    })
});
