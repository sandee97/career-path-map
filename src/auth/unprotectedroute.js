import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Login from "../components/login.component";
import NavLogout from "../navs/navlogout";
import '../App.css'
export const UnProtectedRoutes = () =>{
    return(
      <Router>
        <Routes>
        <Route path="/login" element={<Login/>} />
        </Routes>
      </Router>
    )
  } 