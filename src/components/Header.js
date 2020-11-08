import React from "react";
import { Navbar, NavbarBrand, Nav } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import { Link } from "react-router-dom";
import Typist from "react-typist";

function Header() {
  return (
    <Navbar className="border-bottom" bg="transparent" expand="lg">
      <NavbarBrand>
        <Typist
          avgTypingDelay={200}
          cursor={{ hideWhenDone: true, hideWhenDoneDelay: 1000 }}
        >
          {" "}
          &lt; Matthew / Hook &gt;{" "}
        </Typist>
      </NavbarBrand>
      <NavbarToggle className="border-0 m-2" aria-controls="navbar-toggle" />
      <NavbarCollapse id="navbar-toggle">
        <Nav className="ml-auto">
          <Link className="nav-link" to="/" data-toggle="collapse">
            Home
          </Link>
          <Link className="nav-link" to="/about" data-toggle="collapse">
            About
          </Link>
          <Link className="nav-link" to="/contact" data-toggle="collapse">
            Contact
          </Link>
        </Nav>
      </NavbarCollapse>
    </Navbar>
  );
}

export default Header;
