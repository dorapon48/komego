
import { useRef, useState } from 'react';
import './chat.css';
import ChatOutputYou from './chat_you';
import ChatOutputKome from './chat_kome';

function AddChat(obj){
    if (obj.who){
        return (
            <ChatOutputYou text={obj.chat} />
        )
    }
    return (
        <ChatOutputKome text={obj.chat} key={obj.chat}/>
    )
}


function Chat() {
    const you_chat_text = useRef(null);
    const kome_chat_text = useRef(null);
    const [chats, setChats] = useState([]);

    function ClickSubmitYou(text){
        console.log(text);
        const t = {
            chat: text,
            who: false
        }
        setChats([...chats, t])
    }

    return (
        <div className="chat">
            <div className="chat-outputs" id="chat-outputs">
                <ChatOutputYou text='テストメッセージ'></ChatOutputYou>
                <ChatOutputKome text='テストメッセージ'></ChatOutputKome>
                { chats.map((chat) => (
                    AddChat(chat)
                ))}
            </div>
            <div className="chat-inputs">
                <div className="chat-you">
                    <label>あなたへ:</label>
                    <input type="text" ref={you_chat_text}/>
                    <input type="submit" value="送信" onClick={() => ClickSubmitYou(you_chat_text.current.value)}/>
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