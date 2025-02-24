import React, { useState, useEffect } from "react";
import style from "./List.module.css";

const DiagnosisList = ({ DiagnosisList }) => {  // Fixed prop name
  console.log("Received DiagnosisList:", DiagnosisList);

  const [Diagnosis, setDiagnosis] = useState([]);

  useEffect(() => {
    if (Array.isArray(DiagnosisList) && DiagnosisList.length > 0) {
      setDiagnosis([...DiagnosisList]);  // Ensuring state updates
    } else {
      setDiagnosis([]);
    }
  }, [DiagnosisList]);

  return (
    <div id={style.List}>
      <h1 id={style.title}>Diagnosis List</h1>

      <div id={style.listbar}>
        <h2 id={style.dname1}>Problem/Diagnosis</h2>
        <h2 id={style.dname2}>Description</h2>
        <h2 id={style.dname3}>Status</h2>
      </div>

      <div id={style.profile_pictures_container}>
        {Diagnosis.length === 0 ? (
          <div id={style.Error}>
            <p>No Data Available</p>
          </div>
        ) : (
          Diagnosis.map((item, index) => (
            <div key={index} id={style.liststyle}>
              <div id={style.dname1}>{item?.name || "N/A"}</div>
              <div id={style.dname2}>{item?.description || "No Description"}</div>
              <div id={style.dname3}>{item?.status || "Unknown"}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DiagnosisList;

