import React from 'react';
import './orderForm.css';

export default function OrderForm(props) {
    const FOOD_OPTIONS = [
        'Soup of the Day',
        'Linguini With White Wine Sauce',
        'Eggplant and Mushroom Panini',
        'Chili Con Carne',
    ];

    const MenuOptions = () => {
        const foodOptions = FOOD_OPTIONS.map((name, index) => {
            return (<option value={name} key={`menu-option-${index}`}>{name}</option>);
        });

        const defaultOption = (<option value="" defaultValue disabled hidden key="default">Lunch menu</option>);

        return ([defaultOption, ...foodOptions]);
    }


    return (
        <form>
            <label className="form-label">I'd like to order...</label>
            <br />
            <select
                value={props.orderItem}
                onChange={(event) => props.menuItemChosen(event)}
                className="menu-select"
            >
                {<MenuOptions />}
            </select>

            <br />

            <label className="qty-label">Qty:</label>
            <select value={props.quantity} onChange={(event) => props.menuQuantityChosen(event)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
            </select>
            <button type="button" className="order-btn" onClick={() => props.submitOrder()}>Order It!</button>
        </form>
    )
}
