import { useState } from 'react';

const usePlaceOrder = action => {
  const [orderItem, setOrderItem] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [editingOrder, setEditingOrder] = useState(null);

  const menuItemChosen = ({ target }) => setOrderItem(target.value);
  const menuQuantityChosen = ({ target }) => setQuantity(target.value);

  return {
    editingOrder,
    setEditingOrder,

    orderItem,
    setOrderItem,

    quantity,
    setQuantity,

    menuItemChosen,
    menuQuantityChosen,
  };
};
export default usePlaceOrder;
