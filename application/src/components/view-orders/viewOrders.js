import React, { useEffect, useState } from 'react';
import { OrderForm, Template } from '../../components';
import { SERVER_IP } from '../../private';
import OrdersList from './ordersList';
import './viewOrders.css';
import Modal from '../modal/modal';

import usePlaceOrder from '../../hooks/usePlaceOrder';

export default function ViewOrders(props) {
    const [orders, setOrders] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        menuItemChosen,
        menuQuantityChosen,

        editingOrder,
        setEditingOrder,

        orderItem,
        setOrderItem,

        quantity,
        setQuantity,

        deleteOrder,
        submitEditOrder,
    } = usePlaceOrder();

    useEffect(() => {
        fetch(`${SERVER_IP}/api/current-orders`)
            .then(response => response.json())
            .then(response => {
                if(response.success) {
                    setOrders(response.orders);
                } else {
                    console.log('Error getting orders');
                }
            });
    }, [])

    useEffect(() => {
        if (editingOrder) {
            const { order_item, quantity } = editingOrder;

            setOrderItem(order_item);
            setQuantity(quantity);
        }
    }, [editingOrder]);

    useEffect(() => {
        if (!isModalOpen) {
            setOrderItem('');
            setQuantity('1');
        }
    }, [isModalOpen])

    function setupOrderEdit(order) {
        if (!order || !order._id) return setEditingOrder(null);

        return setEditingOrder(order);
    }

    function toggleModal(order = null) {
        setupOrderEdit(order);

        setIsModalOpen(!isModalOpen);
    }

    return (
        <Template>
            <div className="container-fluid">
                <OrdersList
                    orders={orders}
                    openEditModal={order => toggleModal(order)}
                    deleteOrder={order => deleteOrder(order)}
                />
            </div>

            <Modal isModalOpen={isModalOpen} closeModal={() => toggleModal()}>
                <OrderForm
                    orderItem={orderItem}
                    quantity={quantity}
                    submitOrder={submitEditOrder}
                    menuItemChosen={menuItemChosen}
                    menuQuantityChosen={menuQuantityChosen}
                />
            </Modal>
        </Template>
    );
}
