import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import PracPage from "./pages/PracPage";
import SecretPage from "./pages/SecretPage";

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      title: "Matthew Hook",
      headerLinks: [
        { title: "Home", path: "/" },
        { title: "About", path: "/about" },
        { title: "Contact", path: "/contact" },
      ],
      home: {
        title: "Just an overthinker ❤️‍🔥",
        subTitle: "See a fire in my eyes",
        text: "Got some ideas for you",
      },
      about: {
        title: "About Me",
      },
      contact: {
        title: "Have any questions?",
        subTitle: "You may ask!",
        text: "Here some places where you can find me",
      },
    };
  }

  render () {
    return (
      <Router>
        <Container className="p-0 App" fluid={true}>
          <Header />
          <div className="container">
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
                render={() => <AboutPage title={this.state.about.title} />}
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
              <Route path="/practices" exact render={() => <PracPage />} />
              <Route path="/secret" exact render={() => <SecretPage />} />
              <Route><b>404 Not Found</b></Route>
            </Switch>
          </div>
          <Footer />
        </Container>
      </Router>
    );
  }
}

export default App;
