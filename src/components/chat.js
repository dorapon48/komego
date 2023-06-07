
import { useRef, useState } from 'react';
import './chat.css';
import Chat_Output_You from './chat_you';

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

function Chat() {
    const you_chat_text = useRef(null);
    const kome_chat_text = useRef(null);
    const test = [
        {
            chat: 'テスト'
        },
        {
            chat: 'テスト2'
        },
    ]
    const [chats, setChats] = useState([]);
    

    return (
        <div className="chat">
            <div className="chat-outputs" id="chat-outputs">
                <Chat_Output_You text="Test"></Chat_Output_You>
                <Chat_Output_You text="てｓｔｔｓｔｓｔｓｔｓｔｓｔｓｔｔｓ"></Chat_Output_You>
                { chats.map((chat) => (
                    test2(chat.chat)
                ))}
            </div>
            <div className="chat-inputs">
                <div className="chat-you">
                    <label>あなたへ:</label>
                    <input type="text" ref={you_chat_text}/>
                    <input type="submit" value="送信"/>
                </div>
                <div className="chat-kome">
                    <label>コメ君へ:</label>
                    <input type="text" ref={kome_chat_text}/>
                    <input type="submit" value="送信"/>
                </div>
            </div>
        </div>
    )
}

export default Chat;