import { useState, useEffect, useRef } from "react";
import React from "react";
import style from "./Patients.module.css";
import search_Logo from "../assets/search_icon.jpg";

const Patients = ({ setState, setDefaultPatient }) => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]); // Filtered list of patients
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [isSearching, setIsSearching] = useState(false); // Toggle title or search bar

  const [DefaultProfile, setDefaultProfile] = useState(null); // Default profile
  console.log("Default Profile:", DefaultProfile);

  const containerRef = useRef(null); // Reference to the container
  let selectedCardRef = useRef(null); // Reference to the selected card

  // Function to fetch data from the API
  const fetchPatients = async () => {
    const username = "coalition";
    const password = "skills-test";
    const encodedCredentials = btoa(`${username}:${password}`);

    try {
      const response = await fetch(
        "https://fedskillstest.coalitiontechnologies.workers.dev/Patients",
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${encodedCredentials}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      // Find and set the default profile (Jessica Taylor)
      const defaultPatient = data.find((person) => person.name === "Jessica Taylor");
      setDefaultProfile(defaultPatient);
      setDefaultPatient(defaultPatient); // Pass default profile to parent component

      setPatients(data);
      setFilteredPatients(data); // Initially, show all patients
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch patients when the component mounts
  useEffect(() => {
    fetchPatients();
  }, []);

  // Filter patients based on the search term
  useEffect(() => {
    setFilteredPatients(
      patients.filter((patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, patients]);

  // Handle patient click and set selected patient
  const getSinglePatient = (data) => {
    setState(data); // Set the selected patient in parent state
    setSearchTerm(""); // Clear the search term
    setIsSearching(false); // Hide search bar
  };

  // Add click listeners to each card for highlight functionality
  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      const patientCards = container.querySelectorAll(`#${style.patient_card}`);

      patientCards.forEach((card) => {
        card.addEventListener("click", () => {
          if (selectedCardRef.current) {
            selectedCardRef.current.classList.remove(style.highlight); // Remove highlight from previously selected card
          }

          card.classList.add(style.highlight); // Add highlight to clicked card
          selectedCardRef.current = card; // Update selected card reference
        });
      });
    }

    return () => {
      // Cleanup event listeners when the component unmounts or updates
      const container = containerRef.current;

      if (container) {
        const patientCards = container.querySelectorAll(`#${style.patient_card}`);
        patientCards.forEach((card) => {
          card.removeEventListener("click", () => { });
        });
      }
    };
  }, [filteredPatients]); // Re-run effect when the filteredPatients list changes

  if (loading) return <p id={style.loading}>Loading patients...</p>;
  if (error) return <p id={style.errorMessage}>Error: {error}</p>;

  return (
    <div id={style.Patients}>
      <div id={style.title}>
        {/* Toggle between title and search bar */}
        {!isSearching ? (
          <>
            <h1>Patient</h1>
            <img
              src={search_Logo}
              alt="Search"
              onClick={() => setIsSearching(true)} // Show search bar on click
              id={style.search_icon}
            />
          </>
        ) : (
          <input
            type="text"
            placeholder="Search patients by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            id={style.searchBar}
            autoFocus // Automatically focus the input when it appears
          />
        )}
      </div>

      {/* Patients List */}
      <div id={style.profile_pictures_container} ref={containerRef}>
        {filteredPatients.map((patient, index) => (
          <div
            key={patient.id || patient.name || `patient-${index}`} // Unique key for each patient
            id={style.patient_card}
            onClick={() => getSinglePatient(patient)} // Set the selected patient
          >
            {patient.profile_picture ? (
              <img
                src={patient.profile_picture}
                alt={`${patient.name}'s Profile`}
                id={style.profile_picture}
              />
            ) : (
              <p>No profile picture available</p>
            )}
            <p>
              {patient.name} <br />
              {patient.gender} {patient.age}
            </p>
            <p id={style.horizontal_dot}>…</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Patients;

