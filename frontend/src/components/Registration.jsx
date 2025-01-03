import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createEvents } from "../Api"; // Ensure the correct path to your API file
import "./Registration.css";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    rollnumber: "",
    eventname: "",
    organiser: "",
    weblink: "",
    startdate: "",
    enddate: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createEvents(formData); // API call to create an event
      setMessage("Event created successfully!");
      setFormData({
        name: "",
        rollnumber: "",
        eventname: "",
        organiser: "",
        weblink: "",
        startdate: "",
        enddate: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Error creating event.");
    }
  };

  return (
    <div>
      <div className="register-top">EXTERNAL EVENT MANAGEMENT PORTAL</div>
      <div className="register-container">
        <div className="register-left">
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
              <Link to="/">LOGOUT</Link>
            </li>
          </ul>
        </div>
        <div className="register-right">
          <h4>REGISTRATION FORM</h4>
          <div className="register-right-container">
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="rollnumber"
                placeholder="Roll Number"
                value={formData.rollnumber}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="eventname"
                placeholder="Event Name"
                value={formData.eventname}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="organiser"
                placeholder="Organiser"
                value={formData.organiser}
                onChange={handleChange}
                required
              />
              <input
                type="url"
                name="weblink"
                placeholder="Website Link"
                value={formData.weblink}
                onChange={handleChange}
                required
              />
              <label>Start Date</label>
              <input
                type="date"
                name="startdate"
                value={formData.startdate}
                onChange={handleChange}
                required
              />
              <label>End Date</label>
              <input
                type="date"
                name="enddate"
                value={formData.enddate}
                onChange={handleChange}
                required
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
