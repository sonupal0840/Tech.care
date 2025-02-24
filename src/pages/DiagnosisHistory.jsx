import React, { useState, useEffect } from "react";
import style from "./History.module.css";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

// ✅ Image Import Fix
const Heart = new URL("../assets/HeartBPM@2x.jpg", import.meta.url).href;
const Temp = new URL("../assets/temperature@2x.jpg", import.meta.url).href;
const Lungs = new URL("../assets/respiratoryrate@2x.jpg", import.meta.url).href;

const DiagnosisHistory = ({ DiagnosisHistoryResult }) => {
  const [diagnosisHistory, setDiagnosisHistory] = useState([]);
  const [visibleData, setVisibleData] = useState([]);
  const itemsPerPage = 6;
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);

  useEffect(() => {
    if (Array.isArray(DiagnosisHistoryResult)) {
      const sortedData = DiagnosisHistoryResult.sort((a, b) => {
        const dateA = new Date(`${a.month} ${a.year}`);
        const dateB = new Date(`${b.month} ${b.year}`);
        return dateA - dateB;
      });
      setDiagnosisHistory(sortedData);
      setVisibleData(sortedData.slice(-itemsPerPage));
      setSelectedMonthIndex(sortedData.length - 1);
    } else {
      setDiagnosisHistory([]);
      setVisibleData([]);
    }
  }, [DiagnosisHistoryResult]);

  const handleSelectChange = (event) => {
    const selectedIndex = parseInt(event.target.value, 10);
    setSelectedMonthIndex(selectedIndex);
    setVisibleData(
      diagnosisHistory.slice(Math.max(0, selectedIndex - 5), selectedIndex + 1)
    );
  };

  const handleScroll = (event) => {
    event.preventDefault();
    if (event.deltaY > 0) {
      const nextIndex = Math.min(selectedMonthIndex + 1, diagnosisHistory.length - 1);
      setSelectedMonthIndex(nextIndex);
      setVisibleData(
        diagnosisHistory.slice(Math.max(0, nextIndex - 5), nextIndex + 1)
      );
    } else if (event.deltaY < 0) {
      const prevIndex = Math.max(selectedMonthIndex - 1, 0);
      setSelectedMonthIndex(prevIndex);
      setVisibleData(
        diagnosisHistory.slice(Math.max(0, prevIndex - 5), prevIndex + 1)
      );
    }
  };

  useEffect(() => {
    const chartDiv = document.getElementById(style.Chart);
    if (!chartDiv) return;

    chartDiv.addEventListener("wheel", handleScroll, { passive: false });

    return () => chartDiv.removeEventListener("wheel", handleScroll);
  }, [selectedMonthIndex, diagnosisHistory]);

  const chartData = {
    labels: visibleData.map((item) => `${item.month} ${item.year}`),
    datasets: [
      {
        label: "Systolic",
        data: visibleData.map((item) => item?.blood_pressure?.systolic?.value || 0),
        borderColor: "#E87EA1",
        backgroundColor: "rgba(232, 126, 161, 0.2)",
        tension: 0.4,
      },
      {
        label: "Diastolic",
        data: visibleData.map((item) => item?.blood_pressure?.diastolic?.value || 0),
        borderColor: "#8E6BE8",
        backgroundColor: "rgba(142, 107, 232, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: true } },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { display: true } },
    },
  };

  return (
    <div id={style.History}>
      <h1 id={style.title}>Diagnosis History Patient</h1>

      <div id={style.Chart}>
        <nav>
          <h2>Blood Pressure</h2>
          <select id={style.month_select} value={selectedMonthIndex} onChange={handleSelectChange}>
            {diagnosisHistory.map((item, index) => (
              <option key={index} value={index} id={style.options}>
                {`${item.month} ${item.year}`}
              </option>
            ))}
          </select>
        </nav>

        <nav>
          <div id={style.Line}>
            <Line data={chartData} options={options} id={style.Line} />
          </div>
          <div id={style.chartLegend}>
            <p id={style.sis}>
              <span id={style.systolicDot}></span>
              <span>
                Systolic: <br />
                <b id={style.systo}>{visibleData?.[0]?.blood_pressure?.systolic?.value || "None"}</b>
                <br />
                {visibleData?.[0]?.blood_pressure?.systolic?.levels || "None"}
              </span>
            </p>
            <hr />
            <p id={style.sis}>
              <span id={style.diastolicDot}></span>
              <span>
                Diastolic: <br />
                <b id={style.systo}>{visibleData?.[0]?.blood_pressure?.diastolic?.value || "None"}</b>
                <br />
                {visibleData?.[0]?.blood_pressure?.diastolic?.levels || "None"}
              </span>
            </p>
          </div>
        </nav>
      </div>

      {/* Info Box */}
      <div id={style.box}>
        <div className={style.Heart} id={style.boxs}>
          <img id={style.Logo} src={Heart} alt="Heart Rate" />
          <p id={style.p1}>Heart Rate</p>
          <b id={style.b1}>{visibleData?.[0]?.heart_rate?.value || "N/A"} bpm</b>
          <p id={style.p2}>{visibleData?.[0]?.heart_rate?.levels || "None"}</p>
        </div>
        <div className={style.Tempreture} id={style.boxs}>
          <img id={style.Logo} src={Temp} alt="Temperature" />
          <p id={style.p1}>Temperature</p>
          <b id={style.b1}>{visibleData?.[0]?.temperature?.value || "N/A"}°F</b>
          <p id={style.p2}>{visibleData?.[0]?.temperature?.levels || "None"}</p>
        </div>
        <div className={style.Lungs} id={style.boxs}>
          <img id={style.Logo} src={Lungs} alt="Respiratory Rate" />
          <p id={style.p1}>Respiratory Rate</p>
          <b id={style.b1}>{visibleData?.[0]?.respiratory_rate?.value || "N/A"} bpm</b>
          <p id={style.p2}>{visibleData?.[0]?.respiratory_rate?.levels || "None"}</p>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisHistory;
