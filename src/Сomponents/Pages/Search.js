import React, {useContext, useEffect} from 'react'
import TicketFilter from '../Layout/TicketFilter';
import FilterContext from '../Context/filterContext'
import Spinner from '../Layout/Spinner2'
import Table from '../Layout/Table';
import Filters from '../Layout/Filters';

const Search = () => {
  // const [searchtype, setSearchtype] = useState('')

  const filterContext = useContext(FilterContext)
  const {loading, tickets, searchType, response} = filterContext;

  useEffect(() => {
    if (response !== null) {
      filterContext.clearFilter()
    }
  }, [response])

  const setSearchType = (e) => {
    filterContext.setSearchType(e.target.value)
    document.getElementById('ticket-filter').style.display = 'flex'
    document.getElementById('comment').style.display = 'none'
  }

  return (
    <div className="container">
      <h4>Поиск по</h4>
      <select className="browser-default" onChange={setSearchType} id="search-type" defaultValue="ticket">
          <option value="ticket">Билетам</option>
          <option value="report">Отчетам</option>
      </select>
      <div className="form">
        <TicketFilter />
        {searchType === 'report' ? '' : (tickets.length > 0 && <Filters />)}
      </div>
        {loading ? 
        <Spinner/> : 
        (tickets.length === 0 ? '' : (tickets === 'Error' ? <p className="no-match">Нет совпадений</p> : <Table />))}
    </div>
  )
}

export default Search
