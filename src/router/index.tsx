import React, { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
const Login = lazy(() => import('@/pages/Login'))
const Home = lazy(() => import('@/pages/Home'))
const NotFound = lazy(() => import('@/pages/NotFound'))
const routes: RouteObject[] = [
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/home',
    element: <Home />,
    children: []
  },
  {
    path: '*',
    element: <NotFound />
  }
]

export { routes }
