import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllEvents, approveOrRejectEvent } from "../Api";
import "./Verification.css";

const Verification = () => {
  const [events, setAllEvents] = useState([]);
  const [search, setSearch] = useState("");

  const fetchEvents = async () => {
    try {
      const response = await getAllEvents();
      setAllEvents(response.data);
    } catch (error) {
      console.error("Error fetching events", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleStatusChange = async (eventId, status) => {
    try {
      const response = await approveOrRejectEvent(eventId, { status });
      const updatedEvent = response.data;

      setAllEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === updatedEvent._id ? updatedEvent : event
        )
      );
    } catch (error) {
      console.error("Error updating event status", error);
    }
  };

  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(search.toLowerCase()) ||
      event.rollnumber.toLowerCase().includes(search.toLowerCase()) ||
      event.eventname.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="verification-top">EXTERNAL EVENT MANAGEMENT PORTAL</div>
      <div className="verification-container">
        <div className="verification-left">
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
        <div className="verification-right">
          <div className="verification-right-top">
            <h1>EVENT VERIFICATION</h1>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="verification-right-container">
            <table>
              <thead>
                <tr>
                  <th>EVENT ID</th>
                  <th>NAME</th>
                  <th>ROLL NUMBER</th>
                  <th>EVENT NAME</th>
                  <th>ORGANISER</th>
                  <th>WEBSITE</th>
                  <th>START DATE</th>
                  <th>END DATE</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((event) => (
                  <tr key={event._id}>
                    <td>{event.registration_id}</td>
                    <td>{event.name}</td>
                    <td>{event.rollnumber}</td>
                    <td>{event.eventname}</td>
                    <td>{event.organiser}</td>
                    <td>
                      <a
                        href={event.weblink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {event.weblink}
                      </a>
                    </td>
                    <td>{new Date(event.startdate).toLocaleDateString()}</td>
                    <td>{new Date(event.enddate).toLocaleDateString()}</td>
                    <td>
  <select
    value={event.status}
    onChange={(e) => handleStatusChange(event._id, e.target.value)}
    style={{
      backgroundColor:
        event.status === "Pending"
          ? "lightyellow"
          : event.status === "Approved"
          ? "lightgreen"
          : "lightcoral",
      color: "black",
    }}
  >
    <option value="Pending" style={{ backgroundColor: "lightyellow" }}>
      Pending
    </option>
    <option value="Approved" style={{ backgroundColor: "lightgreen" }}>
      Approved
    </option>
    <option value="Rejected" style={{ backgroundColor: "lightcoral" }}>
      Rejected
    </option>
  </select>
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

export default Verification;
