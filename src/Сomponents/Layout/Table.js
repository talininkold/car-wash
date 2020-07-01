import React, {useContext} from 'react'
import FilterContext from '../Context/filterContext'


const Table = () => {
  const filterContext = useContext(FilterContext)
  const {tickets} = filterContext;
  const header = tickets[0]
  const tbody = tickets.filter((item, index) => index > 0 && item)
  console.log(header, tbody)
  return (
    <div>
      <table>
        <thead>
          <tr>
            {header.map(td => <th>{td}</th>)}
          </tr>
        </thead>
        <tbody>
            {tbody.map(tr => (
              <tr>
                {tr.map(td => <td>{td}</td>)}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
