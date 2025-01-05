import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAssesment } from '../Api'; // Ensure the API function name matches its implementation
import './Irastatus.css';

const Irastatus = () => {
  const [assessments, setAssessments] = useState([]); // State to hold assessment data
  const [search, setSearch] = useState(""); // State for search input

  // Function to fetch assessments
  const fetchAssessments = async () => {
    try {
      const userId = localStorage.getItem("userId"); // Fetch the logged-in user ID
      const response = await getAssesment(userId); // Use the correct function name
      setAssessments(response.data); // Update state with fetched assessments
    } catch (error) {
      console.error("Error fetching assessments:", error);
    }
  };

  // Fetch assessments on component mount
  useEffect(() => {
    fetchAssessments();
  }, []);

  // Filter assessments based on search input
  const filteredAssessments = assessments.filter((assessment) =>
    assessment.name.toLowerCase().includes(search.toLowerCase()) // Assuming `name` is a property of each assessment
  );

  return (
    <div>
      {/* Top Header */}
      <div className="irastatus-top">EXTERNAL EVENT MANAGEMENT PORTAL</div>

      {/* Main Container */}
      <div className="irastatus-container">
        {/* Sidebar Navigation */}
        <div className="irastatus-left">
          <ul>
            <li><Link to="/student">DASHBOARD</Link></li>
            <li><Link to="/register">REGISTRATION</Link></li>
            <li><Link to="/status">STATUS</Link></li>
            <li><Link to="/approved">APPROVED EVENTS</Link></li>
            <li><Link to="/rejected">REJECTED EVENTS</Link></li>
            <li><Link to="/iraassesment">IRA REGISTRATION</Link></li>
            <li><Link to="/irastatus">IRA STATUS</Link></li>
            <li><Link to="/">LOGOUT</Link></li>
          </ul>
        </div>

        {/* Content Section */}
        <div className="irastatus-right">
          {/* Top Section with Title and Search */}
          <div className="irastatus-right-top">
            <h1>STATUS</h1>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)} // Update search input state
              className="search-input"
            />
          </div>

          {/* Table Section */}
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
                  <th>REMARKS</th> {/* Remarks Column */}
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
                    <td>{assessment.status || 'Pending'}</td>
                    <td>{assessment.remarks || 'No remarks'}</td> {/* Display remarks */}
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
