import React from 'react';
import { dateService } from '../../services/date.service';

const OrdersList = (props) => {
    const { orders, openEditModal } = props;

    if (!props || !props.orders || !props.orders.length) return (
        <div className="empty-orders">
            <h2>There are no orders to display</h2>
        </div>
    );

    function formatDateTime(dateTime) {
        return dateService.convertDateTimeToTwelveHour(dateTime);
    }

    return orders.map(order => {
        const createdDate = new Date(order.createdAt);
        return (
            <div className="row view-order-container" key={order._id}>
                <div className="col-md-4 view-order-left-col p-3">
                    <h2>{order.order_item}</h2>
                    <p>Ordered by: {order.ordered_by || ''}</p>
                </div>
                <div className="col-md-4 d-flex view-order-middle-col">
                    <p>Order placed at {`${formatDateTime(createdDate)}`}</p>
                    <p>Quantity: {order.quantity}</p>
                </div>
                <div className="col-md-4 view-order-right-col">
                    <button className="btn btn-success" onClick={() => openEditModal(order)}>Edit</button>
                    <button className="btn btn-danger">Delete</button>
                </div>
            </div>
        );
    });
}

export default OrdersList;
