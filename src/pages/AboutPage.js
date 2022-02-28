import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Content from "../components/Content";
import Hero from "../components/Hero";
import { FaSass, FaJava } from "react-icons/fa";
import { GrAchievement, GrHtml5 } from "react-icons/gr";
import { DiNginx, DiPostgresql, DiDocker, DiJavascript1 } from "react-icons/di";
import { SiReact, SiRedux, SiTypescript, SiPython } from "react-icons/si";
import { useSpring, animated } from "react-spring";
import nestIcon from "@iconify/icons-file-icons/nestjs";
import { Icon } from "@iconify/react";
import GitHubCalendar from "react-github-calendar";

function AboutPage (props) {
  const style = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { tension: 55, friction: 40 },
    delay: 1700,
  });

  return (
    <div>
      <Hero title={props.title} />
      <Content>
        <p>
          I am finishing my higher education with a
          <i>degree in Software Engineering</i>, and also have successful
          experience in <i>startups</i>. Was engaged in writing <i>FrontEnd</i>{" "}
          on projects. Here are some of them:
          <li>
            <b>Mobius </b>is an aggregator of information into a single news
            feed from social networks
          </li>
          <li>
            <b>Amethy</b> is a marketplace for authors
          </li>
        </p>
        <p>
          For the purpose of personal growth, I master skills on the{" "}
          <i>BackEnd</i> in my personal projects:
          <li>
            <b>HSE Events Calendar</b> - integrator of events into the student's
            calendar
          </li>
          <li>
            <b>AutoSwipeBot</b> - bot for optimizing finding the second half
          </li>
        </p>
        <p>
          My Working experience{" "}
          <li>
            <b>A2I2M</b> - B2B product for Russian pharm companies. Understanding ReactJS stack, optimizing build configuration. Researches in layout, styling and etc.
          </li>
          <li>
            <b>Innoscripta GmbH</b> - SaaS platform to connect scientists and businesse, CRM for internal use. Making attempts to manage projects, contacting with client and making profit choice. Working with React, Redux-saga and etc.
          </li>
        </p>
        <p>
          I am looking for <i>non-standard solutions</i> and never deviate from
          my plans at the sight of failures, since a team approach to solving
          problems always brings a positive result. I <i>speak English</i>{" "}
          (level C1). Lived and worked for half a year in the USA, currently I
          continue to expand my vocabulary and improve my accent.
        </p>

        <div className="text-center">
          <GitHubCalendar username="mathook" blockMargin={4} />
          <i className="text-center">
            Some of the working days are not <i>active</i> because everyone have
            the private corners in our minds
          </i>
        </div>
      </Content>
      <animated.div style={style}>
        <Container fluid={true}>
          <Row className="justify-content-center" xs={2}>
            <Col md={4} className="text-center">
              <h1 className="d-inline-block">
                <GrAchievement /> Skills
              </h1>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={4} xs={6} className="text-center">
              <h2>Front-end</h2>
              <Col className="pl-0">
                <h3>
                  <DiJavascript1 /> JavaScript
                </h3>
              </Col>
              <Col className="pl-0">
                <h3>
                  <SiTypescript /> TypeScript
                </h3>
              </Col>
              <Col className="pl-0">
                <h3>
                  <SiReact /> React
                </h3>
              </Col>
              <Col className="pl-0">
                <h3>
                  <SiRedux /> Redux
                </h3>
              </Col>
              <Col className="pl-0">
                <h3>
                  <GrHtml5 /> HTML5
                </h3>
              </Col>
              <Col className="pl-0">
                <h3>
                  <FaSass /> Sass/Less
                </h3>
              </Col>
            </Col>
            <Col md={4} xs={5} className="text-center">
              <h2>Back-end</h2>
              <Col className="pl-0">
                <h3>
                  <SiPython /> Python
                </h3>
              </Col>
              <Col className="pl-0">
                <h3>
                  <DiPostgresql /> Postgre
                </h3>
              </Col>
              <Col className="pl-0">
                <h3>
                  <Icon icon={nestIcon} /> NestJS
                </h3>
              </Col>
              <Col className="pl-0">
                <h3>
                  <DiNginx /> NGINX
                </h3>
              </Col>
              <Col className="pl-0">
                <h3>
                  <DiDocker /> Docker
                </h3>
              </Col>
              <Col className="pl-0">
                <h3>
                  <FaJava /> Java
                </h3>
              </Col>
            </Col>
          </Row>
        </Container>
      </animated.div>
    </div>
  );
}

export default AboutPage;
