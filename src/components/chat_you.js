
import { useRef, useState } from 'react';
import './chat.css';
import icon from '../images/test.jpg';

function test2(test){
    if (test == 'テスト'){
        return (
            <p>testtest</p>
        )
    }
    return (
        <p>test</p>
    )
    
}

function Chat_Output_You(props) {
    const text = props.text;

    return (
        <div className="you">
          <div className="message">
            {text}
          </div>
          <img src="images/test.jpg" className="icon"/>
        </div>
    )
}

export default Chat_Output_You;