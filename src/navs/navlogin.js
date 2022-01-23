import React, { Component } from 'react';
import { NavDropdown, Nav ,Container, Navbar, Offcanvas} from 'react-bootstrap';
import { useAuth } from '../auth/context';
import {useNavigate} from 'react-router-dom'
function NavLogin() {
    const navigate= useNavigate();
    const {logout} = useAuth();
    async function handleLogout() {
        try {
            await logout()
            navigate("/login")
        } catch {
            alert("unable to logout")
        }
  }
    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light" style={{textAlign:"center"}}>
            <Container fluid>
                <Navbar.Brand href="#home">
                <i class="bi bi-mortarboard-fill"></i>
                <span>   Career Path Map</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="justify-content-end" style={{ width: "100%" }}>
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link onClick={handleLogout}><i class="bi bi-box-arrow-right"/>  Logout</Nav.Link>
                    </Nav> 
                </Navbar.Collapse>
            </Container>
        </Navbar>                
    );
}

export default NavLogin;