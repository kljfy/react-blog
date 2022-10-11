import React, { Suspense } from 'react'
import { Route, Router, Switch, Redirect } from 'react-router-dom'
import history from '@/utils/history'
import AuthRoute from '@/components/AuthRoute'

const Login = React.lazy(() => import('@/pages/Login'))
const Home = React.lazy(() => import('@/pages/Layout'))
const NotFound = React.lazy(() => import('@/pages/NotFound'))

export default function App() {
  return (
    <Router history={history}>
      <Suspense fallback={<div>loading...</div>}>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />}></Route>
          <Route path="/login" component={Login}></Route>
          <AuthRoute path="/home" component={Home}></AuthRoute>
          {/* <Route path="/home" component={Home}></Route> */}
          <Route component={NotFound}></Route>
        </Switch>
      </Suspense>
    </Router>
  )
}
