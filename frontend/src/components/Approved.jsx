import React, { useState, useEffect } from "react";
import "./Approved.css";
import { getAllEvents } from "../Api"; 

const Approved = () => {
  const [approvedEvents, setApprovedEvents] = useState([]);
  const [search, setSearch] = useState("");

  
  const fetchApprovedEvents = async () => {
    try {
      const response = await getAllEvents(); 
      const approved = response.data.filter((event) => event.status === "Approved"); 
      setApprovedEvents(approved);
    } catch (error) {
      console.error("Error fetching approved events", error);
    }
  };

  useEffect(() => {
    fetchApprovedEvents();
  }, []);


  const filteredApprovedEvents = approvedEvents.filter(
    (event) =>
      event.eventname.toLowerCase().includes(search.toLowerCase()) ||
      event.organiser.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="approved">
        <div className="approved-right-top">
          <h1>APPROVED EVENTS</h1>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="approved-container">
          <table>
            <thead>
              <tr>
                <th>EVENT ID</th>
                <th>EVENT NAME</th>
                <th>ORGANISER</th>
                <th>WEBSITE</th>
                <th>START DATE</th>
                <th>END DATE</th>
              </tr>
            </thead>
            <tbody>
              {filteredApprovedEvents.map((event) => (
                <tr key={event._id}>
                  <td>{event.registration_id}</td>
                  <td>{event.eventname}</td>
                  <td>{event.organiser}</td>
                  <td>
                    <a href={event.weblink} target="_blank" rel="noopener noreferrer">
                      {event.weblink}
                    </a>
                  </td>
                  <td>{new Date(event.startdate).toLocaleDateString()}</td>
                  <td>{new Date(event.enddate).toLocaleDateString()}</td>
                </tr>
              ))}
              {filteredApprovedEvents.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No approved events found.
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

export default Approved;
