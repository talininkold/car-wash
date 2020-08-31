import React from "react";

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "display-block" : "display-none";

  return (
    <div className={showHideClassName} style={modal}>
      <section className="modal-main">
        {children}
        <a onClick={handleClose} className="btn btn-light btn-block">
          Закрывать
        </a>
      </section>
    </div>
  );
};

const modal = {
  boxSizing: "border-box",
  position: "fixed",
  borderRadius: 0,
  margin: 0,
  padding: 0,
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.7)",
};

export default Modal;
