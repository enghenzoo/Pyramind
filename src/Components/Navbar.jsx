import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.jpg";
import "./Navbar.css";

export default function AppNavbar() {
  return (
    <Navbar expand="lg" variant="dark" className="bg-transparent py-3 px-4">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center fw-bold">
          <img src={Logo} alt="Pyramind Logo" className="Logo me-2" />
          PYRAMIND
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="gap-3">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/games">Games</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          <Nav.Link as={Link} to="/register" className="sign-up-btn fw-bold px-3 py-2">Sign Up</Nav.Link>

  </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
