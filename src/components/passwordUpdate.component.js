import React, { useRef, useState } from "react"
import { Form, Button,  Alert, Container, Row, Col } from "react-bootstrap"
import { useAuth } from "../auth/context"
import { Link } from "react-router-dom"
import '../App.css'
export default function ForgotPassword() {
  const email = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(email.current.value)
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
    }
    setLoading(false)
  }

  return (
    <>
    <div className="auth-inner">
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
              <Container>
          <h1 style={{color:"blue",textAlign:"center"}}>Password Reset</h1>
            <Form.Group id="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={email} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Reset Password
            </Button>
            <br/>
            <br/>
            <Row>
                <Col>
                    <Link to="/signup" style={{float:"left"}}>Register</Link>
                </Col>
                <Col>
                    <Link to="/home" style={{float:"right"}}>Home</Link>
                </Col>
            </Row>
        </Container>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
          </div>
    </div>
    </>
  )
}