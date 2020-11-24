import React, { useState } from "react";
import { Container } from "react-bootstrap";

const SecretPage = () => {
  const [code, setCode] = useState("");
  const [check, setCheck] = useState(false);

  const onSubmit = () => {
    //nydaagochksna
    console.log(code);
    if (process.env.REACT_APP_KEY.includes(code)) {
      setCheck(true);
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
          <span className="text-success">Entered succsessfully</span>
        ) : (
          <></>
        )}
      </div>
    </Container>
  );
};

export default SecretPage;
