import React, {useContext, useState, useEffect} from 'react'
import FilterContext from '../Context/filterContext'
import AuthContext from '../Context/authContext/authContext'
import Spinner from '../Layout/Spinner2'

const Search = () => {

  
    // const [searchtype, setSearchtype] = useState('')
    const [code, setCode] = useState('')
    const [value, setValue] = useState('')
    
    const filterContext = useContext(FilterContext)
    const authContext = useContext(AuthContext)
    const {loading, error} = filterContext;
    const {login, key} = authContext;
    
    useEffect(() => {
    if (!loading) {
      setValue('')
      setCode('')
    }
  }, [loading])

  const onSubmit = (e) => {
    e.preventDefault()
    filterContext.onCheck(login, key, code, value)
    console.log('sumnitted', code, value)
  }
  const onClear = () => {
    setCode('')
    setValue('')
  }

  return (
      <div className="container">
        <h4>Редактировать</h4>
        <div className="form">
        <div>
          <form id="ticket-filter" onSubmit={onSubmit}>
            <label htmlFor="code">Введите код</label>
            <input 
            placeholder="Введите код..." 
            type="text" 
            name='code'
            id='code'
            value={code}
            onChange={e => setCode(e.target.value)}
            minLength="3"
            required
            />
            <label htmlFor="new">Новое значение</label>
            <input 
            placeholder="Значение..." 
            type="text" 
            name='new'
            id='new'
            value={value}
            onChange={e => setValue(e.target.value)}
            maxLength="11"
            minLength="3"
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
                onClick={onClear}>
                Cбросить
            </button>
        </div>
        <div>
          {loading && <Spinner/>}
          {error !== '' && <p>{error}</p>}
        </div>
      </div>
    </div>
  )
}

export default Search
