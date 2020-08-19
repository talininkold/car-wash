import React, { useState, useContext, useEffect } from "react";
// import FilterContext from "../Context/filterContext";
import AuthContext from "../Context/authContext/authContext";
import Spinner from "../Layout/Spinner2";

const Feedback = () => {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const { login, key } = useContext(AuthContext);

  useEffect(() => {
    if (feedback === null) {
      getFeedback();
    }
    // eslint-disable-next-line
  }, []);

  const getFeedback = async () => {
    setLoading(true);
    const res = await fetch(
      `https://script.google.com/macros/s/AKfycbxIqFt9DzdnB085apVHNbLC6jiPqClksLWhUK1PtpbyCdDsGLRz/exec?user=${login}&key=${key}&request=feedback`
    );
    const data = await res.json();
    setFeedback(data.arr);
    setLoading(false);
  };

  const refresh = () => getFeedback();

  if (loading) return <Spinner />;

  return (
    <div className="container">
      <h4>
        Отзывы{" "}
        {!loading && (
          <i className="fas fa-sync-alt refresh-logs" onClick={refresh}></i>
        )}
      </h4>
      {feedback === "Error" ? (
        <p>Нет данных</p>
      ) : feedback && feedback.length > 1 ? (
        <table>
          <tbody id="archive-table">
            {feedback.map((tr, i) => (
              <tr key={i}>
                {tr.map((td, i) => (
                  <td key={i}>{td}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Нет oтзывoв</p>
      )}
    </div>
  );
};

export default Feedback;
