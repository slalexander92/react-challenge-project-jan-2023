import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../../redux/actions/authActions'
import { useSelector } from 'react-redux';

const mapActionsToProps = dispatch => ({
  commenceLogin(email, password) {
    dispatch(loginUser(email, password))
  }
})

const LoginForm = (props) => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const errorMessage = useSelector(({ auth }) => auth.errorMessage);

  function login(e) {
    e.preventDefault();
    props.commenceLogin(state.email, state.password);
  }

  function onChange(key, val) {
    setState({ ...state, [key]: val });
  }

  function LoginError() {
    return errorMessage && (<div className="error-message">{ errorMessage }</div>)
  }

  return (
    <form>
      <div className="form-group">
        <label htmlFor="inputEmail">Email</label>
        <input type="text" className="form-control" id="inputEmail" placeholder="test@test.com" value={state.email} onChange={e => onChange('email', e.target.value)}></input>
      </div>
      <div className="form-group">
        <label htmlFor="inputPassword">Password</label>
        <input type="password" className="form-control" id="inputPassword" value={state.password} onChange={e => onChange('password', e.target.value)}></input>
      </div>
      <div className="d-flex justify-content-center">
          <button onClick={e => login(e)} type="submit" className="btn btn-primary">Login</button>
      </div>

      <a className="sign-up-link" href="/sign-up">Sign up</a>

      {<LoginError />}
    </form>
  );
}

export default connect(null, mapActionsToProps)(LoginForm);
