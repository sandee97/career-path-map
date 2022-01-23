import React, { useRef, useState } from 'react';
import {Container, Row,Col, Form, Button, Alert} from 'react-bootstrap'
import '../App.css'
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/context';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
function Login() {
  const email = useRef()
  const password = useRef()
  const { login,signup,socialsignup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleSocialLogin = async (provider) => { 
    try{  
      setError("")
      setLoading(true)
      await socialsignup(provider);
      navigate("/dash")
    }
    catch(e){
      setError("Failed to log in")
    }
      
  }
  async function handleSubmit(e){
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      alert("start")
      await login(email.current.value, password.current.value)
      navigate("/dash")
    } catch(e) {
      setError(JSON.stringify(e["code"]))
    }

    setLoading(false)
  }

  return (
    <div className="auth-inner">
      {error && <Alert variant="danger" style={{textAlign:"center"}}>{error}</Alert>}
<Form onSubmit={handleSubmit} className="form">
<h1 style={{color:"orange",textAlign:"center"}}>Career</h1>
<h1 style={{color:"blue",textAlign:"center"}}>Path Map</h1>
<br/>
<Container>
<Form.Group className="mb-3" controlId="formBasicEmail">
  <Form.Label>Enter Email or Phone number</Form.Label>
    <Form.Control type="email" placeholder="Enter username" ref={email} required/>
</Form.Group>
<Form.Group className="mb-3" controlId="formBasicPassword">
  <Form.Label>Enter Password</Form.Label>
  <Form.Control type="password" placeholder="Enter password" ref={password} required/>
</Form.Group>
<Row>
  <Col>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Remember Me" />
  </Form.Group>
  </Col>
  <Col>
  <Link to="/passwordReset" style={{float:"right"}}>Forgot password ?</Link>
  </Col>
</Row>
<Button variant="success" disabled={loading} type="submit" style={{width:"100%"}}>
  Login
</Button>
<br/>
<br/>
<Row>
  <Col>
    <Link to="/signup" style={{textAlign:"left"}}>Register</Link>
  </Col>
  <Col>
    <Link to="/home" style={{float:"right"}}>Home</Link>
  </Col>
</Row>
<br/>
<div style={{alignContent:"center"}}>
  <button className="btnGoogle" onClick={()=> handleSocialLogin(new firebase.auth.GoogleAuthProvider())}><i class="bi bi-google"/> Login with Google</button>
</div>
</Container>
</Form>
    </div>
);
}
export default Login;
