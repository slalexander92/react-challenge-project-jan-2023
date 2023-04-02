import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from '../../redux/store';

import ViewOrders from './viewOrders';

describe('View Orders', () => {
    test('view orders renders', () => {
        render (
            <Provider store={store}>
                <BrowserRouter>
                    <ViewOrders />
                </BrowserRouter>
            </Provider>
        )
    });
})
