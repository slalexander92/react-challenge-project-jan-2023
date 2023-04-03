import React, { useState, useEffect } from 'react';
import { OrderForm, Template } from '../../components';
import { SERVER_IP } from '../../private';
import OrdersList from './ordersList';
import './viewOrders.css';
import Modal from '../modal/modal';

export default function ViewOrders(props) {
    const [orders, setOrders] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(true);

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

    function toggleModal() {
        setIsModalOpen(!isModalOpen);
    }

    return (
        <Template>
            <div className="container-fluid">
                <OrdersList
                    orders={orders}
                />
            </div>

            <Modal isModalOpen={isModalOpen} closeModal={() => toggleModal()}>
                <OrderForm />
            </Modal>
        </Template>
    );
}