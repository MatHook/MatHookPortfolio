import React, { useState } from "react";
import olafPng from "/olaf.png";
import "./App.css";

const ComponentBySearch = {
  легенды: Legends(),
} as Record<string, React.JSX.Element>;

function Legends() {
  const legendItems = [
    {
      href: "t.me/apeyter",
      linkText: "@apeyter",
      title: "Anton CleanLook Montana",
    },
    {
      href: "t.me/Liveslash",
      linkText: "@Liveslash",
      title: "Андрей Подмастерье Кот",
    },
    {
      href: "t.me/slmrv",
      linkText: "@slmrv",
      title: "Дмитрий озероВлесу Долнов",
    },
    {
      href: "t.me/noisy_bmw_g20",
      linkText: "@noisy_bmw_g20",
      title: "Иван Грузия Столб",
    },
    {
      href: "дойкиком",
      linkText: "@я_не_ебу",
      title: "Настя Шародуева Н13",
    },
  ] as const;

  return (
    <ul>
      {legendItems.map(({ href, linkText, title }, idx) => (
        <li key={idx}>
          <a href={href} rel="noreferrer" target="_blank">
            {linkText}
          </a>
          &nbsp;aka {title}
        </li>
      ))}
    </ul>
  );
}

function Main() {
  return (
    <>
      <div className="left">
        <h2>Привет!</h2>
        <p>Меня зовут Матвей! Я в общем-то руководитель разработки.</p>
      </div>
      <div className="right">
        <h2>Почему эта страница существует?</h2>
        <div>
          Я купил домен mathook.ru, чтобы его никто не занял вместо меня. А коли
          купил, надо чтобы что-то здесь было. Ну и еще для того, чтобы здесь
          были контакты или что-то полезное.
        </div>
      </div>
      <div className="left">
        <h2>Почему ты тут?</h2>
        <h4>Возможно ты пришел за контактами:</h4>
        <ul>
          <li>
            <a href="https://t.me/mathook">ТГ</a> – самый быстрый способ
            достучаться
          </li>
          <li>
            <a href="mailto:mathook00@gmail.com">mathook00@gmail.com</a> – или
            напиши сообщение на почту
          </li>
        </ul>
      </div>
    </>
  );
}

function App() {
  const [value, setValue] = useState<string>("МатХук");

  const isShowingOther = !!ComponentBySearch[value.toLowerCase()];

  return (
    <>
      <img
        src={olafPng}
        className={`olof-img ${isShowingOther ? "hide" : ""}`}
      />
      <h1>
        <input
          className="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          autoFocus
        />
      </h1>
      {ComponentBySearch[value.toLowerCase()] || Main()}
    </>
  );
}

export default App;
