import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.jpg";
import "./Navbar.css";

// AppNavbar component: main navigation bar for the website
export default function AppNavbar() {
  return (
    // Bootstrap Navbar component with dark variant and transparent background
    <Navbar expand="lg" variant="dark" className="bg-transparent py-3 px-4">
      <Container>
        {/* Brand/logo section linking to home page */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center fw-bold">
          <img src={Logo} alt="Pyramind Logo" className="Logo me-2" /> {/* Logo image */}
          PYRAMIND {/* Brand name */}
        </Navbar.Brand>

        {/* Hamburger menu toggle for smaller screens */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Collapsible menu items */}
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="gap-3">
            {/* Navigation links */}
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/games">Games</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>

            {/* Sign-up button styled differently */}
            <Nav.Link as={Link} to="/register" className="sign-up-btn fw-bold px-3 py-2">
              Sign Up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


