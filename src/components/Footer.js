import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-5">
      <Container fluid={true}>
        <Row className="border-top justify-content-between p-3">
          <Col className="p-0" md={3} sd={12}>
            Matthew Hook
            <Link to="/blog" className="ml-5 text-dark">
              <FaInstagram className="align-text-bottom" />
              InstaFeed
            </Link>
          </Col>
          <Col className="p-0 d-flex justify-content-end" md={6}>
            Copyright @ 2020 - Matthew Hook. All rights Reserved
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
