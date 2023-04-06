import { requestHandler } from './request-handler.service';

export const ordersService = {
  getOrdersList,
  createOrder,
  editOrder,
  deleteOrder,
};

function getOrdersList() {
  return requestHandler.makeRequest('GET', 'current-orders')
    .then(({ success, orders }) => {
      if (!success) {
        console.log('Error getting orders');

        return Promise.reject('Error getting orders');
      }

      return orders;
    });
}

function createOrder(body = {}) {
  const { orderItem, quantity, orderedBy } = body;

  return requestHandler.makeRequest('POST', 'add-order', {
    order_item: orderItem,
    quantity,
    ordered_by: orderedBy || 'Unknown!',
  })
  .then(response => {
    if (!response || !response.success) {
      console.log('Error creating order');

      return Promise.reject('Error getting orders');
    }

    return response;
  });
}

function editOrder(body = {}) {
  const { id, orderItem, quantity, orderedBy } = body;

  console.log( 'edit' );
  console.log( body );

  return requestHandler.makeRequest('POST', 'edit-order', {
    id,
    order_item: orderItem,
    quantity,
    ordered_by: orderedBy || 'Unknown!',
  })
  .then(response => {
    if (!response || !response.success) {
      console.log('Error editing order');

      return Promise.reject('Error getting orders');
    }

    return response;
  });
}

function deleteOrder(id) {
  return requestHandler.makeRequest('POST', 'delete-order', { id })
    .then(response => {
      if (!response || !response.success) {
        console.log('Error getting orders');

        return Promise.reject('Error deleting order');
      }

      return response;
    });
}
