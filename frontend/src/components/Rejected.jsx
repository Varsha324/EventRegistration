import React, { useState, useEffect } from "react";
import "./Rejected.css";
import { getAllEvents } from "../Api";

const Rejected = () => {
  const [rejectedEvents, setRejectedEvents] = useState([]);
  const [search, setSearch] = useState("");

  const fetchRejectedEvents = async () => {
    try {
      const response = await getAllEvents();
      const rejected = response.data.filter(
        (event) => event.status === "Rejected"
      );
      setRejectedEvents(rejected);
    } catch (error) {
      console.error("Error fetching rejected events", error);
    }
  };

  useEffect(() => {
    fetchRejectedEvents();
  }, []);

  const filteredRejectedEvents = rejectedEvents.filter(
    (event) =>
      event.eventname.toLowerCase().includes(search.toLowerCase()) ||
      event.organiser.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="rejected">
        <div className="rejected-top">
          <h1>REJECTED EVENTS</h1>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="rejected-container">
          <table>
            <thead>
              <tr>
                <th>EVENT ID</th>
                <th>EVENT NAME</th>
                <th>ORGANISER</th>
                <th>WEBSITE</th>
                <th>START DATE</th>
                <th>END DATE</th>
                <th>REMARKS</th>
              </tr>
            </thead>
            <tbody>
              {filteredRejectedEvents.map((event) => (
                <tr key={event._id}>
                  <td>{event.registration_id}</td>
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
                  <td>{event.remarks || "No remarks provided"}</td>
                </tr>
              ))}
              {filteredRejectedEvents.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No rejected events found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Rejected;
