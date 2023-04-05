import React from 'react';
import { useSelector } from 'react-redux';
import { Template } from '../../components';
import { OrderForm } from '../../components';
import './order.css';

import usePlaceOrder from '../../hooks/usePlaceOrder';
import { SERVER_IP } from '../../private';
const ADD_ORDER_URL = `${SERVER_IP}/api/add-order`;

export default function Order(props) {
    const {
        menuItemChosen,
        menuQuantityChosen,
        orderItem,
        quantity,
    } = usePlaceOrder();

    const auth = useSelector((state) => state.auth);

    const submitOrder = () => {
      if (orderItem === "") return;
      fetch(ADD_ORDER_URL, {
          method: 'POST',
          body: JSON.stringify({
              order_item: orderItem,
              quantity,
              ordered_by: auth.email || 'Unknown!',
          }),
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(res => res.json())
      .then(response => console.log('Success', JSON.stringify(response)))
      .catch(error => console.error(error));
  }

    return (
        <Template>
            <div className="form-wrapper">
              <OrderForm
                orderItem={orderItem}
                quantity={quantity}
                submitOrder={submitOrder}
                menuItemChosen={menuItemChosen}
                menuQuantityChosen={menuQuantityChosen}
              />
            </div>
        </Template>
    )
}
