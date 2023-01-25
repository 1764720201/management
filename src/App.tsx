import React, { Suspense } from 'react'
import type { FC } from 'react'
import 'antd/dist/reset.css'
import { routes } from '@/router'
import AuthGuard from './router/authGuard'
const App: FC = () => {
  return (
    <div className="App">
      <Suspense fallback="">
        <AuthGuard routes={routes}></AuthGuard>
      </Suspense>
    </div>
  )
}

export default App
