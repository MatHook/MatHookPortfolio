import React from "react";
import Hero from "../components/Hero";
import { Row, Col, Container } from "react-bootstrap";
import { FaTelegramPlane, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGmail } from 'react-icons/si'
import { IoDocumentAttachSharp } from "react-icons/io5";
import Icon24LogoVk from '@vkontakte/icons/dist/24/logo_vk';

function ContactPage(props) {
  return (
    <Container fluid={true}>
      <Hero title={props.title} subTitle={props.subTitle} text={props.text} />
      <Container>
        <Row className="p-0 justify-content-center" sm={2} md={6}>
          <Col>
            <FaTelegramPlane className="icon" size={25} />
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
            <Icon24LogoVk className="vk-icon" width={30} height={30} />
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
            <SiGmail className="icon" size={25} />
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
            <FaGithub className="icon" size={25} />
            <a
              className="contact"
              href="https://github.com/MatHook"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </Col>
          <Col>
            <FaLinkedin className="icon" size={25} />
            <a
              className="contact"
              href="https://linkedin.com/in/matthew-kryuchkov-b67991193/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkIn
            </a>
          </Col>
          <Col>
            <IoDocumentAttachSharp className="icon" size={25} />
            <a
              className="contact"
              href="https://hh.ru/resume/8e175bd2ff06ed421b0039ed1f486954754669"
              target="_blank"
              rel="noopener noreferrer"
            >
              HH
            </a>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default ContactPage;
