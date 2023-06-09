
import './chat.css';
import icon from '../images/kome.png';
import './chat_output.css';
import { CopyTextToClipboard } from './copy_text_to_clip';

function ChatOutputKome(props) {
    const text = props.text;

    return (
        <div className="kome">
          <img src={icon} className="icon"/>
          <div className="message" onClick={() => CopyTextToClipboard(text)}>
            {text}
            {/* <div className="mask">
              <div className="caption">クリックでコピー</div>
            </div> */}
          </div>
        </div>
    )
}

export default ChatOutputKome;