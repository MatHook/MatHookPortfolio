import React from "react";
import { Jumbotron, Container, Row, Col } from "react-bootstrap";
import { useSpring, animated } from "react-spring";

function Hero(props) {
  const style = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { tension: 55, friction: 40 },
    delay: 500,
  });
  const style2 = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { tension: 55, friction: 40 },
    delay: 1700,
  });
  const style3 = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { tension: 55, friction: 40 },
    delay: 2900,
  });

  return (
    <animated.div style={style}>
      <Jumbotron className="bg-transparent jumbotron-fluid p-0">
        <Container fluid={true}>
          <Row className="justify-content-center py-5">
            <Col md={6} sm={12}>
              {props.title && (
                <h1 className="display-1 font-weight-bolder">{props.title}</h1>
              )}
              <animated.div style={style2}>
                {props.subTitle && (
                  <h3 className="display-4 font-weight-light">
                    {props.subTitle}
                  </h3>
                )}
              </animated.div>
              <animated.div style={style3}>
                {props.text && (
                  <h3 className="lead font-weight-light">{props.text}</h3>
                )}
              </animated.div>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    </animated.div>
  );
}

export default Hero;
