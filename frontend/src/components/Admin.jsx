import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Admin.css";
import { getAllEvents } from "../Api"; // Assuming this API fetches all events

const Admin = () => {
  const [eventCounts, setEventCounts] = useState({
    totalEvents: 0,
    approvedEvents: 0,
    rejectedEvents: 0,
  });

  // Fetch event counts
  const fetchEventCounts = async () => {
    try {
      const response = await getAllEvents(); // Fetch all events
      const events = response.data;

      const totalEvents = events.length;
      const approvedEvents = events.filter((event) => event.status === "Approved").length;
      const rejectedEvents = events.filter((event) => event.status === "Rejected").length;

      setEventCounts({
        totalEvents,
        approvedEvents,
        rejectedEvents,
      });
    } catch (error) {
      console.error("Error fetching event counts", error);
    }
  };

  useEffect(() => {
    fetchEventCounts();
  }, []);
  return (
    <div>
    <div className='admin-top'>EXTERNAL EVENT MANAGEMENT PORTAL</div>
    <div className='admin-container'>
        <div className="admin-left">
        <ul>
            <li>
                <Link to = "/admin">DASHBOARD</Link>
            </li>
            <li>
                <Link to ="/verification">VERIFICATION</Link>
            </li>
            <li>
                <Link to ="/approved">APPROVED EVENTS</Link>
            </li>
            <li>
                <Link to ="/rejected">REJECTED EVENTS</Link>
            </li>
            <li>
                <Link to ="/">LOGOUT</Link>
            </li>
        </ul>
        </div>
        <div className="admin-right">
          <h1>Hello Admin!</h1>
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
        </div>
      </div>
    </div>
  );
};

export default Admin;