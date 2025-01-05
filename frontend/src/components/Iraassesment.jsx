import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createAssesments } from "../Api";
import "./Iraassesment.css";

const Iraassesment = () => {
  const [formData, setFormData] = useState({
    name: "",
    rollnumber: "",
    event: "",
    date: "",
    time: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const [startTime] = formData.time.split("-").map((time) => time.trim());
      const [hours, minutes] = startTime.split(":").map((part) => part.trim());

      const combinedDateTimeString = `${formData.date}T${hours}:${minutes}:00`;

      console.log("Combined Date-Time:", combinedDateTimeString);

      const combinedDateTime = new Date(combinedDateTimeString);

      if (isNaN(combinedDateTime.getTime())) {
        throw new Error("Invalid date-time combination.");
      }

      const payload = {
        ...formData,
        time: combinedDateTime.toISOString(),
      };

      await createAssesments(payload);
      setMessage("Event created successfully!");
      setFormData({
        name: "",
        rollnumber: "",
        event: "",
        date: "",
        time: "",
      });
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage(error.message || "Error registering for assessment.");
    }
  };

  return (
    <div>
      <div className="assesment-top">EXTERNAL EVENT MANAGEMENT PORTAL</div>
      <div className="assesment-container">
        <div className="assesment-left">
          <ul>
            <li>
              <Link to="/student">DASHBOARD</Link>
            </li>
            <li>
              <Link to="/register">REGISTRATION</Link>
            </li>
            <li>
              <Link to="/status">EVENT STATUS</Link>
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
        <div className="assesment-right">
          <h4>IRA REGISTRATION FORM</h4>
          <div className="assesment-right-container">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="text"
                name="rollnumber"
                placeholder="RollNumber"
                required
                value={formData.rollnumber}
                onChange={handleChange}
              />
              <input
                type="text"
                name="event"
                placeholder="Event Name"
                required
                value={formData.event}
                onChange={handleChange}
              />
              <label>Date</label>
              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
              />
              <label>Time</label>
              <select
                name="time"
                required
                value={formData.time}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Time Slot
                </option>
                <option value="09:00-10:00">09:00 – 10:00</option>
                <option value="11:00-12:00">11:00 – 12:00</option>
                <option value="14:00-15:00">14:00 – 15:00</option>
              </select>
              <button type="submit">Submit</button>
            </form>
            <div>
              {message && <p className="feedback-message">{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Iraassesment;
