
import { useRef, useState } from 'react';
import './chat.css';
import icon from '../images/you.jpg';
import './chat_output.css';

function Chat_Output_You(props) {
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

export default Chat_Output_You;