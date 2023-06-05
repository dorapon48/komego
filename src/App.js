import logo from './logo.svg';
import test from './images/test.jpg'
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="header"></div>
      <div className="main">
        <h1>コメ君が教える！！</h1>
        <div className="description">
          <p>コメ君が日本語をコメ語にしてくれるぞ！</p>
          <p>...ひらがなだけだけど</p>
        </div>
        <div className="chat">
          <div className="chat-outputs" id="chat-outputs"></div>
            <div className="chat-inputs">
              <div className="chat-you">
                <label>あなたへ:</label>
                <input type="text"/>
                <input type="submit" value="送信"/>
              </div>
              <div className="chat-kome">
                <label>コメ君へ:</label>
                <input type="text"/>
                <input type="submit" value="送信"/>
            </div>
          </div>
        </div>
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default App;
