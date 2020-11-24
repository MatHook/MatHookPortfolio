import { useState } from "react";
import Board from "./Board";
import { calculateWinner } from "../../services/helper";
import { Col, Row } from "react-bootstrap";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [step, setStep] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(history[step]);
  const xO = xIsNext ? "X" : "O";

  const handleClick = (e) => {
    const historyPoint = history.slice(0, step + 1);
    const current = historyPoint[step];
    const squares = [...current];

    if (winner || squares[e]) return;

    squares[e] = xO;

    setHistory([...historyPoint, squares]);
    setStep(historyPoint.length);
    setXIsNext(!xIsNext);
  };

  const renderMoves = () =>
    history.map((pStep, move) => {
      const destination = move ? `Go to move №${move}` : "Go to Start";
      return (
        <p key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </p>
      );
    });

  const jumpTo = (step) => {
    setStep(step);
    setXIsNext(step % 2 === 0);
  };

  return (
    <>
      <h1>Welcome to Tic Tac Toe</h1>
      <Row>
        <Col>
          <Board squares={history[step]} onClick={handleClick} />
        </Col>
        <Col>
          <h2>{winner ? <span className="text-success">Winner {winner}</span> : "Next player: " + xO}</h2>
          <div>
            <h1>History</h1>
            {renderMoves()}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Game;
