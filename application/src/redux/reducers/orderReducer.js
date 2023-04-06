import { GET_ORDERS } from '../actions/types';
const INITIAL_STATE = { orderList: [] };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ORDERS:
        return { ...state, orderList: action.payload.orderList };
    default:
        return state;
  }
}
