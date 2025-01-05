import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllAssesment, approveOrRejectAssesment } from "../Api";
import "./Iraverification.css";

const Iraverification = () => {
  const [assessments, setAssessments] = useState([]);
  const [remarks, setRemarks] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await getAllAssesment();
        setAssessments(response.data);

        const initialRemarks = {};
        response.data.forEach((assessment) => {
          initialRemarks[assessment._id] = assessment.remarks || "";
        });
        setRemarks(initialRemarks);
      } catch (error) {
        console.error("Error fetching assessments:", error);
      }
    };
    fetchAssessments();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const remark = remarks[id] || "";
      const response = await approveOrRejectAssesment(id, {
        status,
        remarks: remark,
      });

      setAssessments((prev) =>
        prev.map((assessment) =>
          assessment._id === id
            ? {
                ...assessment,
                status: response.data.status,
                remarks: response.data.remarks,
              }
            : assessment
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleRemarkChange = (id, value) => {
    setRemarks((prev) => ({ ...prev, [id]: value }));
  };

  const filteredAssessments = assessments.filter(
    (assessment) =>
      assessment.name.toLowerCase().includes(search.toLowerCase()) ||
      assessment.rollnumber.toLowerCase().includes(search.toLowerCase()) ||
      assessment.event.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="iraverification-top">
        EXTERNAL EVENT MANAGEMENT PORTAL
      </div>
      <div className="iraverification-container">
        <div className="iraverification-left">
          <ul>
            <li>
              <Link to="/admin">DASHBOARD</Link>
            </li>
            <li>
              <Link to="/verification">EVENT VERIFICATION</Link>
            </li>
            <li>
              <Link to="/approved">APPROVED EVENTS</Link>
            </li>
            <li>
              <Link to="/rejected">REJECTED EVENTS</Link>
            </li>
            <li>
              <Link to="/iraverification">IRA VERIFICATION</Link>
            </li>
            <li>
              <Link to="/">LOGOUT</Link>
            </li>
          </ul>
        </div>
        <div className="iraverification-right">
          <div className="iraverification-right-top">
            <h1>IRA VERIFICATION</h1>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="iraverification-right-container">
            <table>
              <thead>
                <tr>
                  <th>S NO</th>
                  <th>NAME</th>
                  <th>ROLL NUMBER</th>
                  <th>EVENT NAME</th>
                  <th>STATUS</th>
                  <th>REMARKS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssessments.map((assessment, index) => (
                  <tr key={assessment._id}>
                    <td>{index + 1}</td>
                    <td>{assessment.name}</td>
                    <td>{assessment.rollnumber}</td>
                    <td>{assessment.event}</td>
                    <td>{assessment.status || "Pending"}</td>
                    <td>
                      <input
                        type="text"
                        placeholder="Add remarks"
                        value={remarks[assessment._id] || ""}
                        onChange={(e) =>
                          handleRemarkChange(assessment._id, e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          handleStatusChange(assessment._id, "Approved")
                        }
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(assessment._id, "Rejected")
                        }
                      >
                        Reject
                      </button>
                    </td>
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

export default Iraverification;
