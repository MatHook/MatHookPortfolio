import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Content from "../components/Content";
import Hero from "../components/Hero";
import { GrAchievement } from "react-icons/gr";
import {
  SiHtml5,
  SiJavascript,
  SiReact,
  SiRedux,
  SiSass,
  SiTypescript,
} from "react-icons/si";
import { useSpring, animated } from "react-spring";

function AboutPage(props) {
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
          I am finishing my higher education with a degree in Software Engineer,
          and also have successful experience in startups. Was engaged in
          writing FrontEnd on projects. Here are some of them:
        </p>
        <p>
          <li>
            <b>Mobius </b>is an aggregator of information into a single news
            feed from social networks
          </li>
          <li>
            <b>Amethy</b> is a marketplace for authors
          </li>
          For the purpose of personal growth, I master skills on the BackEnd in
          my personal projects:
          <li>
            <b>HSE Events Calendar</b> - integrator of events into the student's
            calendar
          </li>
          <li>
            <b>AutoSwipeBot</b> - bot for optimizing finding the second half
          </li>
        </p>
        <p>
          I am looking for non-standard solutions and never deviate from my
          plans at the sight of failures, since a team approach to solving
          problems always brings a positive result. I speak English (level C1).
          Lived and worked for half a year in the USA, currently I continue to
          expand my vocabulary and improve my accent.
        </p>
      </Content>
      <animated.div style={style}>
        <Container fluid={true}>
          <Row className="justify-content-center">
            <Col md={6}>
              <h1 className="d-inline-block">
                <GrAchievement /> Skills
              </h1>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={4}>
              <h2>Front-end</h2>
              <Col>
                <h3>
                  <SiJavascript /> JavaScript
                </h3>
              </Col>
              <Col>
                <h3>
                  <SiTypescript /> TypeScript
                </h3>
              </Col>
              <Col>
                <h3>
                  <SiReact /> React
                </h3>
              </Col>
              <Col>
                <h3>
                  <SiRedux /> Redux
                </h3>
              </Col>
              <Col>
                <h3>
                  <SiHtml5 /> HTML5
                </h3>
              </Col>
              <Col>
                <h3>
                  <SiSass /> Sass/Less
                </h3>
              </Col>
            </Col>
            <Col md={4}>
              <h2>Back-end</h2>
              <Col>
                <h3>
                  <SiJavascript /> JavaScript
                </h3>
              </Col>
              <Col>
                <h3>
                  <SiTypescript /> TypeScript
                </h3>
              </Col>
              <Col>
                <h3>
                  <SiReact /> React
                </h3>
              </Col>
              <Col>
                <h3>
                  <SiRedux /> Redux
                </h3>
              </Col>
              <Col>
                <h3>
                  <SiHtml5 /> HTML5
                </h3>
              </Col>
              <Col>
                <h3>
                  <SiSass /> Sass/Less
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
