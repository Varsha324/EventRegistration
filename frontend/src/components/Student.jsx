import React from "react";
import { Link } from "react-router-dom";
import "./Student.css";
const Student = () => {
  return (
    <div>
      <div className="student-top">EXTERNAL EVENT MANAGEMENT PORTAL</div>
      <div className="student-container">
        <div className="student-left">
          <ul>
            <li>
              <Link to="/student">DASHBOARD</Link>
            </li>
            <li>
              <Link to="/register">EVENT REGISTRATION</Link>
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
        <div className="student-right">
          <h1>Hello Student!</h1>
          <div className="rules">
            <h2>GUIDE LINES</h2>
            <ul>
              <li>The sudent can register the events they wish to register.</li>
              <li>They could view the registered events status . </li>
              <li>
                They will also be able to see the approved and rejected events.
              </li>
              <li>
                Kindly register to the events after verifying whether is present
                in the approved and rejected list.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
