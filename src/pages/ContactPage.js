import React from "react";
import Hero from "../components/Hero";
import { Row, Col, Container } from "react-bootstrap";
import { FaTelegramPlane, FaGithub } from 'react-icons/fa'
import { SiGmail } from 'react-icons/si'
import Icon24LogoVk from '@vkontakte/icons/dist/24/logo_vk';

function ContactPage(props) {
  return (
    <Container fluid={true}>
      <Hero title={props.title} subTitle={props.subTitle} text={props.text} />
      <Container>
        <Row className="p-0 justify-content-center">
          <Col>
            <FaTelegramPlane className="icon" />
            <a
              className="contact"
              href="http://t.me/MatHook"
              target="_blank"
              rel="noopener noreferrer"
            >
              TG
            </a>
          </Col>
          <Col>
            <Icon24LogoVk className="vk-icon" />
            <a
              className="contact"
              href="https://vk.com/mathook"
              target="_blank"
              rel="noopener noreferrer"
            >
              VK
            </a>
          </Col>
          <Col>
            <SiGmail className="icon" />
            <a
              className="contact"
              href="mailto:mathook00@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Email
            </a>
          </Col>
          <Col>
            <FaGithub className="icon" />
            <a
              className="contact"
              href="https://github.com/MatHook"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default ContactPage;
