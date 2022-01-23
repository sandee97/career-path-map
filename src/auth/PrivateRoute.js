import React,{useEffect} from "react"
import { Route, Navigate } from "react-router-dom"
import { useAuth } from "./context"
import Login from "../components/login.component"

export default function PrivateRoute({ element: Component, ...rest }) {
  const { currentUser } = useAuth()

  return (
    <Route
      {...rest}
      element={currentUser ? Component : <Navigate to="/login" />}
    ></Route>
  )
}