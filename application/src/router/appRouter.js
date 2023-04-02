import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Main, Login, OrderForm, ViewOrders} from '../components';
import { ProtectedRoute } from './protectedRoute';

const AppRouter = (props) => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/order" element={
          <ProtectedRoute>
            <OrderForm />
          </ProtectedRoute>
        } />
        <Route path="/view-orders" element={
          <ProtectedRoute>
            <ViewOrders />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default AppRouter;
