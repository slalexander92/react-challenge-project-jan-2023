import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({component: Component, ...rest}) => {
  const auth = useSelector(state => state.auth);
  const isAuthenticated = !!auth && !!auth.email && !!auth.token;

  return (
    <Route {...rest}
      render={props => {
        if (isAuthenticated) {
          return <Component {...props} />
        } else {
          return <Redirect to={
            {
              pathname: '/login',
              state: {
                from: props.location,
              }
            }
          } />
        }
      }}
    />
  )
}

