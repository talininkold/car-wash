import React, {useEffect, useContext} from 'react'
import FilterContext from '../Context/filterContext'
import AuthContext from '../Context/authContext/authContext'
import Spinner from '../Layout/Spinner2'
import { Link } from 'react-router-dom'

const Image = () => {
  const filterContext = useContext(FilterContext)
  const authContext = useContext(AuthContext)

  const {login, key} = authContext;
  const {urlParam, getImg, url, loading, clearImg} = filterContext;

  useEffect(() => {
    if (urlParam.url) {
      getImg(login, key, urlParam.url)
    }
  }, [])

  const clearURL = () => {
    clearImg()
  }

  return (
    <div className="container">
      {loading ? 
      <Spinner /> : 
      (<div id="img">
        <p>Показано фото заказа {urlParam.url} c номером {urlParam.number}</p>
        <img src={url}/>
        <Link to="/search" onClick={clearURL} className="btn btn-light">Назад</Link>
      </div>)}
    </div>
  )
}

export default Image
