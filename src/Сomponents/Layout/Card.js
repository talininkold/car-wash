import React, {useState, Fragment, useContext} from 'react'
// import FilterContext from '../Context/filterContext'
import AuthContext from '../Context/authContext/authContext'

const Card = ({headers, params, onLoading}) => {

  const {login, key, setAlert} = useContext(AuthContext)
  
  const [first, setFirst] = useState(params[0])
  const [second, setSecond] = useState(params[1])
  const [third, setThird] = useState(params[2])
  const [loading, setLoading] = useState(false)
  const [act, setAct] = useState('')
  const [bill, setBill] = useState('')
  const leftColumn = headers.slice(3, headers.length)
  const rightColumn = params.slice(3, params.length)
  const date1 = rightColumn[0]
  const date2 = rightColumn[1]
  const payment = rightColumn[2]

  const onAgree = async () => {
    const promt = window.confirm('Cогласовать данную карточку?')
    if (promt) {
      onLoading(true); setLoading(true)
      try {
        await fetch(`https://script.google.com/macros/s/AKfycbxIqFt9DzdnB085apVHNbLC6jiPqClksLWhUK1PtpbyCdDsGLRz/exec?user=${login}&key=${key}&request=collationAccept&date1=${date1}&date2=${date2}&payment=${payment}`)
        setFirst(false)
        setSecond(true)
        setAlert('Успешно согласовано', 'success')
      } catch (error) {
        setAlert('Произошла ошибка', 'danger')
      }
      onLoading(false); setLoading(false)
    }
  }

  const onReject = async () => {
    const promt = window.confirm('Оспорить данную карточку?')
    if (promt) {
      onLoading(true); setLoading(true)
      try {
        await fetch(`https://script.google.com/macros/s/AKfycbxIqFt9DzdnB085apVHNbLC6jiPqClksLWhUK1PtpbyCdDsGLRz/exec?user=${login}&key=${key}&request=collationDeny&date1=${date1}&date2=${date2}&payment=${payment}`)
        setFirst(true)
        setSecond(false)
        setBill('')
        setAct('')
        setAlert('Свера отклонена', 'success')
      } catch (error) {
        setAlert('Произошла ошибка', 'danger')
      }
      onLoading(false); setLoading(false)
    }
  }
  const onDownload = async (param) => {
    
      onLoading(true); setLoading(true)
      try {
        const res = await fetch(`https://script.google.com/macros/s/AKfycbxIqFt9DzdnB085apVHNbLC6jiPqClksLWhUK1PtpbyCdDsGLRz/exec?user=${login}&key=${key}&request=${param}`)
        const data = await res.json()
        // const download = window.confirm('Скачать документ?')
        // let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=0,height=0,left=-500,top=-500`;
        // if (download) {
        //   window.open(data.url, 'target: "_blank"', params)
        // }
        if (param === 'reconciliation') setAct(data.url)
        if (param === 'invoice') setBill(data.url)

      } catch (error) {
        setAlert('Произошла ошибка', 'danger')
      }
      onLoading(false); setLoading(false)
    }
  

  return (
    <div style={first ? redBg : grayBg}>
      <table>
        <tbody>
          {leftColumn.map((tr, index) => 
          <tr key={index}>
            <td>
              {tr}
            </td>
            <td className="bold">
              {rightColumn[index] === null || rightColumn[index] === '' ? '-' : rightColumn[index]}
            </td>
          </tr>)}
        </tbody>
      </table>
      {!loading && 
        <Fragment>
          {(!second || first) && <a className="btn btn-block btn-main" onClick={onAgree}><i className="fas fa-check"></i> Cогласовать</a>}
          {(second || !first) && <a className="btn btn-block btn-light" onClick={onReject}><i className="fas fa-times-circle"></i> Оспорить</a>}
          {second * third === 1 &&
          <Fragment>
            {act !== '' ? <a href={act} className="download" target="_blank">Cкачать акт</a> : <a className="btn btn-block btn-success" onClick={() => onDownload('reconciliation')}><i className="fas fa-download"></i> Получить акт выполненных работ</a>}
            {bill !== '' ? <a href={bill} className="download" target="_blank">Скачать счет</a> : <a className="btn btn-block btn-success" onClick={() => onDownload('invoice')}><i className="fas fa-download"></i> Получить счет</a>}
          </Fragment>
          }
        </Fragment>
      }
    </div>
  )
}

const redBg = {
  backgroundColor: '#F0A5A5'
}
const grayBg = {
  backgroundColor: '#96969666'
}


export default Card
