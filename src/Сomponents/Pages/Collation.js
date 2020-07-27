import React, {useContext, useEffect} from 'react'
import AuthContext from '../Context/authContext/authContext'
import FilterContext from '../Context/filterContext'
import Spinner from '../Layout/Spinner2'
import Card from '../Layout/Card'

const Collation = () => {

  const {login, key} = useContext(AuthContext)
  const {loading, getCollations, headers, cards} = useContext(FilterContext)

  useEffect(() => {
    getCollations(login, key)
  }, [])

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="container">
      <h4>Cверка</h4>
      <div className="cards-container">
        {cards.map((item, index) => <Card key={index} headers={headers} params={item}/>)}
      </div>
    </div>
  )
}

export default Collation
