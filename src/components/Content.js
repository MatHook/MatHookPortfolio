import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSpring, animated } from "react-spring";

function Content(props) {
  const style = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { tension: 55, friction: 40 },
    delay: 1000
  });

  return (
    <animated.div style={style}>
      <Container fluid={true}>
        <Row className="justify-content-center">
          <Col md={8}>{props.children}</Col>
        </Row>
      </Container>
    </animated.div>
  );
}

export default Content;
