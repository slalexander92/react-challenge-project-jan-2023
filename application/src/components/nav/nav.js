import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/authActions'
import './nav.css';

const mapActionsToProps = dispatch => ({
    commenceLogout() {
        dispatch(logoutUser());
    }
});

const Nav = (props) => {
    const navigate = useNavigate();

    function logout(event) {
        event.preventDefault();

        props.commenceLogout();
        navigate('/login');
    }

    return (
        <div className="nav-strip">
            <Link to={"/order"} className="nav-link">
                <div className="nav-link-style">
                    <label className="nav-label">Order Form</label>
                </div>
            </Link>
            <Link to={"/view-orders"} className="nav-link" id="middle-link">
                <div className="nav-link-style">
                    <label className="nav-label">View Orders</label>
                </div>
            </Link>
            <button onClick={e => logout(e)} className="nav-link">
                <div className="nav-link-style">
                    <label className="nav-label">Log Out</label>
                </div>
            </button>
        </div>
    );
}

export default connect(null, mapActionsToProps)(Nav);
