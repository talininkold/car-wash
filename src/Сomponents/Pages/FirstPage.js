import React, {useContext, Fragment} from 'react'
import AuthContext from '../Context/authContext/authContext'
import Login from '../Layout/Login'
import { Redirect } from 'react-router-dom'

const FirstPage = () => {
  const authContext = useContext(AuthContext)
  return (
    <Fragment>
      {authContext.isAuthenticated ? <Redirect to='/search'/> : <Login/> }
    </Fragment>
    
  )
}

export default FirstPage
