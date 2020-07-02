import React, {useState, useContext} from 'react'
import FilterContext from '../Context/filterContext'

const Filters = () => {
  const [type, setType] = useState('')
  const filterContext = useContext(FilterContext)
  
  const setFilter = (e) => {
    e.preventDefault()
    filterContext.typeFilter(type)
  }

  const clearFilter = () => {
    setType('')
    filterContext.clearTypeFilter()
  }

  return (
    <div className="filters-form">
      <form onSubmit={setFilter} className="filters">
        <p>Фильтрация</p>
        <select className="browser-default" onChange={e => {setType(e.target.value)}} name="filter" value={type}>
          <option value="">Выберите тип</option>
          <option value="Used">Used</option>
          <option value="Available">Available</option>
        </select>
        <button 
          className="btn btn-success" 
          type="submit">
          Применить фильтр
        </button>
      </form>
      <button
          className="btn btn-light" 
          onClick={clearFilter}>
          Отменить
      </button>
    </div>
  )
}

export default Filters
