import olafPng from "/olaf.png";
import "./App.css";

function App() {
  return (
    <>
      <img src={olafPng} />
      <h1>
        <i>МатХук</i>
      </h1>
      <div className="left">
        <h2>Привет!</h2>
        <p>Меня зовут Матвей! Я в общем-то руководитель разработки.</p>
      </div>
      <div className="right">
        <h2>Почему эта страница существует?</h2>
        <div>
          Я купил домен mathook.ru, чтобы их никто не занял вместо меня. А коли
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

export default App;
