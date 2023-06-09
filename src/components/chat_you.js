
import './chat.css';
import icon from '../images/you.jpg';
import './chat_output.css';
import { CopyTextToClipboard } from './copy_text_to_clip';

function ChatOutputYou(props) {
    const text = props.text;

    return (
        <div className="you">
          <div className="message" onClick={() => CopyTextToClipboard(text)}>
            {text}
          </div>
          <img src={icon} className="icon"/>
        </div>
    )
}

export default ChatOutputYou;