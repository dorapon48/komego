
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
    console.log(output);
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
        var chr = match.charCodeAt(0) - 0x60; // 0x60で相互変換できる
        return String.fromCharCode(chr);
    });
}

console.log(Kata_To_Hira("パピプペポ"));