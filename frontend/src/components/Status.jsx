import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../Api";
import "./Status.css";

const Status = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  const fetchEvents = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await getEvents(userId);
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.eventname.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="status-top">EXTERNAL EVENT MANAGEMENT PORTAL</div>
      <div className="status-container">
        <div className="status-left">
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
        <div className="status-right">
          <div className="status-right-top">
            <h1>REGISTRATION STATUS</h1>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="status-right-container">
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
                  <tr key={event.id}>
                    <td>{event.registration_id}</td>
                    <td>{event.name}</td>
                    <td>{event.rollnumber}</td>
                    <td>{event.eventname}</td>
                    <td>{event.organiser}</td>
                    <td>
                      <a href={event.weblink} target="_blank" rel="noreferrer">
                        {event.weblink}
                      </a>
                    </td>
                    <td>{new Date(event.startdate).toLocaleDateString()}</td>
                    <td>{new Date(event.enddate).toLocaleDateString()}</td>
                    <td>{event.status || "Pending"}</td>
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

export default Status;
