import React from "react";
import { Navbar, NavbarBrand, Nav } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar className="border-bottom" bg="transparent" expand="lg">
      <NavbarBrand>Matthew Hook</NavbarBrand>
      <NavbarToggle className="border-0 m-2" aria-controls="navbar-toggle" />
      <NavbarCollapse id="navbar-toggle">
        <Nav className="ml-auto">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/about">
            About
          </Link>
          <Link className="nav-link" to="/contact">
            Contact
          </Link>
        </Nav>
      </NavbarCollapse>
    </Navbar>
  );
}

export default Header;
