import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import InstaPage from "./pages/InstaPage";
import PracPage from "./pages/PracPage";
import SecretPage from "./pages/SecretPage";
import Particles from "react-tsparticles";

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

  render() {
    return (
      <Router>
        <Container className="p-0 App" fluid={true}>
          <Header />
          <div className="container">
            <Particles
              id="particle"
              options={{
                autoPlay: true,
                background: {
                  color: {
                    value: "#fff",
                  },
                  image: "",
                  position: "",
                  repeat: "",
                  size: "",
                  opacity: 1,
                },
                backgroundMask: {
                  composite: "multiply",
                  cover: {
                    color: {
                      value: "#fba96a",
                    },
                    opacity: 1,
                  },
                  enable: false,
                },
                backgroundMode: {
                  enable: true,
                  zIndex: -1,
                },
                detectRetina: true,
                fpsLimit: 120,
                infection: {
                  cure: false,
                  delay: 0,
                  enable: false,
                  infections: 0,
                  stages: [],
                },
                interactivity: {
                  detectsOn: "window",
                  events: {
                    onClick: {
                      enable: false,
                      mode: "push",
                    },
                    onDiv: {
                      selectors: [],
                      enable: false,
                      mode: "repulse",
                      type: "circle",
                    },
                    onHover: {
                      enable: true,
                      mode: "attract",
                      parallax: {
                        enable: true,
                        force: 15,
                        smooth: 75,
                      },
                    },
                    resize: true,
                  },
                  modes: {
                    attract: {
                      distance: 300,
                      duration: 1,
                      speed: 1.2,
                    },
                    bounce: {
                      distance: 200,
                    },
                    bubble: {
                      distance: 200,
                      duration: 0.4,
                    },
                    connect: {
                      distance: 80,
                      links: {
                        opacity: 0.5,
                      },
                      radius: 60,
                    },
                    grab: {
                      distance: 100,
                      links: {
                        blink: false,
                        consent: false,
                        opacity: 1,
                      },
                    },
                    light: {
                      area: {
                        gradient: {
                          start: {
                            value: "#ffffff",
                          },
                          stop: {
                            value: "#000000",
                          },
                        },
                        radius: 1000,
                      },
                      shadow: {
                        color: {
                          value: "#000000",
                        },
                        length: 2000,
                      },
                    },
                    push: {
                      quantity: 4,
                    },
                    remove: {
                      quantity: 2,
                    },
                    repulse: {
                      distance: 200,
                      duration: 0.4,
                      speed: 1,
                    },
                    slow: {
                      factor: 3,
                      radius: 200,
                    },
                    trail: {
                      delay: 0.005,
                      quantity: 5,
                      particles: {
                        color: {
                          value: "#ff0000",
                          animation: {
                            enable: true,
                            speed: 400,
                            sync: true,
                          },
                        },
                        collisions: {
                          enable: false,
                          bounce: {
                            horizontal: {
                              random: {},
                            },
                            vertical: {
                              random: {},
                            },
                          },
                        },
                        links: {
                          enable: false,
                          shadow: {},
                          triangles: {},
                        },
                        move: {
                          outMode: "destroy",
                          speed: 5,
                          angle: {},
                          attract: {
                            rotate: {},
                          },
                          gravity: {},
                          noise: {
                            delay: {
                              random: {},
                            },
                          },
                          outModes: {},
                          trail: {},
                        },
                        size: {
                          value: 5,
                          animation: {
                            enable: true,
                            speed: 5,
                            minimumValue: 1,
                            sync: true,
                            startValue: "min",
                            destroy: "max",
                          },
                          random: {},
                        },
                        bounce: {
                          horizontal: {
                            random: {},
                          },
                          vertical: {
                            random: {},
                          },
                        },
                        life: {
                          delay: {
                            random: {},
                          },
                          duration: {
                            random: {},
                          },
                        },
                        number: {
                          density: {},
                        },
                        opacity: {
                          animation: {},
                          random: {},
                        },
                        rotate: {
                          animation: {},
                        },
                        shadow: {
                          offset: {},
                        },
                        shape: {},
                        stroke: {
                          color: {
                            value: "",
                            animation: {
                              enable: false,
                              speed: 0,
                              sync: false,
                            },
                          },
                        },
                        twinkle: {
                          lines: {},
                          particles: {},
                        },
                      },
                    },
                  },
                },
                manualParticles: [],
                motion: {
                  disable: false,
                  reduce: {
                    factor: 4,
                    value: true,
                  },
                },
                particles: {
                  bounce: {
                    horizontal: {
                      random: {
                        enable: false,
                        minimumValue: 0.1,
                      },
                      value: 1,
                    },
                    vertical: {
                      random: {
                        enable: false,
                        minimumValue: 0.1,
                      },
                      value: 1,
                    },
                  },
                  collisions: {
                    bounce: {
                      horizontal: {
                        random: {
                          enable: false,
                          minimumValue: 0.1,
                        },
                        value: 1,
                      },
                      vertical: {
                        random: {
                          enable: false,
                          minimumValue: 0.1,
                        },
                        value: 1,
                      },
                    },
                    enable: true,
                    mode: "bounce",
                  },
                  color: {
                    value: "000",
                    animation: {
                      enable: true,
                      speed: 50,
                      sync: false,
                    },
                  },
                  life: {
                    count: 0,
                    delay: {
                      random: {
                        enable: false,
                        minimumValue: 0,
                      },
                      value: 0,
                      sync: false,
                    },
                    duration: {
                      random: {
                        enable: false,
                        minimumValue: 0.0001,
                      },
                      value: 0,
                      sync: false,
                    },
                  },
                  links: {
                    blink: false,
                    color: {
                      value: "#000",
                    },
                    consent: false,
                    distance: 100,
                    enable: true,
                    frequency: 1,
                    opacity: 1,
                    shadow: {
                      blur: 5,
                      color: {
                        value: "#3700ff",
                      },
                      enable: false,
                    },
                    triangles: {
                      enable: false,
                      frequency: 1,
                      color: {
                        value: "#000",
                      },
                      opacity: 0.15,
                    },
                    width: 2,
                    warp: true,
                  },
                  move: {
                    angle: {
                      offset: 45,
                      value: 90,
                    },
                    attract: {
                      enable: false,
                      rotate: {
                        x: 3000,
                        y: 3000,
                      },
                    },
                    direction: "none",
                    distance: 0,
                    enable: true,
                    gravity: {
                      acceleration: 3,
                      enable: false,
                      maxSpeed: 1,
                    },
                    noise: {
                      delay: {
                        random: {
                          enable: false,
                          minimumValue: 0,
                        },
                        value: 0,
                      },
                      enable: false,
                    },
                    outModes: {
                      default: "out",
                    },
                    random: true,
                    size: true,
                    speed: 1,
                    straight: true,
                    trail: {
                      enable: false,
                      length: 10,
                      fillColor: {
                        value: "#000000",
                      },
                    },
                    vibrate: false,
                    warp: true,
                  },
                  number: {
                    density: {
                      enable: true,
                      area: 800,
                      factor: 1000,
                    },
                    limit: 0,
                    value: 100,
                  },
                  opacity: {
                    random: {
                      enable: true,
                      minimumValue: 0.3,
                    },
                    value: 1,
                    animation: {
                      enable: true,
                      minimumValue: 0.3,
                      speed: 0.5,
                      sync: false,
                    },
                  },
                  reduceDuplicates: true,
                  rotate: {
                    random: {
                      enable: false,
                      minimumValue: 0,
                    },
                    value: 0,
                    animation: {
                      enable: false,
                      speed: 0,
                      sync: false,
                    },
                    direction: "clockwise",
                    path: false,
                  },
                  shadow: {
                    blur: 0,
                    color: {
                      value: "#000000",
                    },
                    enable: false,
                    offset: {
                      x: 0,
                      y: 0,
                    },
                  },
                  shape: {
                    options: {},
                    type: "circle",
                  },
                  size: {
                    random: {
                      enable: true,
                      minimumValue: 1,
                    },
                    value: 1,
                    animation: {
                      destroy: "none",
                      enable: true,
                      minimumValue: 1,
                      speed: 3,
                      startValue: "max",
                      sync: false,
                    },
                  },
                  stroke: {
                    width: 0,
                    color: {
                      value: "",
                      animation: {
                        enable: false,
                        speed: 0,
                        sync: false,
                      },
                    },
                  },
                  twinkle: {
                    lines: {
                      enable: false,
                      frequency: 0.05,
                      opacity: 1,
                    },
                    particles: {
                      enable: false,
                      frequency: 0.05,
                      opacity: 1,
                    },
                  },
                },
                pauseOnBlur: true,
                pauseOnOutsideViewport: true,
                themes: [],
              }}
            />
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
              <Route path="/blog" exact render={() => <InstaPage />} />
              <Route path="/practices" exact render={() => <PracPage />} />
              <Route path="/secret" exact render={() => <SecretPage />} />
            </Switch>
          </div>
          <Footer />
        </Container>
      </Router>
    );
  }
}

export default App;
