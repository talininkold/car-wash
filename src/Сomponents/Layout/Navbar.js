import React, { useContext, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
// import FilterContext from '../Context/filterContext'
import AuthContext from "../Context/authContext/authContext";
import FilterContext from "../Context/filterContext";

const Navbar = () => {
  // const filterContext = useContext(FilterContext)
  const authContext = useContext(AuthContext);
  const filterContext = useContext(FilterContext);

  const { isAuthenticated, user, login } = authContext;
  const { response } = filterContext;

  useEffect(() => {
    if (localStorage.login) {
      authContext.loadUser();
    }
    if (response !== null) {
      filterContext.clearFilter();
    }
    // eslint-disable-next-line
  }, [localStorage.user, localStorage.param, localStorage.login, response]);

  return (
    <nav>
      <div className="container">
        <div className="logo">
          <i className="fas fa-car fa-2x"></i>
          <h3>{user === "washing" ? "Мойка - Мойка" : "АДМИНКА ДЛЯ МОЙКИ"}</h3>
        </div>
        <div id="menu">
          {isAuthenticated && (
            <ul>
              {user === "washing" ? (
                <Fragment>
                  <li>
                    <Link to="main">Главная</Link>
                  </li>
                  <li>
                    <Link to="archive">История операций</Link>
                  </li>
                  <li>
                    <Link to="fines">Штрафы</Link>
                  </li>
                  <li>
                    <Link to="feedback">Отзывы</Link>
                  </li>
                  <li>
                    <Link to="collation">Сверка</Link>
                  </li>
                  <li>
                    <Link to="orders_delivery">Заказы на доставку</Link>
                  </li>
                </Fragment>
              ) : (
                <Fragment>
                  <li>
                    <Link to="search">Поиск</Link>
                  </li>
                  <li>
                    <Link to="edit">Редактировать</Link>
                  </li>
                  {user === "admin" && (
                    <li>
                      <Link to="logs">Логи</Link>
                    </li>
                  )}
                </Fragment>
              )}
            </ul>
          )}
          {user === "washing" && <p id="nav-login">{login}</p>}
          {isAuthenticated && (
            <ul>
              <li>
                <a
                  type="button"
                  href=""
                  onClick={() => {
                    authContext.logOut();
                    // filterContext.clearAll()
                  }}
                >
                  Выйти
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
