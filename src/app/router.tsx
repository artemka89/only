import { createBrowserRouter } from 'react-router';

import { HomePage } from '@/pages/HomePage/home-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  }
]);
