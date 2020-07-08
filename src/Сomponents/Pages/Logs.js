import React, {useEffect, useContext, Fragment, useState} from 'react'
import FilterContext from './../Context/filterContext'
import AuthContext from './../Context/authContext/authContext'
import Spinner from './../Layout/Spinner2'

const Logs = () => {
  const [value, setValue] = useState('')
  const {getLogs, logs, loading, logsFilter, logsFiltered, resetFilter} = useContext(FilterContext)
  const {login, key} = useContext(AuthContext)

  useEffect(() => {
    getLogs(login, key)
    // eslint-disable-next-line
  }, [])

    const header = logs[0]
    const tbody = logs.filter((item, index) => index > 0 && item)

    const refresh = () => {
      getLogs(login, key)
    }
    
    const reset = () => {
      setValue('')
      resetFilter()
    }
    
  return (
    <div className="container">
      <h4>Логирование <i className="fas fa-sync-alt refresh" onClick={refresh}></i></h4>
      {loading ? <Spinner /> :
      <Fragment>
        <select className="browser-default" onChange={e => {setValue(e.target.value); logsFilter(e.target.value)}} name="filter" value={value}>
            <option value="">Выберите тип</option>
            <option value="аuthorization">аuthorization</option>
            <option value="ticket search">ticket search</option>
            <option value="report search">report search</option>
            <option value="replace number request">replace number request</option>
            <option value="replace number set">replace number set</option>
        </select>
        {value !== '' && <i className="fas fa-times fa-2x" id="reset-logs" onClick={reset}></i>}
          <table>
            <thead>
              <tr id="header">
                {header && header.map((td, i) => <th key={i}>{td}</th>)}
              </tr>
            </thead>
            <tbody>
              {logsFiltered === null 
              ?
              tbody && tbody.map((tr, i) => (
                  <tr key={i}>
                    {tr.map((td,i) => <td key={i}>{td}</td>)}
                  </tr>
                )) 
              :
              logsFiltered.map((tr, i) => (
                <tr key={i}>
                  {tr.map((td,i) => <td key={i}>{td}</td>)}
                </tr>
              )) 
            }
            </tbody>
          </table>
        </Fragment> 
      }
    </div>
  )
}

export default Logs
