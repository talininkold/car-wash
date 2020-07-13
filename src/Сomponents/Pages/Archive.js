import React, {useState, useContext} from 'react'
import FilterContext from '../Context/filterContext'
import AuthContext from '../Context/authContext/authContext'
import Spinner from '../Layout/Spinner2'

const Archive = () => {

  const filterContext = useContext(FilterContext)
  const {login, key} = useContext(AuthContext)

  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');

  const getArchive = (e) => {
    e.preventDefault()
    document.getElementById('archive').style.display = 'none';
    document.getElementById('about').style.display = 'block';
    const date1U = new Date(date1)
    const date2U = new Date(date2)
    console.log(date1)
    console.log(date1U)
    console.log(date1U.getTime())
    console.log(date2U.getTime())
    filterContext.getArchive(login, key, date1U.getTime(), date2U.getTime())
  }
  const reset = () => {
    document.getElementById('archive').style.display = 'block';
    document.getElementById('about').style.display = 'none';
    filterContext.clearArchive()
    setDate1('')
    setDate2('')
  }

  return (
    <div className="container">
      <h4>Архив</h4>
        <div id="about" style={{display:'none'}}>
          <h6>{`Показана история за период с ${date1.replace('T', '  ')} по ${date2.replace('T', '  ')} `}
          <i className="fas fa-times fa-2x" id="reset-logs" onClick={reset}></i></h6>
        </div>
        <div id="archive">
          <form onSubmit={getArchive}>
          <label htmlFor="date1">Укажите начальную дату</label>
          <input id="date1" type="date" required onChange={e => setDate1(e.target.value)} value={date1}/>
          <label htmlFor="date2">Укажите конечную дату</label>
          <input id="date2" type="date" required onChange={e => setDate2(e.target.value)} value={date2}/>
          <button className="btn btn-main" name="history" type="submit" style={{marginBottom:'10px'}}>Показать</button>
          </form>
        </div>
        {filterContext.loading ? <Spinner /> : (filterContext.archive !== null && 
        <table>
          <tbody id="archive-table">
          {filterContext.archive.map((tr, i) => (
            <tr key={i}>
              {tr.map((td,i) => <td key={i}>{(typeof td === "object" && td !== null) ? td.map((i, index) => <p key={index}>{i}</p>) : <p>{td}</p>}</td>)}
            </tr>))}
          </tbody>
        </table>)}
    </div>
  )
}

export default Archive