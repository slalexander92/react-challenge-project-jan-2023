import React, { useState, useEffect } from 'react';
import { OrderForm, Template } from '../../components';
import { useSelector } from 'react-redux';
import { SERVER_IP } from '../../private';
import OrdersList from './ordersList';
import './viewOrders.css';
import Modal from '../modal/modal';

const EDIT_ORDER_URL = `${SERVER_IP}/api/edit-order`;

export default function ViewOrders(props) {
    const [orders, setOrders] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingOrder, setEditingOrder] = useState(null);

    const [orderItem, setOrderItem] = useState('');
    const [quantity, setQuantity] = useState('1');

    const auth = useSelector((state) => state.auth);

    const menuItemChosen = ({ target }) => setOrderItem(target.value);
    const menuQuantityChosen = ({ target }) => setQuantity(target.value);

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

    const submitEditOrder = () => {
        fetch(EDIT_ORDER_URL, {
            method: 'POST',
            body: JSON.stringify({
                id: editingOrder._id,
                order_item: orderItem,
                quantity,
                ordered_by: auth.email || 'Unknown!',
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => console.log("Success", JSON.stringify(response)))
        .catch(error => console.error(error));
    }

    function setupOrderEdit(order) {
        if (!order || !order._id) return setEditingOrder(null);

        return setEditingOrder(order);
    }

    function toggleModal(order) {
        setupOrderEdit(order);

        setIsModalOpen(!isModalOpen);
    }

    return (
        <Template>
            <div className="container-fluid">
                <OrdersList
                    orders={orders}
                    openEditModal={order => toggleModal(order)}
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
