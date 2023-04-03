import React from 'react';
import { Template } from '../../components';
import { OrderForm } from '../../components';
import './order.css';
import usePlaceOrder from '../../hooks/usePlaceOrder';

export default function Order(props) {
    const {
        menuItemChosen,
        menuQuantityChosen,
        orderItem,
        submitOrder,
        quantity,
    } = usePlaceOrder();

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
