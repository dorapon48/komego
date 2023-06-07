
import './chat.css';
import icon from '../images/you.jpg';
import './chat_output.css';

function ChatOutputYou(props) {
    const text = props.text;

    return (
        <div className="you">
          <div className="message">
            {text}
          </div>
          <img src={icon} className="icon"/>
        </div>
    )
}

export default ChatOutputYou;