import React, { useContext, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
// import FilterContext from '../Context/filterContext'
import AuthContext from "../Context/authContext/authContext";
import FilterContext from "../Context/filterContext";
import FetchContext from '../Context/fetchContext/fetchContext'

const Navbar = () => {
  // const filterContext = useContext(FilterContext)
  const authContext = useContext(AuthContext);
  const filterContext = useContext(FilterContext);
  const fetchContext = useContext(FetchContext);

  const { isAuthenticated, user, login } = authContext;
  const { response } = filterContext;
  const { getNews } = fetchContext;

  useEffect(() => {
    if (localStorage.login) {
      authContext.loadUser();
      getNews()
    }
    if (response !== null) {
      filterContext.clearFilter();
    }
    // eslint-disable-next-line
  }, [localStorage.user, localStorage.param, localStorage.login, response]);

  return (
    <>
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
                    <Link to="/">Главная</Link>
                  </li>
                  <li>
                    <Link to="materials">Материалы</Link>
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
          )}
        </div>
      </div>
    </nav>
    <a href="https://t.me/CF_PartnersBot" target="_blank">
      <div id="goTelegram">
        <i className="fab fa-telegram fa-2x"/>
        <span>Написать в поддержку</span>
      </div>
    </a>
    </>
  );
};

export default Navbar;
