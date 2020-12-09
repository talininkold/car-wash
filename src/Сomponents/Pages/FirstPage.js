import React, {useState, useEffect, useContext, Fragment} from 'react'
import AuthContext from '../Context/authContext/authContext'
import FetchContext from '../Context/fetchContext/fetchContext'
import Login from '../Layout/Login'
import { Redirect } from 'react-router-dom'
import News from '../Layout/News'
import Spinner from 'react-bootstrap/Spinner'
import ListGroup from 'react-bootstrap/ListGroup'

const FirstPage = () => {

  const [loading, setLoading] = useState(false)
  const [loadingPartners, setLoadingPartners] = useState(false)
  const [loadingNotif, setLoadingNotif] = useState(false)

  const [partners, setPartners] = useState([])
  const [notif, setNotif] = useState([])

  const {isAuthenticated, login} = useContext(AuthContext)
  const { getNews } = useContext(FetchContext)

  const getPartners = async () => {
    setLoadingPartners(true)
    const res = await fetch(`https://script.google.com/macros/s/AKfycbxIqFt9DzdnB085apVHNbLC6jiPqClksLWhUK1PtpbyCdDsGLRz/exec?request=partnersList&user=${login}`)
    const data = await res.json()
    setPartners(data.partnersList)
    setLoadingPartners(false)
  }

  const getNotifications = async () => {
    setLoadingNotif(true)
    const res = await fetch(`https://script.google.com/macros/s/AKfycbxIqFt9DzdnB085apVHNbLC6jiPqClksLWhUK1PtpbyCdDsGLRz/exec?request=notificationList&user=${login}`)
    const data = await res.json()
    setNotif(data.notificationList)
    setLoadingNotif(false)
  }

  useEffect(() => {
    getPartners()
    getNotifications()
  }, [])

  const refresh = () => {
    getNews()
    getPartners()
    getNotifications()
  }

  const Partners = () => {
    return (
      <table>
        <thead>
          <tr>
            {partners.map(p => <th key={p.name}>{p.name}</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            {partners.map(p => <td key={p.name}>{p.status ? <i className="far fa-check-circle" style={{ color: '#a7d08c'}}/> : <i className="far fa-circle" style={{ color: '#f5b041'}}/>}</td>)}
          </tr>
        </tbody>
      </table>
    );
  }

  const Notifications = () => {
    return (
      <ListGroup >
        {notif.map((n, ind) => 
          <ListGroup.Item key={ind}>
            <i className="far fa-bell" /> {n.text}
          </ListGroup.Item>
        )}
      </ListGroup>
    )
  }

  return (
    <Fragment>
      {/* {isAuthenticated ? <Redirect to='/archive'/> : <Login/> } */}
      {isAuthenticated 
      ? 
      <Fragment>
        <Redirect to='/'/> 
        <div className="container" id="main-page">
          <h4>Главная {!loading && (
            <i className="fas fa-sync-alt refresh-logs" onClick={refresh}></i>
          )}
          </h4>
          <div id="top">
            <div>
              <h5>Вы работаете с:</h5>
              {loadingPartners ? <Spinner animation="grow" /> : <Partners />}
            </div>
            <div>
            <h5>Уведомления:</h5>
              {loadingNotif ? <Spinner animation="grow" /> : <Notifications />}
            </div>            
          </div>
          <div id="bottom">
            <div><News /></div>
            <div style={{paddingRight: '2rem'}}>
                <iframe frameBorder="0" scrolling="no" horizontalscrolling="no" verticalscrolling="no" width="100%" height="540px" async src="https://tgwidget.com/channel/v2.0/?id=5fc529aa83ba8883348b4569"></iframe>
            </div>             
          </div>
        </div>
      </Fragment>
      : <Login/> }
    </Fragment>
  )
}

export default FirstPage
