import React, { useEffect, useContext, useState } from "react";
import FilterContext from "./../Context/filterContext";
import AuthContext from "./../Context/authContext/authContext";
import Spinner from "./../Layout/Spinner2";

const Fines = () => {
  const {
    loading,
    getFines,
    fines,
    finesType,
    setFinesType,
    resetFines,
  } = useContext(FilterContext);
  const { login, key } = useContext(AuthContext);

  useEffect(() => {
    if (fines.length === 0) {
      getFines(login, key, finesType);
    }
    // eslint-disable-next-line
  }, []);

  const refresh = () => {
    resetFines();
    getFines(login, key, finesType);
  };

  return (
    <div className="container">
      <h4>
        Штрафы{" "}
        {!loading && (
          <i className="fas fa-sync-alt refresh-logs" onClick={refresh}></i>
        )}
      </h4>
      {!loading && (
        <select
          className="browser-default"
          value={finesType}
          onChange={(e) => {
            setFinesType(e.target.value);
            getFines(login, key, e.target.value);
          }}
        >
          <option value="fines">такси и физ. лица</option>
          <option value="finesCarsh">каршеринг</option>
        </select>
      )}
      {loading ? (
        <Spinner />
      ) : fines === "Error" ? (
        <p>Нет штрафов</p>
      ) : fines.length > 1 ? (
        <table>
          <tbody id="archive-table">
            {fines.map((tr, i) => (
              <tr key={i}>
                {tr.map((td, i) => (
                  <td key={i} style={{ width: `${100 / 5}` }}>
                    {td}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Нет штрафов</p>
      )}
    </div>
  );
};

export default Fines;
