import React, { useState, Fragment, useContext } from "react";
// import FilterContext from '../Context/filterContext'
import AuthContext from "../Context/authContext/authContext";
import Modal from "./Modal";

const Card = ({ headers, params, onLoading }) => {
  const { login, key, setAlert } = useContext(AuthContext);

  const [modal, setModal] = useState(false);
  const [reason, setReason] = useState("");
  const [act, setAct] = useState("");
  const [bill, setBill] = useState("");
  const [act2, setAct2] = useState("");
  const [bill2, setBill2] = useState("");

  const [first, setFirst] = useState(params[0]);
  const [second, setSecond] = useState(params[1]);
  const [third, setThird] = useState(params[2]);
  const [loading, setLoading] = useState(false);

  const leftColumn = headers.slice(3, headers.length);
  const rightColumn = params.slice(3, params.length);
  // const rightColumn = ["2020-11-16", "2020-11-30", "9930", "9270 (10)", "96 (10)", "0 (20)", "660 (10)"," 2 (10)", "0 (0)", "1000 (0)", "0 (0)", "1000 (2)"," 1000 (2)", "2000 (2)", "", 0, "", ""]
  const date1 = rightColumn[0];
  const date2 = rightColumn[1];
  const payment = rightColumn[2];

  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
  };

  const numberFormatter = (array) => {
    let tdNumbers = [3, 4, 5, 9, 10]
    return array.map((item, index) => {
      if(tdNumbers.includes(index)) {
        const position = tdNumbers.indexOf(index)
        tdNumbers.splice(position, 1)
        return typeof(item) === 'string' ? item.split(' ') : item
      }
      return item
    });
  }

  const onAgree = async () => {
    const promt = window.confirm("Cогласовать данную карточку?");
    if (promt) {
      onLoading(true);
      setLoading(true);
      try {
        await fetch(
          `https://script.google.com/macros/s/AKfycbxIqFt9DzdnB085apVHNbLC6jiPqClksLWhUK1PtpbyCdDsGLRz/exec?user=${login}&key=${key}&request=collationAccept&date1=${date1}&date2=${date2}&payment=${payment}`
        );
        setFirst(false);
        setSecond(true);
        setAlert("Успешно согласовано", "success");
      } catch (error) {
        setAlert("Произошла ошибка", "danger");
      }
      onLoading(false);
      setLoading(false);
    }
  };

  const onReject = async () => {
    setModal(false);
    onLoading(true);
    setLoading(true);
    const value = reason.split("?").join("#13").split("&").join("#12");
    try {
      await fetch(
        `https://script.google.com/macros/s/AKfycbxIqFt9DzdnB085apVHNbLC6jiPqClksLWhUK1PtpbyCdDsGLRz/exec?user=${login}&key=${key}&request=collationDeny&date1=${date1}&date2=${date2}&payment=${payment}&reason=${value}`
      );
      setFirst(true);
      setSecond(false);
      setBill("");
      setAct("");
      setAlert("Свера отклонена", "success");
    } catch (error) {
      setAlert("Произошла ошибка", "danger");
    }
    onLoading(false);
    setLoading(false);
    setReason("");
  };

  // const onDownload = async (param) => {
  //   onLoading(true);
  //   setLoading(true);
  //   try {
  //     const res = await fetch(
  //       `https://script.google.com/macros/s/AKfycbxIqFt9DzdnB085apVHNbLC6jiPqClksLWhUK1PtpbyCdDsGLRz/exec?user=${login}&key=${key}&request=${param}`
  //     );
  //     const data = await res.json();
  //     onLoading(false);
  //     setLoading(false);
  //     return {
  //       doc_url: data.url,
  //     };
  //   } catch (error) {
  //     setAlert("Произошла ошибка", "danger");
  //     onLoading(false);
  //     setLoading(false);
  //     return null;
  //   }
  // };

  // const openInNewTab = async (param) => {
  //   const url = await onDownload(param);
  //   if (url !== null)
  //     return Object.assign(document.createElement("a"), {
  //       target: "_blank",
  //       href: url.doc_url,
  //     }).click();
  // };

  const onDownload = async (param) => {
    onLoading(true);
    setLoading(true);
    try {
      const res = await fetch(
        `https://script.google.com/macros/s/AKfycbxIqFt9DzdnB085apVHNbLC6jiPqClksLWhUK1PtpbyCdDsGLRz/exec?user=${login}&key=${key}&request=${param}&date1=${date1}&date2=${date2}`
      );
      const data = await res.json();

      if (param === "reconciliation") setAct(data.url);
      if (param === "invoice") setBill(data.url);
      if (param === "reconciliationNew") setAct2(data.url);
      if (param === "invoiceNew") setBill2(data.url);
    } catch (error) {
      setAlert("Произошла ошибка", "danger");
    }
    onLoading(false);
    setLoading(false);
  };

  console.log(rightColumn)
  console.log(leftColumn)
  const rightColumnFormatted = numberFormatter(rightColumn)
  console.log('firmated', rightColumnFormatted)

  return (
    <div style={first ? redBg : grayBg}>
      <Modal show={modal} handleClose={hideModal}>
        <h4>Укажитe причину отказа</h4>
        <input
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="причинa..."
          style={input}
        ></input>
        <a className="btn btn-block btn-main" onClick={onReject}>
          Отправить
        </a>
      </Modal>
      <table>
        <tbody>
          {leftColumn.map((tr, index) => (
            <Fragment key={index}>
              <tr>
                <td>{tr}</td>
                <td>
                  {rightColumn[index] === null || rightColumn[index] === ""
                    ? "-"
                    : typeof(rightColumnFormatted[index]) === 'object' ? <span>{rightColumnFormatted[index][0]}<span className="normal-text">{' ' + rightColumnFormatted[index][1]}</span></span> : rightColumnFormatted[index]}
                </td>
              </tr>
              {index === 2 && <tr style={{ height: "0.7rem" }}></tr>}
            </Fragment>
          ))}
        </tbody>
      </table>
      {!loading && (
        <Fragment>
          {second * third === 1 && (
            <Fragment>
              {bill !== "" ? (
                <a
                  href={bill}
                  className="download"
                  target="_blank"
                  style={{ color: "#3498db", textAlign: "center" }}
                >
                  Скачать Счет (Такси, частные лица)
                </a>
              ) : (
                <a
                  className="btn btn-block btn-success"
                  onClick={() => onDownload("invoice")}
                >
                  <i className="fas fa-download"></i> Получить Счет (Такси, частные лица)
                </a>
              )}
              {act !== "" ? (
                <a
                  href={act}
                  className="download"
                  target="_blank"
                  style={{ color: "#3498db", textAlign: "center" }}
                >
                  Скачать Акт (Мойка-Мойка, B2C)
                </a>
              ) : (
                <a
                  className="btn btn-block btn-success"
                  onClick={() => onDownload("reconciliation")}
                >
                  <i className="fas fa-download"></i> Получить Акт (Такси, частные лица)
                </a>
              )}
              {bill2 !== "" ? (
                <a
                  href={bill2}
                  className="download"
                  target="_blank"
                  style={{ color: "#3498db", textAlign: "center" }}
                >
                  Скачать счет (Карфикс, Каршеринг аренда)
                </a>
              ) : (
                <a
                  className="btn btn-block btn-success"
                  onClick={() => onDownload("invoiceNew")}
                >
                  <i className="fas fa-download"></i> Получить счет (Карфикс. Аренда, каршеринг и корп. клиенты)
                </a>
              )}
              {act2 !== "" ? (
                <a
                  href={act2}
                  className="download"
                  target="_blank"
                  style={{ color: "#3498db", textAlign: "center" }}
                >
                  Скачать акт (Карфикс. Аренда, каршеринг и корп. клиенты)
                </a>
              ) : (
                <a
                  className="btn btn-block btn-success"
                  onClick={() => onDownload("reconciliationNew")}
                >
                  <i className="fas fa-download"></i> Получить акт (Карфикс. Аренда, каршеринг и корп. клиенты)
                </a>
              )}
            </Fragment>
            // <>
            //   <a
            //     className="btn btn-block btn-success"
            //     onClick={() => openInNewTab("invoice")}
            //   >
            //     <i className="fas fa-download"></i> Скачать счет
            //   </a>
            //   <a
            //     className="btn btn-block btn-success"
            //     onClick={() => openInNewTab("reconciliation")}
            //   >
            //     <i className="fas fa-download"></i> Скачать акт по уcлугам
            //   </a>
            // </>
          )}
          {(!second || first) && (
            <a className="btn btn-block btn-success" onClick={onAgree}>
              <i className="fas fa-check"></i> Подтвердить
            </a>
          )}
          {(second || !first) && (
            <a className="btn btn-block btn-light" onClick={showModal}>
              <i className="fas fa-times-circle"></i> Оспорить и oставить
              комментарий
            </a>
          )}
          {/* <Fragment>
          {act !== '' ? <a href={act} className="download" target="_blank">Cкачать акт</a> : <a className="btn btn-block btn-success" onClick={() => onDownload('reconciliation')}><i className="fas fa-download"></i> Получить акт выполненных работ</a>}
          {bill !== '' ? <a href={bill} className="download" target="_blank">Скачать счет</a> : <a className="btn btn-block btn-success" onClick={() => onDownload('invoice')}><i className="fas fa-download"></i> Получить счет</a>}
          </Fragment> */}
        </Fragment>
      )}
    </div>
  );
};

const redBg = {
  backgroundColor: "#F0A5A5",
};
const grayBg = {
  backgroundColor: "#f2f2f2",
};
const input = {
  width: "100%",
  boxSizing: "border-box",
  height: "2rem",
};

export default Card;
