import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SuspenseLayout from './components/layout/SuspenseLayout';

const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<SuspenseLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
