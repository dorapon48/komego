
import { useEffect, useState } from 'react';
import './chat.css';
import ChatOutputYou from './chat_you';
import ChatOutputKome from './chat_kome';
import { JaToKome, KomeToJa, checkUnconvertedString } from '../main';
import error_messages from '../json/error_message.json'

/**
 * チャットに内容をreactElementで返す
 * obj.whoでコメ君かどうかを判定し，それぞれ返す
 * @param {Object} obj {chat: {String}, who: {Boolen}}
 * @returns {import('react').ReactElement}
 */
function AddChat(obj){
    // コメ君なら右側に表示される
    if (obj.who){
        return (
            <ChatOutputYou text={obj.chat} key={Math.random()}/>
        )
    }
    return (
        <ChatOutputKome text={obj.chat} key={Math.random()}/>
    )
}


function Chat() {
    const [you_chat_text, setYou] = useState("");
    const [kome_chat_text, setKome] = useState("");
    const [chats, setChats] = useState([]);
    
    // スクロールを常に1番下にする
    useEffect(() => {
        let chatArea = document.getElementById('chat-outputs');
        let chatAreaHeight = chatArea.scrollHeight;
        chatArea.scrollTop = chatAreaHeight;
    }, [chats]);

    /**
     * あなたへの送信ボタンが押されたときの処理
     * @param {String} text 
     */
    const ClickSubmitYou = (text) => {
        if (text !== ""){
            let t = {
                chat: text,
                who: false
            };
            let t2 = {
                chat: KomeToJa(text),
                who: true
            };
            setChats([...chats, t, t2]);
            setYou("");
        }
    }

    /**
     * コメ君への送信ボタンが押されたときの処理
     * @param {String} text 
     */
    const ClickSubmitKome = (text) => {
        if (text !== ""){
            const kome = JaToKome(text);
            let t = {
                chat: text,
                who: true
            };
            let t2 = {
                chat: kome,
                who: false
            };
            // エラーメッセージ(コメ君)の入力
            if (checkUnconvertedString(kome)){
                const ms = error_messages.errors;
                const gagyagu = ["ガァ(", "ギャ(", "グゥ("];
                let m = gagyagu[Math.floor( Math.random() * gagyagu.length)];
                m += ms[Math.floor( Math.random() * ms.length)];
                let t3 = {
                    chat: m,
                    who: false
                };
                setChats([...chats, t, t2, t3]);
            } else {
                setChats([...chats, t, t2]);
            }
            setKome("");
        }
    }

    return (
        <div className="chat">
            <div className="chat-outputs" id="chat-outputs">
                {/* <ChatOutputYou text='テストメッセージ'></ChatOutputYou>
                <ChatOutputKome text='テストメッセージ'></ChatOutputKome> */}
                { chats.map((chat) => (
                    AddChat(chat)
                ))}
            </div>
            <div className="chat-inputs">
                <div className="chat-you">
                    <label>あなたへ:</label>
                    <input type="text" className="chat-inputs-you"
                    value={you_chat_text}
                    onChange={(e) => setYou(e.target.value)}/>
                    <input type="submit" value="送信" 
                    onClick={() => ClickSubmitYou(you_chat_text)}/>
                </div>
                <div className="chat-kome">
                    <label>コメ君へ:</label>
                    <input type="text" className="chat-inputs-kome"
                    value={kome_chat_text}
                    onChange={(e) => setKome(e.target.value)}/>
                    <input type="submit" value="送信" 
                    onClick={() => ClickSubmitKome(kome_chat_text)}/>
                </div>
            </div>
        </div>
    )
}

export default Chat;