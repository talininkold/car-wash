import React, {useContext} from 'react'
import FilterContext from '../Context/filterContext'
import { Link } from 'react-router-dom'


const Table = () => {
  const filterContext = useContext(FilterContext)
  const {tickets, typeFiltered, searchType, getUrlParam} = filterContext;
  const header = tickets[0]
  const tbody = tickets.filter((item, index) => index > 0 && item)
  console.log(header, tbody)

  const  getParam = (e) => {
    const code = e.target.parentElement.parentElement.firstChild.innerText
    const number = e.target.parentElement.parentElement.children[1].innerText
    getUrlParam({url: code, number})
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            {header.map((td, i) => <th key={i}>{td}</th>)}
            {searchType === 'report' && <th>Фото</th>}
          </tr>
        </thead>
        <tbody>
          {typeFiltered !== null ?
          typeFiltered.map((tr, i) => (
            <tr key={i}>
              {tr.map((td,i) => <td key={i}>{td}</td>)}
              {searchType === 'report' && <td><Link to="/image" onClick={getParam}>Фото</Link></td>}
            </tr>
          )) :
            tbody.map((tr, i) => (
              <tr key={i}>
                {tr.map((td,i) => <td key={i}>{td}</td>)}
                {searchType === 'report' && <td><Link to="/image" onClick={getParam}>Фото</Link></td>}
              </tr>
            ))
        }
        </tbody>
      </table>
    </div>
  )
}

export default Table
