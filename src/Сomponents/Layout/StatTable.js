import React, { Fragment, useContext } from "react";
import FilterContext from "../Context/filterContext";

const StatTable = ({ onDownload }) => {
  const { stat, archive, date1, date2 } = useContext(FilterContext);

  const values = {
    Wash_Express: "Мойка Экспресс",
    Wash_Body: "Мойка Кузов",
    Wash_Standard: "Мойка Стандарт",
    Wash_Complex: "Мойка Комплекс",
    Wash_Lux: "Мойка Люкс",
    Dez: " ",
    Carsh: "Каршеринг. Выручка",
    Fines: "Штрафы",
    Compensations: "Компенсации",
  };

  const hardcodeArr = [
    ["Итого выручки", "TOTAL", "TOTAL"],
    ["Мойка частных лиц и такси", "TOTAL", "TOTAL"],
    ["Wash_Express", "720.0", "4"],
    ["Wash_Body", "0.0", "0"],
    ["Wash_Standard", "5080.0", "18"],
    ["Wash_Complex", "2650.0", "7"],
    ["Wash_Lux", "450.0", "1"],
    ["Дезинфекция Такси и Физ. лиц", "TOTAL", "TOTAL"],
    ["Dez", "1", "40420.0"],
    ["Мойка и дезинфекция Каршеринга", "TOTAL", "TOTAL"],
    ["Carsh", "668", null],
    ["Штрафы и компенсации", "TOTAL", "TOTAL"],
    ["Fines", null, null],
    ["Compensations", null, "120"],
  ];

  return (
    <div id="stat-table">
      {stat === "Error" ? (
        <p>Произошла ошибка</p>
      ) : (
        stat !== null && (
          <>
            <table>
              <tbody>
                {/* <tr>
                  <td>Период</td>
                  <td>{date1}</td>
                  <td>{date2}</td>
                </tr> */}
                {stat.map((item, i) => (
                  <Fragment key={i}>
                    <tr>
                      {item.map((td, i) => (
                        <td key={i}>{td === null ? "-" : td}</td>
                      ))}
                    </tr>
                    {/* {i === 0 && <tr style={{ height: "1.5rem" }}></tr>} */}
                  </Fragment>
                ))}
              </tbody>
            </table>
            {archive !== null && archive !== "Error" && (
              <button
                className="btn btn-success btn-block"
                style={{ width: "100%" }}
                onClick={onDownload}
              >
                <i
                  className="fas fa-arrow-down"
                  style={{ marginRight: "1rem" }}
                />
                Скачать подробную выгрузку
              </button>
            )}
          </>
        )
      )}
    </div>
  );
};

export default StatTable;
