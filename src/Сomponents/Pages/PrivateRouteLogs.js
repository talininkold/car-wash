import React, {useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthContext from '../Context/authContext/authContext'

const PrivateRouteCouriers = ({ component: Component, type, ...rest }) => {
  const authContext = useContext(AuthContext)
  const {isAuthenticated, loading, user} = authContext;
  console.log(rest, type, user)
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && !loading ? (
          <Redirect to='/' />
        ) : ( user === type &&
          <Component {...props} />
        )
      }
    />
  )
}

export default PrivateRouteCouriers
