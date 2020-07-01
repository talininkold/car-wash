import React, {useContext} from 'react'
import AuthContext from '../Context/authContext/authContext'

const Alert = () => {
  const authContext = useContext(AuthContext)
  const {alert} = authContext;
  return (
    alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <i className='fas fa-info-circle' /> {alert.message}
      </div>
    )
  )
}

export default Alert
