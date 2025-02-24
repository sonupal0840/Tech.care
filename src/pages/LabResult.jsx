import React from "react";
import style from "./Lab.module.css"
import { useState, useEffect } from "react";

const LabResults = ({ LabResult }) => {

  const [Lab, setLab] = useState([]);

  useEffect(() => {
    // Update the state when DiagonsisList prop changes
    if (Array.isArray(LabResult)) {
      setLab(LabResult);
    } else {
      setLab([]);  // Fallback to empty array if not an array
    }
  }, [LabResult]);
  return (
    <div id={style.Lab}>
      <h1 id={style.title}>LabResults</h1>

      <div id={style.profile_pictures_container}>
        {/* Check if Diagnosis list is available */}
        {Lab.length === 0 ? (
          <div id={style.Error}>
            <p>No Data</p>
          </div>
        ) : (
          Lab.map((item, index) => (
            <ul key={item} id={style.Result}>
              <li>{item}</li>
              <li>↓</li>
            </ul>
          ))
        )}
      </div>


    </div>
  )
}
export default LabResults;

