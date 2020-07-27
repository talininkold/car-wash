import React, {useContext, useEffect, useState} from 'react'
import AuthContext from '../Context/authContext/authContext'
import FilterContext from '../Context/filterContext'
import Spinner from '../Layout/Spinner2'
import Card from '../Layout/Card'

const Collation = () => {

  const [refresh, setRefresh] = useState(false)

  const {login, key} = useContext(AuthContext)
  const {loading, getCollations, headers, cards} = useContext(FilterContext)

  useEffect(() => {
    getCollations(login, key)
  }, [])

  const onLoading = (bool) => {
    setRefresh(bool)
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="container">
      <h4>Cверка</h4>
      {refresh && <div className="fixed-spinner"><Spinner/></div>}
      <div className="cards-container">
        {cards.map((item, index) => <Card key={index} headers={headers} params={item} onLoading={onLoading}/>)}
      </div>
    </div>
  )
}

export default Collation
