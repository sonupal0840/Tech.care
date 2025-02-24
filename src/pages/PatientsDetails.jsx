
import style from "./Details.module.css";
import birth from "../assets/BirthIcon.jpg";
import mob from "../assets/PhoneIcon.jpg";
import gender from "../assets/FemaleIcon.jpg";
import Insurance from "../assets/InsuranceIcon.jpg";


const PatientsDetails = ({patient}) => {
  console.log(patient);

  function patientDiagonsisList(){
    console.log(patient.diagnostic_list);
    
  }
  // console.log(patientDiagonsisList);
  

  return (
    <div id={style.Profile}>
      {!patient ? ( // Display error message if any
        <div id={style.Error}>
          <p>No Data</p>
        </div>
      ) : (
        <>
          {/* Profile Picture */}
          <div id={style.ProfileLogo}>
            {patient?.profile_picture ? (
              <img
                src={patient.profile_picture}
                id={style.ProfileLogo_picture}
                alt="Profile"
              />
            ) : (
              <p id={style.ProfileLogoPlaceholder}>No Profile Picture</p>
            )}
          </div>
          
          {/* Patient Name */}
          <h2 id={style.name}>{patient?.name || "Name"}</h2>

          <div>
            {/* Date of Birth */}
            <div id={style.Patients_info}>
              <img id={style.Logo} src={birth} alt="Date of Birth" />
              <div>
                <font>Date of Birth</font>
                <br />
                <b>{patient?.date_of_birth || "Unknown"}</b>
              </div>
            </div>

            {/* Gender */}
            <div id={style.Patients_info}>
              <img id={style.Logo} src={gender} alt="Gender" />
              <div>
                <font>Gender</font>
                <br />
                <b>{patient?.gender || "Unknown"}</b>
              </div>
            </div>

            {/* Contact Info */}
            <div id={style.Patients_info}>
              <img id={style.Logo} src={mob} alt="Contact Info" />
              <div>
                <font>Contact Info.</font>
                <br />
                <b>{patient?.phone_number || "Unknown"}</b>
              </div>
            </div>

            {/* Emergency Contact */}
            <div id={style.Patients_info}>
              <img id={style.Logo} src={mob} alt="Emergency Contact" />
              <div>
                <font>Emergency</font>
                <br />
                <b>{patient?.emergency_contact || "Unknown"}</b>
              </div>
            </div>

            {/* Insurance */}
            <div id={style.Patients_info}>
              <img id={style.Logo} src={Insurance} alt="Insurance" />
              <div>
                <font>Insurance</font>
                <br />
                <b>{patient?.insurance_type || "Unknown"}</b>
              </div>
            </div>

            <button type="submit" id={style.show_more}  
                    // DiagonsisList={DiagonsisList}  
                    onClick={()=>patientDiagonsisList()}>
              Show All Information
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PatientsDetails;

