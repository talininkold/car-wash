import React, { useState, Fragment, useContext } from "react";
// import FilterContext from '../Context/filterContext'
import AuthContext from "../Context/authContext/authContext";
import Modal from "./Modal";

const Card = ({ headers, params, onLoading }) => {
  const { login, key, setAlert } = useContext(AuthContext);

  const [modal, setModal] = useState(false);
  const [reason, setReason] = useState("");

  const [first, setFirst] = useState(params[0]);
  const [second, setSecond] = useState(params[1]);
  const [third, setThird] = useState(params[2]);
  const [loading, setLoading] = useState(false);

  const leftColumn = headers.slice(3, headers.length);
  const rightColumn = params.slice(3, params.length);
  const date1 = rightColumn[0];
  const date2 = rightColumn[1];
  const payment = rightColumn[2];

  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
  };

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
      setAlert("Свера отклонена", "success");
    } catch (error) {
      setAlert("Произошла ошибка", "danger");
    }
    onLoading(false);
    setLoading(false);
    setReason("");
  };

  const onDownload = async () => {
    onLoading(true);
    setLoading(true);
    try {
      const reconciliation = await fetch(
        `https://script.google.com/macros/s/AKfycbxIqFt9DzdnB085apVHNbLC6jiPqClksLWhUK1PtpbyCdDsGLRz/exec?user=${login}&key=${key}&request=reconciliation`
      );
      const reconciliationData = await reconciliation.json();
      const invoice = await fetch(
        `https://script.google.com/macros/s/AKfycbxIqFt9DzdnB085apVHNbLC6jiPqClksLWhUK1PtpbyCdDsGLRz/exec?user=${login}&key=${key}&request=invoice`
      );
      const invoiceData = await invoice.json();
      onLoading(false);
      setLoading(false);
      return {
        reconciliation: reconciliationData.url,
        invoice: invoiceData.url,
      };
    } catch (error) {
      setAlert("Произошла ошибка", "danger");
      onLoading(false);
      setLoading(false);
      return null;
    }
  };

  const openInNewTab = async () => {
    const urls = await onDownload();
    if (urls !== null) {
      Object.assign(document.createElement("a"), {
        target: "_blank",
        href: urls.reconciliation,
      }).click();
      Object.assign(document.createElement("a"), {
        target: "_blank",
        href: urls.invoice,
      }).click();
    }
  };

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
            <tr key={index}>
              <td>{tr}</td>
              <td className="bold">
                {rightColumn[index] === null || rightColumn[index] === ""
                  ? "-"
                  : rightColumn[index]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!loading && (
        <Fragment>
          {second * third === 1 && (
            <a className="btn btn-block btn-success" onClick={openInNewTab}>
              <i className="fas fa-download"></i> Скачать счет и акт по уcлугам
            </a>
          )}
          {(!second || first) && (
            <a className="btn btn-block btn-main" onClick={onAgree}>
              <i className="fas fa-check"></i> Cогласовать
            </a>
          )}
          {(second || !first) && (
            <a className="btn btn-block btn-light" onClick={showModal}>
              <i className="fas fa-times-circle"></i> Оспорить
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
  backgroundColor: "#96969666",
};
const input = {
  width: "100%",
  boxSizing: "border-box",
  height: "2rem",
};

export default Card;
