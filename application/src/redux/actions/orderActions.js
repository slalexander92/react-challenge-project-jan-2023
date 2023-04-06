import { GET_ORDERS } from './types';
import { ordersService } from '../../services/orders.service';

export const setOrders = orderList => {
  return {
    type: GET_ORDERS,
    payload: { orderList },
  }
}

export const getOrders = () => {
  return dispatch => {
    return ordersService.getOrdersList()
      .then((orders) => {
        dispatch(setOrders(orders));
      });
  }
}
