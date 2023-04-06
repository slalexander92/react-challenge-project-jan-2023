import React from 'react';
import { useSelector } from 'react-redux';
import { Template } from '../../components';
import { OrderForm } from '../../components';
import { ordersService } from '../../services/orders.service';
import './order.css';

import usePlaceOrder from '../../hooks/usePlaceOrder';

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

        const orderedBy = auth && auth.email

        ordersService.createOrder({
            orderItem,
            quantity,
            orderedBy,
        })
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
