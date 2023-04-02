import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LoginForm from './login-form/loginForm';
import './login.css';

const mapStateToProps = state => ({
  auth: state.auth
});

const Login = (props) => {
  useEffect(() => {
    if (props.auth.token) props.history.push('/view-orders');

  }, [props.auth.token]);

  return (
    <div className="main-body">
      <h1 className="text-center">Login Screen</h1>
      <div className="d-flex justify-content-center mt-5">
        <LoginForm />
      </div>
    </div>
  );
}

export default connect(mapStateToProps, null)(Login);
