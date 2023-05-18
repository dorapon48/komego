
const fs = require('fs');
const ex = JSON.parse(fs.readFileSync('./json/conversion_list.json', 'utf8'));

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
}

Kana_To_Kome("だいすき！！！");