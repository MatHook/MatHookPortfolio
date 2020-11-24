import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Game from "../components/game/Game";

const SecretPage = () => {
  const [code, setCode] = useState("");
  const [check, setCheck] = useState(false);
  const [hiden, setHiden] = useState(true)

  const onSubmit = () => {
    if (process.env.REACT_APP_KEY.includes(code) && code.length > 5) {
      setCheck(true);
      console.log(code);
    } else if (!process.env.REACT_APP_KEY.includes(code)) {
      setCheck(false);
      setHiden(false)
    }
  };

  return (
    <Container className="secret-block p-4">
      <div className="text-center">
        <input
          placeholder="Input code"
          value={code}
          onInput={(e) => setCode(e.target.value)}
        />
        <button onClick={() => onSubmit()}>Submit</button>
        {check ? (
          <div>
            <span className="text-success">Entered succsessfully</span>
            <Game />
          </div>
        ) : hiden ? (
          <div></div>
        ) : (
          <div className="text-danger">Wrong code</div>
        )}
      </div>
    </Container>
  );
};

export default SecretPage;
