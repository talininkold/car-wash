import React, { useContext, useState, useEffect } from 'react'
import fetchContext from '../Context/fetchContext/fetchContext'
import Pagination from 'react-bootstrap/Pagination'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'

const News = () => {
    const { news, loading } = useContext(fetchContext)
    
    const [newsPerPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    
    // const hardcodedNews = [
    //     {"title":"Заголовок","newsText":"Текст новости"},
    //     {"title":"Заголовок новости 2","newsText":"Текст новости 2"},
    //     {"title":"Мы прикладываем регламенты выполнения услуг с ожидаемыми результатами по качеству","newsText":"- Ознакомьтесь с ними и убедитесь, что у вас соблюдаются регламенты\n- если у вас есть комментарии или дополнения, вы можете написать их в чат-поддержки @CF_PartnersBot"},
    //     {"title":"Заголовок","newsText":"Текст новости"},
    //     {"title":"Заголовок новости 2","newsText":"Текст новости 2"},
    //     {"title":"2Мы прикладываем регламенты выполнения услуг с ожидаемыми результатами по качеству","newsText":"- Ознакомьтесь с ними и убедитесь, что у вас соблюдаются регламенты\n- если у вас есть комментарии или дополнения, вы можете написать их в чат-поддержки @CF_PartnersBot"},
    //     {"title":"Заголовок","newsText":"Текст новости"},
    //     {"title":"Заголовок новости 2","newsText":"Текст новости 2"},
    //     {"title":"Мы прикладываем регламенты выполнения услуг с ожидаемыми результатами по качеству","newsText":"- Ознакомьтесь с ними и убедитесь, что у вас соблюдаются регламенты\n- если у вас есть комментарии или дополнения, вы можете написать их в чат-поддержки @CF_PartnersBot"},
    //     {"title":"Заголовок","newsText":"Текст новости"},
    //     {"title":"3-Заголовок новости 2","newsText":"Текст новости 2"},
    //     {"title":"Мы прикладываем регламенты выполнения услуг с ожидаемыми результатами по качеству","newsText":"- Ознакомьтесь с ними и убедитесь, что у вас соблюдаются регламенты\n- если у вас есть комментарии или дополнения, вы можете написать их в чат-поддержки @CF_PartnersBot"}
    // ]
    
    const lastNewsInd = currentPage * newsPerPage;
    const firstNewsInd = lastNewsInd - newsPerPage;
    const currentNews = news.slice(firstNewsInd, lastNewsInd);

    // console.log('lastNewsInd -',lastNewsInd,'firstNewsInd -',firstNewsInd)
    
    const [active, setActive] = useState(1)
    let items = [];
    for (let number = 1; number <= Math.ceil(news.length / newsPerPage); number++) {
      items.push(
        <Pagination.Item key={number} active={number === active} href="#" onClick={() => {setCurrentPage(number); setActive(number); }}>
          {number}
        </Pagination.Item>,
      );
    }
    
    const PaginationBasic = () => (
      <div>
        <Pagination>{items}</Pagination>
      </div>
    );

    return (
        <>
            <h4>Новости</h4>
            {loading ? <Spinner animation="grow" /> : news.length === 0 ? <p>Нет новостей</p> : 
            <Accordion>
                {currentNews.map((n, ind) => 
                    <Card key={ind}>
                        <Accordion.Toggle as={Card.Header} eventKey={ind+1}>
                            <i className="far fa-plus-square fa-1x" style={{ color: '#3498db', marginRight: '5px'}}/>
                            {n.title}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={ind+1}>
                            <Card.Body>{n.newsText}</Card.Body>
                        </Accordion.Collapse>
                    </Card>)}
            </Accordion>}
            {news.length <= newsPerPage ? '' : !loading && <PaginationBasic />}
        </>
    )
}

export default News
