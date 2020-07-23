import React, {useContext, useEffect, useState} from 'react'
import AuthContext from '../Context/authContext/authContext'
import FilterContext from '../Context/filterContext'
import Spinner from '../Layout/Spinner2'
import Card from '../Layout/Card'

const Collation = () => {

  const [headers, setHeaders] = useState([])
  const [cards, setCards] = useState([])

  const {login, key} = useContext(AuthContext)
  const {loading, setLoading} = useContext(FilterContext)

  const getItems = async () => {
    setLoading(true)
    const res = await fetch(`https://script.google.com/macros/s/AKfycbxIqFt9DzdnB085apVHNbLC6jiPqClksLWhUK1PtpbyCdDsGLRz/exec?user=${login}&key=${key}&request=collation`)
    const data = await res.json()
    // const testArr = [
    //   ["Мойка отказала","Мойка подтвердила","Проверили","Начало","Конец","К выплате","Операции","Аренда","К взаимозачету","Компенсации","Штрафы b2c","Штрафы карш","Штрафы b2b","Такси Затраты","Такси Операции","Физики\tЗатраты","Физики Операции","Каршеринг Затраты","Каршеринг Операции","Затраты","Операции"],
    //   [false,false,false,"2020-07-01","2020-07-15",40160,259,"","",0,-8000,0,"",4690,70,0,0,43470,189,null,null],
    //   [false,true,true,"2020-09-01","2020-08-15",4055,3220,"","",0,-600,0,"",4050,70,0,0,50670,300,null,null],
    //   [true,true,true,"2020-08-01","2020-04-15",4000,2225,"","",0,-500,0,"",9050,70,0,0,42270,200,null,null]]
    // console.log(testArr)
    if (data.arr.length) {
      setHeaders(data.arr[0])
      setCards(data.arr.filter((item, i) => i > 0))
    }
    setLoading(false)
  }

  useEffect(() => {
    getItems()
  }, [])

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="container">
      <h4>Cверка</h4>
      <div className="cards-container">
        {cards.map(item => <Card headers={headers} params={item}/>)}
      </div>
    </div>
  )
}

export default Collation
