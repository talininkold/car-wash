import React, {useState, useContext} from 'react'
import FilterContext from '../Context/filterContext'
import AuthContext from '../Context/authContext/authContext'

const OrdersFilters = () => {

  const filterContext = useContext(FilterContext)
  const authContext = useContext(AuthContext)

  const {key, login} = authContext
  const {searchType} = filterContext

  const [param, setParam] = useState('');

  const onTicketFilter = (e) => {
    e.preventDefault()
    filterContext.onTicketFilter(login, key, param, searchType)
    document.getElementById('ticket-filter').style.display = 'none'
    document.getElementById('comment').style.display = 'block'
    // setParam('')
    console.log(param)
  }

  const clearFilter = () => {
    setParam('')
    document.getElementById('ticket-filter').style.display = 'flex'
    document.getElementById('comment').style.display = 'none'
    console.log('cleared')
    filterContext.clearFilter()
  }
  return (
    <div>
      <p id="comment" style={{display: 'none'}}>Показан поиск по параметру: <br></br> {param}</p>
      <form id="ticket-filter" onSubmit={onTicketFilter}>
        <p>Телефон или номер машины</p>
        <input 
        placeholder="Введите значение..." 
        type="text" 
        name='param'
        value={param}
        onChange={e => setParam(e.target.value)}
        maxLength="11"
        required
        />
        <button 
          className="btn btn-main" 
          type="submit">
          Поиск
        </button>
      </form>
      <button 
          className="btn btn-light" 
          onClick={clearFilter}>
          Cбросить
      </button>
    </div>
  )
}

export default OrdersFilters
