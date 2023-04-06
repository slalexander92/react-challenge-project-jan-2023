import React from 'react';
import { Nav } from '../../components';
import './template.css';
import { useSelector } from 'react-redux';

const Template = props => {

    const auth = useSelector(((state) => state.auth))

    return (
        <div className="bg-layer">
            <div className="fg-layer">
                <label className="logo">Bruce's Diner</label>
                <nav className="menu">
                    <div>
                        Welcome, <span className="email">{ auth.email }</span>
                    </div>
                </nav>
                <Nav />
                {props.children}
            </div>
        </div>
    );
}

export default Template;
