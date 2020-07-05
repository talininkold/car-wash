import React, {useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
// import FilterContext from '../Context/filterContext'
import AuthContext from '../Context/authContext/authContext'

const Navbar = () => {

  // const filterContext = useContext(FilterContext)
  const authContext = useContext(AuthContext)

  const {isAuthenticated, user} = authContext;

  useEffect(() => {
    if (localStorage.login) {
      authContext.loadUser()
      // filterContext.getOrders()
      // filterContext.getCouriers()
    }
    // eslint-disable-next-line
  }, [localStorage.user, localStorage.param, localStorage.login])

  return (
      <nav>
        <div className="container">
          <div className="logo">
            <i className="fas fa-car fa-2x"></i>
            <h3>АДМИНКА ДЛЯ МОЙКИ</h3>
          </div>
          <div id="menu">
            {isAuthenticated && 
            <ul>
              <li><Link to="search">Поиск</Link></li>
              <li><Link to="edit">Редактировать</Link></li>
              {user === 'admin' && <li><Link to="logs">Логи</Link></li>}
            </ul>}
            {isAuthenticated && <a type="button" href='' onClick={() => {authContext.logOut(); 
                // filterContext.clearAll()
            }}>Выйти</a>}
          </div>
        </div>
      </nav>
  )
}

export default Navbar
