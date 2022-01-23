import React from 'react';
import AdminDashboard from "./components/adminDashboard.component";
import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import NavLogin from './navs/navlogin';
import NavLogout from './navs/navlogout';
import { Routes, Route, useNavigate } from 'react-router-dom'
import PrivateRoute from './auth/PrivateRoute';
import ForgotPassword from './components/passwordUpdate.component';
import { useAuth } from './auth/context';
import Formcomponent from './components/form.component';
import {Navigate} from 'react-router-dom'
function App() {
  const { currentUser } = useAuth()
  return (
    <div className="App">
        <Routes>
        <Route exact path="/" element={<><h1>hehe</h1></>} />
        <Route exact path="/passwordReset" element={<>
          {currentUser ? (<NavLogin/>)
              :
              (<NavLogout/>)
            }
            <ForgotPassword/></>} />

        <Route path="/dash" element={
          currentUser ? (<AdminDashboard/>)
          :
          (<><Navigate to="/login"/></>)} />       

        <Route exact path="/login" element={<>
          {currentUser ? (<Navigate to="/dash"/>)
              :
              (<><NavLogout/><Login/></>)}</>} />
        <Route exact path="/signup" element={<>          
              {currentUser ? (<Navigate to="/dash" />)
              :
              (<><NavLogout/><SignUp/></>)
            }</>} />
      <Route exact path="/form" element={<>              
              {currentUser ? (<NavLogin/>)
              :
              (<NavLogout/>)
            }<Formcomponent/></>}/>

      </Routes>
    </div>
  );
}

export default App;
