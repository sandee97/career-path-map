import React, { useRef ,useState} from 'react';
import {Container, Row,Col, Form, Button, Alert} from 'react-bootstrap'
import '../App.css'
import { Link } from "react-router-dom"
import { useAuth } from '../auth/context';
import {useNavigate} from 'react-router-dom'
function SignUp() {
  const name = useRef();
  const email =useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const phone = useRef();
  const { signup, logout } =useAuth()
  const [loading, setLoading] =useState(false);
  const [error,setError] = useState();
  const navigate=useNavigate();

  async function handleSubmit(e){
    e.preventDefault()

    if (password.current.value !== confirmPassword.current.value) {
      return setError("Passwords are not matched")
    }
    try {
      setError("")
      setLoading(true)
      await signup(email.current.value, password.current.value, phone.current.value)
      navigate('/login')
    } catch(e) {
      return setError(JSON.stringify(e["code"]));
    }
    setLoading(false)
  }
  return (
    <>
    <div className="auth-inner">
      {error && <Alert variant="danger" style={{textAlign: "center"}}>{error}</Alert>}
    <Form className="form" onSubmit={handleSubmit}>
      <h1 style={{color:"orange",textAlign:"center"}}>Career</h1>
      <h1 style={{color:"blue",textAlign:"center"}}>Path Map</h1>
      <br/>
      <Container>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Enter Name</Form.Label>
            <Form.Control type="text" placeholder="Enter username" ref={name} required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Email</Form.Label>
            <Form.Control type="email" placeholder="Enter Email" ref={email} required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Enter Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" ref={password} required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Re-enter Password</Form.Label>
          <Form.Control type="password" placeholder="Re-enter password" ref={confirmPassword} required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="number" placeholder="Enter Phone Number" ref={phone} required/>
        </Form.Group>
        <Button disabled={loading} variant="success" type="submit" style={{width:"100%"}}>
          Register
        </Button>
        <br/>
        <br/>
        <Row>
          <Col>
            <Link to="/login" style={{textAlign:"left"}}>Login</Link>
          </Col>
          <Col>
            <Link to="/home" style={{float:"right"}}>Home</Link>
          </Col>
        </Row>
        <br/>
      </Container>
    </Form>
    </div>
    </>
  );
}
export default SignUp; 