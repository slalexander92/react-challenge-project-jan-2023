import { useState } from 'react';

const usePlaceOrder = action => {
  const menuOptions = [
    'Soup of the Day',
    'Linguini With White Wine Sauce',
    'Eggplant and Mushroom Panini',
    'Chili Con Carne',
  ];

  const [orderItem, setOrderItem] = useState(menuOptions[0]);
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
