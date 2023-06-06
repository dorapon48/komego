import logo from './logo.svg';
import test from './images/test.jpg';
import Chat from './components/chat';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="header"></div>
      <div className="main">
        <div className="description">
          <h1>コメ君が教える！！</h1>
          <p>コメ君が日本語をコメ語にしてくれるぞ！</p>
          <p>...ひらがなだけだけど</p>
        </div>
        <Chat></Chat>
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default App;
