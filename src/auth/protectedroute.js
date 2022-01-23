import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

export const ProtectedRoutes = () =>{
    return(
      <Router>
        <Routes>
        <Route path="/Hehe" element={<>jadfskl</>} />
        </Routes>
      </Router>
    )
} 
  