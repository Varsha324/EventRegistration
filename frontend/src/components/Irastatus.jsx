import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAssesment } from "../Api";
import "./Irastatus.css";

const Irastatus = () => {
  const [assessments, setAssessments] = useState([]);
  const [search, setSearch] = useState("");

  const fetchAssessments = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await getAssesment(userId);
      setAssessments(response.data);
    } catch (error) {
      console.error("Error fetching assessments:", error);
    }
  };

  useEffect(() => {
    fetchAssessments();
  }, []);

  const filteredAssessments = assessments.filter((assessment) =>
    assessment.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="irastatus-top">EXTERNAL EVENT MANAGEMENT PORTAL</div>

      <div className="irastatus-container">
        <div className="irastatus-left">
          <ul>
            <li>
              <Link to="/student">DASHBOARD</Link>
            </li>
            <li>
              <Link to="/register">REGISTRATION</Link>
            </li>
            <li>
              <Link to="/status">STATUS</Link>
            </li>
            <li>
              <Link to="/approved">APPROVED EVENTS</Link>
            </li>
            <li>
              <Link to="/rejected">REJECTED EVENTS</Link>
            </li>
            <li>
              <Link to="/iraassesment">IRA REGISTRATION</Link>
            </li>
            <li>
              <Link to="/irastatus">IRA STATUS</Link>
            </li>
            <li>
              <Link to="/">LOGOUT</Link>
            </li>
          </ul>
        </div>

        <div className="irastatus-right">
          <div className="irastatus-right-top">
            <h1>IRA STATUS</h1>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="irastatus-right-container">
            <table>
              <thead>
                <tr>
                  <th>S.NO</th>
                  <th>NAME</th>
                  <th>ROLL NUMBER</th>
                  <th>EVENT NAME</th>
                  <th>DATE</th>
                  <th>TIME</th>
                  <th>STATUS</th>
                  <th>REMARKS</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssessments.map((assessment, index) => (
                  <tr key={assessment._id}>
                    <td>{index + 1}</td>
                    <td>{assessment.name}</td>
                    <td>{assessment.rollnumber}</td>
                    <td>{assessment.event}</td>
                    <td>{new Date(assessment.time).toLocaleDateString()}</td>
                    <td>{new Date(assessment.time).toLocaleTimeString()}</td>
                    <td>{assessment.status || "Pending"}</td>
                    <td>{assessment.remarks || "No remarks"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Irastatus;
