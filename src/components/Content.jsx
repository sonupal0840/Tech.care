import React, { useState, useEffect } from "react";
import Patients from "../pages/Patients";
import DiagnosisHistory from "../pages/DiagnosisHistory";
import DiagnosisList from "../pages/DiagnosisList";
import PatientsProfile from "../pages/PatientsProfile";
import LabResults from "../pages/LabResult";
import style from "./Content.module.css";

const Content1 = () => {
  const [patient, setPatient] = useState(null); // Selected patient state
  const [defaultPatient, setDefaultPatient] = useState(null); // Default patient state

  console.log("Selected Patient:", patient);
  console.log("Default Patient:", defaultPatient);

  // Ensure a fallback to the default patient if no patient is selected
  useEffect(() => {
    if (!patient && defaultPatient) {
      setPatient(defaultPatient);
    }
  }, [patient, defaultPatient]);

  return (
    <nav id={style.Content}>
      <div>
        {/* Patients component sets the selected and default patient */}
        <Patients setState={setPatient} setDefaultPatient={setDefaultPatient} />
      </div>
      <div>
        {/* Pass patient's diagnosis history and diagnostic list to corresponding components */}
        <DiagnosisHistory DiagnosisHistoryResult={patient?.diagnosis_history || []} />
        <DiagnosisList DiagnosisList={patient?.diagnostic_list || []} />
      </div>
      <div>
        {/* Pass patient details to profile and lab results components */}
        <PatientsProfile patient={patient} />
        <LabResults LabResult={patient?.lab_results || []} />
      </div>
    </nav>
  );
};

export default Content1;

