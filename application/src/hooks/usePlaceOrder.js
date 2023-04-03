
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { SERVER_IP } from '../private';
const ADD_ORDER_URL = `${SERVER_IP}/api/add-order`;
const EDIT_ORDER_URL = `${SERVER_IP}/api/edit-order`;
const DELETE_ORDER_URL = `${SERVER_IP}/api/delete-order`;

const usePlaceOrder = action => {
  const [orderItem, setOrderItem] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [editingOrder, setEditingOrder] = useState(null);

  const auth = useSelector((state) => state.auth);

  const menuItemChosen = ({ target }) => setOrderItem(target.value);
  const menuQuantityChosen = ({ target }) => setQuantity(target.value);

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
    .then(response => console.log("Success", JSON.stringify(response)))
    .catch(error => console.error(error));
  }

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

const deleteOrder = order => {
    fetch(DELETE_ORDER_URL, {
        method: 'POST',
        body: JSON.stringify({ id: order._id }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(response => console.log("Success", JSON.stringify(response)))
    .catch(error => console.error(error));
}

  return {
    editingOrder,
    setEditingOrder,

    orderItem,
    setOrderItem,

    quantity,
    setQuantity,

    menuItemChosen,
    menuQuantityChosen,

    submitOrder,
    submitEditOrder,
    deleteOrder,
  };
};
export default usePlaceOrder;
