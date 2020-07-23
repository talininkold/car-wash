import React, {useState, Fragment} from 'react'

const Card = ({headers, params}) => {
  const [first, setFirst] = useState(params[0])
  const [second, setSecond] = useState(params[1])
  const [third, setThird] = useState(params[2])
  const leftColumn = headers.slice(3, headers.length)
  const rightColumn = params.slice(3, params.length)
  return (
    <div>
      <table>
        {leftColumn.map((tr, index) => 
        <tr>
          <td>
            {tr}
          </td>
          <td className="bold">
            {rightColumn[index] === null || rightColumn[index] === '' ? '-' : rightColumn[index]}
          </td>
        </tr>)}
      </table>
      {!first && 
      <Fragment>
        <a className="btn btn-block btn-main"><i class="fas fa-check"></i> Cогласовать</a>
        <a className="btn btn-block btn-light"><i class="fas fa-times-circle"></i> Отказать</a>
      </Fragment>}
      {second * third === 1 &&
      <a className="btn btn-block btn-success"><i class="fas fa-download"></i> Cкачать</a>
      }
    </div>
  )
}

export default Card
