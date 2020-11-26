import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../App.css";

export default function Footer() {
  return (
    <footer className="mt-5 border-top">
      <Container fluid={true}>
        <Row className="justify-content-between p-3 container mx-auto">
          <Col className="p-0 d-inline-flex" md={3} sd={12}>
            Just a portfolio ¬_¬
            <audio
              id="music"
              className="w-10"
              controls
              autoplay
              src="https://drive.google.com/uc?id=1Xxn2kpZQmE-aEEJR4Ud29Tp_3UtQGqko&export=download"
            ></audio>
          </Col>
          <Col className="p-0 d-flex justify-content-end" md={6}>
            Copyright @ 2020 - Matthew Hook. All rights Reserved
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
