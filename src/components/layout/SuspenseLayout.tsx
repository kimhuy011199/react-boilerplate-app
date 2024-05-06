import React from 'react';
import { Outlet } from 'react-router';

const SuspenseLayout = () => (
  <React.Suspense fallback={<p>Loading...</p>}>
    <Outlet />
  </React.Suspense>
);

export default SuspenseLayout;
