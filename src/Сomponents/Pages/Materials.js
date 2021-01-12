import React, { useContext, useEffect } from "react";
import FilterContext from "../Context/filterContext";
// import AuthContext from "../Context/authContext/authContext";
import Spinner from "../Layout/Spinner2";

const Materials = () => {
  const { loading, getFiles, files } = useContext(FilterContext);
  // const { login, key } = useContext(AuthContext);

  useEffect(() => {
    if (files.length === 0) {
      getFiles();
    }
    // eslint-disable-next-line
  }, []);

  const refresh = () => {
    getFiles();
  };

  return (
    <div className="container">
      <h4>
        Полезные материалы{" "}
        {!loading && (
          <i className="fas fa-sync-alt refresh-logs" onClick={refresh}></i>
        )}
      </h4>
      {loading ? (
        <Spinner />
      ) : files.length > 0 ? (
        <ul id="files">
          {files.map((file, index) => (
            <li key={index}>
              {file[0]}{" "}
              <a href={file[1]} target="_blank">
                <i className="fas fa-download" />
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>Файлов нет</p>
      )}
    </div>
  );
};

export default Materials;
