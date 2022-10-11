import React from 'react'
import { Redirect, Route } from 'react-router-dom'
// import PropTypes from 'prop-types'
import { hasToken } from '../../utils/storage'

/**
 * 鉴权路由组件
 */

function AuthRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        // 如果有 token 则展示传入的组件
        if (hasToken()) {
          return <Component />
        }
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location.pathname
              }
            }}
          ></Redirect>
        )
      }}
    ></Route>
  )
}

// AuthRoute.propTypes = {
//   component: PropTypes.object.isRequired
// }

export default AuthRoute
