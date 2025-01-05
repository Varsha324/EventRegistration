import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'
import Signup from './components/Signup'
import Student from './components/Student';
import Status from './components/Status';
import Approved from './components/Approved';
import Rejected from './components/Rejected';
import Registration from './components/Registration';
import Admin from './components/Admin';
import Verification from './components/Verification';
import Iraassesment from './components/Iraassesment';
import Irastatus from './components/Irastatus';
import Iraverification from './components/Iraverification';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<Login/>}/>
        <Route path = "/signup" element ={<Signup/>}/>
        <Route path = "/student" element= {<Student/>}/>
        <Route path= '/register' element={<Registration/>}/>
        <Route path = "/status" element={<Status/>}/>
        <Route path ="/approved" element={<Approved/>}/>
        <Route path = "/rejected" element={<Rejected/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path ="/verification" element ={<Verification/>}/>
        <Route path = "/iraassesment" element = {<Iraassesment/>}/>
        <Route path = "/irastatus" element = {<Irastatus/>}/>
        <Route path = "/iraverification" element ={<Iraverification/>}/>
       
      </Routes>
    </Router>
  )
}

export default App
