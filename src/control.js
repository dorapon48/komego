
const send_kome_id = "chat-kome";
const send_you_id = "chat-you";
const chat_outputs_id = "chat-outputs";
// 画像
const kome_icon = 'images/kome.PNG';
const you_icon = 'images/test.jpg';

export function send_kome(){
    let element = document.getElementById(send_kome_id);
    let text = element.value;
    // 例外処理
    if (text == "" || !text){
        return 0;
    }
    
    element.value = "";
    Add_Chat_Element(Create_You_Chat_Element(text));
//    text = Ja_To_Kome(text);
    Add_Chat_Element(Create_Kome_Chat_Element(text));
    //document.getElementById(chat_outputs_id).appendChild(Create_You_Chat_Element("test"));
    return 0;
}

/**
 * html要素をchat-outputs,ID要素に追加する
 * @param {document.element} element 
 * @returns 0
 */
function Add_Chat_Element(element){
    let parent = document.getElementById(chat_outputs_id)
    parent.appendChild(element);
    return 0;
}

/**
 * コメ君のメッセージのhtml要素を生成する
 * @param {String} text メッセージ
 * @returns {document.element} html要素
 */
function Create_Kome_Chat_Element(text){
    // div class kome
    let output = document.createElement("div");
    output.className = 'kome';
    // img
    let img = document.createElement("img");
    img.src = kome_icon;
    img.className = 'icon';
    // div class message
    let message = document.createElement("div");
    message.className = 'message';
    message.textContent = text;

    output.appendChild(img);
    output.appendChild(message);
    return output;
}

/**
 * あなたのメッセージのhtml要素を生成する
 * @param {String} text メッセージ
 * @returns {document.element} html要素
 */
function Create_You_Chat_Element(text){
    // div class you
    let output = document.createElement("div");
    output.className = 'you';
    // img
    let img = document.createElement("img");
    img.src = you_icon;
    img.className = 'icon';
    // div class message
    let message = document.createElement("div");
    message.className = 'message';
    message.textContent = text;

    output.appendChild(message);
    output.appendChild(img);
    return output;
}
