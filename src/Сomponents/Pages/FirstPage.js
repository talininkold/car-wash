import React, {useContext, Fragment} from 'react'
import AuthContext from '../Context/authContext/authContext'
import Login from '../Layout/Login'
import { Redirect } from 'react-router-dom'

const FirstPage = () => {
  const {isAuthenticated, user, login} = useContext(AuthContext)
  return (
    <Fragment>
      {/* {isAuthenticated ? <Redirect to='/archive'/> : <Login/> } */}
      {isAuthenticated 
      ? 
      <Fragment>
        <Redirect to='/'/> 
        <div className="container">
          <p>Добрый день{user === 'washing' ? '!' : `, ${login}!`}</p>
        </div>
      </Fragment>
      : <Login/> }
    </Fragment>
  )
}

export default FirstPage
