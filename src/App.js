import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";

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
          <Header />
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <HomePage
                  title={this.state.home.title}
                  subTitle={this.state.home.subTitle}
                  text={this.state.home.text}
                />
              )}
            />
            <Route
              path="/about"
              exact
              render={() => (
                <AboutPage
                  title={this.state.about.title}
                  subTitle={this.state.about.subTitle}
                  text={this.state.about.text}
                />
              )}
            />
            <Route
              path="/contact"
              exact
              render={() => (
                <ContactPage
                  title={this.state.contact.title}
                  subTitle={this.state.contact.subTitle}
                  text={this.state.contact.text}
                />
              )}
            />
          </Switch>
          <Footer />
        </Container>
      </Router>
    );
  }
}

export default App;
