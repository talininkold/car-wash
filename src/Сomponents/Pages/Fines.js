import React, {useEffect, useContext, useState} from 'react'
import FilterContext from './../Context/filterContext'
import AuthContext from './../Context/authContext/authContext'
import Spinner from './../Layout/Spinner2'

const Fines = () => {

  const [fines, setFines] = useState([])
  
  const {loading, setLoading} = useContext(FilterContext)
  const {login, key} = useContext(AuthContext)

  const getFines = async (login, key) => {
    setLoading(true)
    const res = await fetch(`https://script.google.com/macros/s/AKfycbxIqFt9DzdnB085apVHNbLC6jiPqClksLWhUK1PtpbyCdDsGLRz/exec?user=${login}&key=${key}&request=fines`)
    const data = await res.json();
    setFines(data.arr)
    setLoading(false)
  }

  useEffect(() => {
    getFines(login, key)
    // eslint-disable-next-line
  }, [])

  const refresh = () => {
    getFines(login, key)
  }

  return (
    <div className="container">
      <h4>Штрафы {!loading && <i className="fas fa-sync-alt refresh-logs" onClick={refresh}></i>}</h4>
      {loading ? <Spinner /> : (fines.length>1 ? 
        <table>
          <tbody id="archive-table">
          {fines.map((tr, i) => (
            <tr key={i}>
              {tr.map((td,i) => <td key={i} className="fines-td">{td}</td>)}
            </tr>))}
          </tbody>
        </table> : <p>Нет штрафов</p>)}
    </div>
  )
}

export default Fines
