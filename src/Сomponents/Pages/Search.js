import React, {useContext} from 'react'
import TicketFilter from '../Layout/TicketFilter';
import FilterContext from '../Context/filterContext'
import Spinner from '../Layout/Spinner2'
import Table from '../Layout/Table';

const Search = () => {
  const filterContext = useContext(FilterContext)
  const {loading, tickets} = filterContext;
  return (
    <div className="container">
      <h4>Поиск по билетам</h4>
      <TicketFilter />
        {loading ? 
        <Spinner/> : 
        (tickets.length === 0 ? '' : (tickets === 'Error' ? <p className="no-match">Нет совпадений</p> : <Table />))}
    </div>
  )
}

export default Search
