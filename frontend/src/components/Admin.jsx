import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Admin.css";
import { getAllEvents, getAllAssesment } from "../Api";

const Admin = () => {
  const [eventCounts, setEventCounts] = useState({
    totalEvents: 0,
    approvedEvents: 0,
    rejectedEvents: 0,
  });

  const [iraCounts, setIraCounts] = useState({
    totalIRA: 0,
    approvedIRA: 0,
    rejectedIRA: 0,
  });

  const fetchEventCounts = async () => {
    try {
      const response = await getAllEvents();
      const events = response.data;

      const totalEvents = events.length;
      const approvedEvents = events.filter(
        (event) => event.status === "Approved"
      ).length;
      const rejectedEvents = events.filter(
        (event) => event.status === "Rejected"
      ).length;

      setEventCounts({
        totalEvents,
        approvedEvents,
        rejectedEvents,
      });
    } catch (error) {
      console.error("Error fetching event counts", error);
    }
  };

  const fetchIraCounts = async () => {
    try {
      const response = await getAllAssesment();
      const assessments = response.data;

      const totalIRA = assessments.length;
      const approvedIRA = assessments.filter(
        (assessment) => assessment.status === "Approved"
      ).length;
      const rejectedIRA = assessments.filter(
        (assessment) => assessment.status === "Rejected"
      ).length;

      setIraCounts({
        totalIRA,
        approvedIRA,
        rejectedIRA,
      });
    } catch (error) {
      console.error("Error fetching IRA counts", error);
    }
  };

  useEffect(() => {
    fetchEventCounts();
    fetchIraCounts();
  }, []);

  return (
    <div>
      <div className="admin-top">EXTERNAL EVENT MANAGEMENT PORTAL</div>
      <div className="admin-container">
        <div className="admin-left">
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
        <div className="admin-right">
          <h1>Hello Admin!</h1>
          <div className="rules1-container">
            <div className="rules1">
              <h2>Total Registered Events</h2>
              <p>{eventCounts.totalEvents}</p>
            </div>
            <div className="rules1">
              <h2>Approved Events</h2>
              <p>{eventCounts.approvedEvents}</p>
            </div>
            <div className="rules1">
              <h2>Rejected Events</h2>
              <p>{eventCounts.rejectedEvents}</p>
            </div>

            <div className="rules1">
              <h2>Total Registered IRA</h2>
              <p>{iraCounts.totalIRA}</p>
            </div>
            <div className="rules1">
              <h2>Approved IRA</h2>
              <p>{iraCounts.approvedIRA}</p>
            </div>
            <div className="rules1">
              <h2>Rejected IRA</h2>
              <p>{iraCounts.rejectedIRA}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
