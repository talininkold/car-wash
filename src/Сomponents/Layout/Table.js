import React, {useContext} from 'react'
import FilterContext from '../Context/filterContext'


const Table = () => {
  const filterContext = useContext(FilterContext)
  const {tickets, typeFiltered} = filterContext;
  const header = tickets[0]
  const tbody = tickets.filter((item, index) => index > 0 && item)
  return (
    <div>
      <table>
        <thead>
          <tr>
            {header.map((td, i) => <th key={i}>{td}</th>)}
          </tr>
        </thead>
        <tbody>
          {typeFiltered !== null ?
          typeFiltered.map((tr, i) => (
            <tr key={i}>
              {tr.map((td,i) => <td key={i}>{td}</td>)}
            </tr>
          )) :
            tbody.map((tr, i) => (
              <tr key={i}>
                {tr.map((td,i) => <td key={i}>{td}</td>)}
              </tr>
            ))
        }
        </tbody>
      </table>
    </div>
  )
}

export default Table
