
import './chat.css';
import icon from '../images/kome.png';
import './chat_output.css';

function ChatOutputKome(props) {
    const text = props.text;

    return (
        <div className="kome">
          <img src={icon} className="icon"/>
          <div className="message">
            {text}
          </div>
        </div>
    )
}

export default ChatOutputKome;