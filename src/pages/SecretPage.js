import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import Game from "../components/game/Game";
import { Link } from "react-router-dom";

const SecretPage = () => {
  const [code, setCode] = useState("");
  const [check, setCheck] = useState(false);
  const [hiden, setHiden] = useState(true);

  const onSubmit = () => {
    if (process.env.REACT_APP_KEY.includes(code) && code.length > 5) {
      setCheck(true);
    } else if (!process.env.REACT_APP_KEY.includes(code)) {
      setCheck(false);
      setHiden(false);
    }
  };

  return (
    <Container className="secret-block p-4">
      <div className="justify-content-center">
        <Row className="justify-content-center pb-2">
          <Link to="/contact" className="contact">
            <h1 className="display-2 font-weight-lighter">Ask for a code 😉</h1>
          </Link>
        </Row>
        <Row className="justify-content-center pt-2">
          <input
            placeholder="Input code"
            value={code}
            onInput={(e) => setCode(e.target.value)}
          />
          <button onClick={() => onSubmit()}>Submit</button>
        </Row>
        {check ? (
          <div className="text-center">
            <span className="text-success">Entered succsessfully</span>
            <Game />
          </div>
        ) : hiden ? (
          <div></div>
        ) : (
          <div className="text-center text-danger">Wrong code</div>
        )}
      </div>
    </Container>
  );
};

export default SecretPage;
