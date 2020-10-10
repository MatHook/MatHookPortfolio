import React from "react";
import { Container, Navbar, NavbarBrand, Nav } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Matthew Hook",
      headerLinks: [
        { title: "Home", path: "/" },
        { title: "About", path: "/about" },
        { title: "Contact", path: "/contact" },
      ],
      home: {
        title: "Home Title",
        subTitle: "Home SubTitle",
        text: "Do some text if you need to",
      },
      about: {
        title: "About Title",
        subTitle: "About SubTitle",
        text: "Do some text if you need to",
      },
      contact: {
        title: "Contact Title",
        subTitle: "Contact SubTitle",
        text: "Do some text if you need to",
      },
    };
  }

  render() {
    return (
      <Router>
        <Container className="p-0" fluid={true}>
          <Navbar className="border-bottom" bg="transparent" expand="lg">
            <NavbarBrand>Matthew Hook</NavbarBrand>
            <NavbarToggle className="border-0 m-2" aria-controls="navbar-toggle" />
            <NavbarCollapse id="navbar-toggle">
              <Nav className="ml-auto">
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/about">About</Link>
                <Link className="nav-link" to="/contact">Contact</Link>
              </Nav>
            </NavbarCollapse>
          </Navbar> 
          <h1>yo</h1>
        </Container>
      </Router>
    );
  }
}

export default App;
