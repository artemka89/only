import type { FC } from 'react';
import { RouterProvider } from 'react-router';

import { router } from './router';

import './style/global.scss';

export const App: FC = () => {
  return <RouterProvider router={router} />;
};
