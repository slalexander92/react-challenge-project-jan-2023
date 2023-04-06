import { GET_ORDERS } from './types';
import { requestHandler } from '../../services/request-handler.service';

export const setOrders = orderList => {
  return {
    type: GET_ORDERS,
    payload: { orderList },
  }
}

export const getOrders = () => {
  return dispatch => {
    return requestHandler.makeRequest('GET', 'current-orders')
      .then(({ success, orders }) => {
        if (!success) {
          console.log('Error getting orders');

          return Promise.reject('Error getting orders');
        }

        dispatch(setOrders(orders));
      });
  }
}
