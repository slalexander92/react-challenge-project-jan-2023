import React, { useState } from 'react';
import { authService } from '../../services/auth.service';
import './sign-up.css';

export default function SignUp(props) {
  const [data, setData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);

  const linkLabel = '< Back'

  function signUp(e) {
    e.preventDefault();
    validateEmail(data.email);

    if (error) return;

    return authService.register(data.email, data.password)
      .then(result => {
        console.log('auth result', result)

        return result;
      })
      .catch(error => console.error(error));
  }

  function onChange(key, val) {
    setData({
      ...data,
      [key]: val,
    });

    if (key === 'email') validateEmail(val);
  }

  function validateEmail(value) {
    const isValidEmail = /^\S+@\S+\.\S+$/.test(value);

    if (!isValidEmail) setError('Please Enter a valid Email');
    else setError(null);
  }

  const displayError = error && (<div className="error">{error}</div>);

  return (
    <div className="form-wrapper">
        <div className="form-group">
          <h1 className="title">SIGN UP!</h1>
        </div>

      <form className="form">
        <div className="form-group">
          <label htmlFor="inputEmail">Email</label>
          <input type="text"
            className="form-control"
            id="inputEmail"
            placeholder="example@business.gov"
            value={data.email}
            onChange={e => onChange('email', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="inputPassword">Password</label>
          <input type="password"
            className="form-control"
            id="inputPassword"
            value={data.password}
            onChange={e => onChange('password', e.target.value)}
          />
        </div>

        <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="button btn btn-primary"
              onClick={e => signUp(e)}
            >
              Login
            </button>
        </div>

        <a className="link" href="/login">{ linkLabel }</a>

        {displayError}
      </form>
    </div>
  );
}
