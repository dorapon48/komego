
const fs = require('fs');
const ex = JSON.parse(fs.readFileSync('./json/conversion_list_8.json', 'utf8'));

/**
 * ひらがな -> コメ語
 * @param {String} text ひらがな(濁点, 半濁点を含む)
 * @returns コメ語
 */
function Kana_To_Kome(text){
    let words = ex.words;
    let output = "";
    for(let i = 0; i < text.length; i++){
        let ex_checker = false; // 変換されたかどうかを示す
        // 変換
        for(let j = 0; j < words.length; j++){
            const obj = words[j];
            if (text[i] == obj.ja){
                output += obj.kome;
                ex_checker = true;
                break;
            }
        }
        // 変換されなければそのまま出力
        if (!ex_checker){
            output += text[i];
        }
    }
    return output;
}

/**
 * カタカナ -> ひらがな
 * @param {String} text カタカナを含む文字列
 * @returns ひらがなに変換された文字列
 */
function Kata_To_Hira(text) {
    // \u30a1-\u30f6はァ-ン
    return text.replace(/[\u30a1-\u30f6]/g, function(match) {
        let chr = match.charCodeAt(0) - 0x60; // 0x60で相互変換できる
        return String.fromCharCode(chr);
    });
}

/**
 * 文字列の濁点半濁点を分離する
 * @param {String} text 
 * @returns 濁点半濁点が分離した文字列
 */
function Dakuten_Separation(text){
    let output = text.normalize('NFD');
    // 特殊な濁点半濁点を置き換える
    return output.replace(/[\u309a,\u3099]/g, function(match) {
        let chr = match.charCodeAt(0) + 0x2;
        return String.fromCharCode(chr);
    });
}

function Hiragana_To_Kome(text){
    let tmp = Kata_To_Hira(text);
    tmp = Dakuten_Separation(tmp);
    tmp = Kana_To_Kome(tmp);
    return tmp;
}

console.log(Hiragana_To_Kome("こんにちは！"));
// let t = 'ガ';
// console.log((t.normalize('NFD')[1].charCodeAt(0)).toString(16));
// console.log(String.fromCharCode(t.normalize('NFD')[1].charCodeAt(0)));
// for (let i = -2; i < 6; i++){
// console.log(String.fromCharCode('ガ'.normalize('NFD')[1].charCodeAt(0) + i));
// }
//console.log('゛'.charCodeAt(0));