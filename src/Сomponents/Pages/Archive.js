import React, {useContext, useEffect} from 'react'
import FilterContext from '../Context/filterContext'
import AuthContext from '../Context/authContext/authContext'
import Spinner from '../Layout/Spinner2'
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Archive = () => {

  useEffect(() => {
    if (archive !== null) {
      document.getElementById('archive').style.display = 'none';
      document.getElementById('about').style.display = 'block';
    }
    // eslint-disable-next-line
  }, [])

  const {archive, getArchive, clearArchive, loading, setDate, date1, date2} = useContext(FilterContext)
  const {login, key} = useContext(AuthContext)

  const getArchiveData = (e) => {
    e.preventDefault()
    document.getElementById('archive').style.display = 'none';
    document.getElementById('about').style.display = 'block';
    const date1U = new Date(date1)
    const date2U = new Date(date2)
    console.log(date1)
    console.log(date1U)
    console.log(date1U.getTime())
    console.log(date2U.getTime())
    getArchive(login, key, date1U.getTime(), date2U.getTime())
  }
  const reset = () => {
    document.getElementById('archive').style.display = 'block';
    document.getElementById('about').style.display = 'none';
    clearArchive()
    setDate('date1', '')
    setDate('date2', '')
  }
  const onDownload = () => {
      const wb = XLSX.utils.book_new();
            wb.Props = {
                    Title: "Archive",
                    Author: 'washing'
            };
          wb.SheetNames.push("Test Sheet");
          function forExcel(arr) {
            const arrCopy = JSON.parse(JSON.stringify(arr));
            for (let i = 0; i < arrCopy.length; i++) {
              if (arrCopy[i][3] !== null) {
                let newItem = arrCopy[i][3].join(' ')
                arrCopy[i][3] = newItem
              } else {
                arrCopy[i][3] = '-'
              }
            }
            return arrCopy;
          }
  
        const arr = archive;
        const x = forExcel(arr)
        console.log(x)
  
        const ws_data = x;
        const ws = XLSX.utils.aoa_to_sheet(ws_data);
            wb.Sheets["Test Sheet"] = ws;
        const wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
        function s2ab(s) {
          var buf = new ArrayBuffer(s.length);
          var view = new Uint8Array(buf);
          for (var i=0; i<s.length; i++) {
            view[i] = s.charCodeAt(i) & 0xFF
          }
          return buf;
        }
        saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'test.xlsx');
  }

  return (
    <div className="container">
      <h4>Архив {archive !== null && <i className="fas fa-file-download fa-2x" id="archive-download" onClick={onDownload}></i>}</h4>
        <div id="about" style={{display:'none'}}>
          <h5>{`Показана история за период с ${date1.replace('T', '  ')} по ${date2.replace('T', '  ')} `}
          <i className="fas fa-times fa-2x" id="reset-logs" onClick={reset}></i></h5>
        </div>
        <div id="archive">
          <form onSubmit={getArchiveData}>
          <label htmlFor="date1">Укажите начальную дату</label>
          <input id="date1" type="date" required onChange={e => setDate('date1', e.target.value)} value={date1}/>
          <label htmlFor="date2">Укажите конечную дату</label>
          <input id="date2" type="date" required onChange={e => setDate('date2', e.target.value)} value={date2}/>
          <button className="btn btn-main" name="history" type="submit" style={{marginBottom:'10px'}}>Показать</button>
          </form>
        </div>
        {loading ? <Spinner /> : (archive !== null && 
        <table>
          <tbody id="archive-table">
          {archive.map((tr, i) => (
            <tr key={i}>
              {tr.map((td,i) => <td key={i}>{(typeof td === "object" && td !== null) ? td.map((i, index) => <p key={index}>{i}</p>) : <p>{td}</p>}</td>)}
            </tr>))}
          </tbody>
        </table>)}
    </div>
  )
}

export default Archive