import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { requestHandler } from '../../services/request-handler.service';

import { OrderForm, Template } from '../../components';
import OrdersList from './ordersList';
import './viewOrders.css';
import Modal from '../modal/modal';

import usePlaceOrder from '../../hooks/usePlaceOrder';

export default function ViewOrders(props) {
    const [orders, setOrders] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const auth = useSelector((state) => state.auth);

    const {
        menuItemChosen,
        menuQuantityChosen,

        editingOrder,
        setEditingOrder,

        orderItem,
        setOrderItem,

        quantity,
        setQuantity,
    } = usePlaceOrder();

    useEffect(() => {
        requestHandler.makeRequest('GET', 'current-orders')
            .then(({ success, orders }) => {
                if (!success) {
                    console.log('Error getting orders');

                    return;
                }

                setOrders(orders);
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

    const submitEditOrder = () => {
        requestHandler.makeRequest('POST', 'edit-order', {
            id: editingOrder._id,
            order_item: orderItem,
            quantity,
            ordered_by: auth.email || 'Unknown!',
        })
        .then(response => console.log("Success", JSON.stringify(response)))
        .catch(error => console.error(error));
    }

    const deleteOrder = order => {
        requestHandler.makeRequest('POST', 'delete-order', { id: order._id })
            .then(response => console.log("Success", JSON.stringify(response)))
            .catch(error => console.error(error));
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
