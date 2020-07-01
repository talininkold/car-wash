import React, {useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthContext from '../Context/authContext/authContext'

const PrivateRouteCouriers = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext)
  const {isAuthenticated, loading, user} = authContext;
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && !loading ? (
          <Redirect to='/' />
        ) : ( user === 'admin' &&
          <Component {...props} />
        )
      }
    />
  )
}

export default PrivateRouteCouriers
