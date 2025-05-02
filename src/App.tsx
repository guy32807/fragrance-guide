import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';
import MainLayout from './layouts/MainLayout';
import GlobalStyles from './assets/styles/GlobalStyles';

// Create a hash router (works better with GitHub Pages)
const router = createHashRouter([
  {
    path: '/',
    element: (
      <MainLayout>
        <HomePage />
      </MainLayout>
    ),
  },
  {
    path: '/blog/:slug',
    element: (
      <MainLayout>
        <BlogPost />
      </MainLayout>
    ),
  },
  {
    path: '*',
    element: (
      <MainLayout>
        <NotFound />
      </MainLayout>
    ),
  }
]);

function App() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
