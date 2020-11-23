import React from "react";
import CardInfo from "./CardInfo";
import { useSpring, animated } from "react-spring";

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1.1,
];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

function Card(props) {
  const [propAnim, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  return (
    <div>
      <animated.div
        className="d-inline-block g-card"
        onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
        onMouseLeave={() => set({ xys: [0, 0, 1] })}
        style={{ transform: propAnim.xys.interpolate(trans) }}
        onClick={() => props.click(props.item)}
      >
        <img
          className="g-card-img"
          src={props.item.imgSrc}
          alt={props.item.imgSrc}
        />
      </animated.div>
      {props.item.isSelected && (
        <CardInfo
          title={props.item.title}
          subTitle={props.item.subTitle}
          link={props.item.link}
        />
      )}
    </div>
  );
}

export default Card;
