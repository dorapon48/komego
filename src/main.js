
// import { readFileSync } from 'fs';
import ex from './json/conversion_list_8.json';
// 変換先
//const ex = JSON.parse(readFileSync('./json/conversion_list_8.json', 'utf8'));
// 無視する記号(存在してもエラーメッセージを表示しない)
const ignore_symbol_rep = /[\u0020-\u0040,\u005b-\u0060,\u007b-\u007e,\u3000-\u301e,\u30fb,\u30fc,\uff01-\uff20,\uff3b-\uff40,\uff5b-\uff65]/;
const kome_rep = /[ガ,ギ,グ,ァ,ャ,ゥ,ー,ッ]/;
const kome_upper_rep = /[ガ,ギ,グ]/;
const kome_lower_rep = /[ァ,ャ,ゥ,ー,ッ]/;
const kome = ["ガ", "ギ", "グ", "ァ", "ャ", "ゥ", "ー", "ッ"];
const kome_upper = ["ガ", "ギ", "グ"];
const kome_lower = ["ァ", "ャ", "ゥ", "ー", "ッ"];

// window.onload = (event) => {
//     const fs = require('fs');
//     ex = JSON.parse(fs.readFileSync('./json/conversion_list_8.json', 'utf8'));
//   };

/**
 * ひらがな -> コメ語
 * @param {String} text ひらがな(濁点, 半濁点を含む)
 * @returns {String} コメ語
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
 * コメ語 -> ひらがな
 * @param {String} text コメ語(先頭処理済み)
 * @returns {String} ひらがな
 */
function Kome_To_Kana(text){
    let words = ex.words;
    let input = text;
    let output = "";
    while(input != ""){
        // コメ語とそれ以外でそれぞれ処理
        if (input[0].search(kome_rep) != -1){
            // 例外処理
            if (input.length <= 1){
                output += input;
                input = "";
                break;
            }
            const k = input[0] + input[1];
            for (let i = 0; i < words.length; i++){
                const obj = words[i];
                if (k == obj.kome){
                    output += obj.ja;
                    break;
                }
            }
            input = input.slice(2);
        } else {
            output += input[0];
            input = input.slice(1);
        }
    }
    return output;
}

/**
 * カタカナ -> ひらがな
 * @param {String} text カタカナを含む文字列
 * @returns {String} ひらがなに変換された文字列
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
 * @returns {String} 濁点半濁点が分離した文字列
 */
function Dakuten_Separation(text){
    let output = text.normalize('NFD');
    // 特殊な濁点半濁点を置き換える
    return output.replace(/[\u309a,\u3099]/g, function(match) {
        let chr = match.charCodeAt(0) + 0x2;
        return String.fromCharCode(chr);
    });
}

/**
 * コメ語の文字列の先頭にkome_upperのどれかを追加する
 * @param {String} text 
 * @returns {String} 先頭に文字が追加された文字列
 */
function Add_FirstChr(text){
    let i = text.search(kome_rep);
    let rand = Math.floor( Math.random() * kome_upper.length);
    return text.slice(0, i) + kome_upper[rand] + text.slice(i);
}

/**
 * コメ語の文字列の先頭を削除する
 * @param {String} text 
 * @returns {String} 先頭に文字が削除された文字列
 */
function Delete_FirstChr(text){
    let i = text.search(kome_rep);
    return text.slice(0, i) + text.slice(i + 1);
}

/**
 * 文字列中のコメ語の最初の文字を削除するかどうか判定する．
 * @param {String} text 
 * @returns {boolean} 消すときはtrue
 */
function Head_checker(text){
    let reg = new RegExp(kome_rep, "g");
    let output = text.match(reg);
    // null
    if (!output){
        return false;
    }

    if (output.length % 2 != 0){
        return true;
    }
    return false;
}

/**
 * 日本語をコメ語に変換
 * 入力はカタカナ交じりのひらがなとする
 * それ以外は無視される
 * @param {String} text 
 * @returns {String} コメ語
 */
export const JaToKome = (text) => {
    let output = Kata_To_Hira(text);
    output = Dakuten_Separation(output);
    output = Kana_To_Kome(output);
    // kome_lowerが先頭の場合追加
    let first_kome = output.search(kome_rep);
    if(first_kome != -1){
        if(output[first_kome].search(kome_lower_rep) != -1){
            output = Add_FirstChr(output);
        }
    }
    return output;
}

/**
 * コメ語を日本語に変換
 * @param {String} text コメ語
 * @returns {String} 日本語
 */
export const KomeToJa = (text) => {
    let output = text;
    if (Head_checker(text)){
        output = Delete_FirstChr(output);
    }
    output = Kome_To_Kana(output);
    return output;
}

/**
 * コメ語以外の言葉が含まれているか判定する
 * @param {String} text 
 * @returns {boolean} 存在するときtrue
 */
export const checkUnconvertedString = (text) => {
    // 例外処理
    if (!text || text === ""){
        return false;
    }
    let t = text;
    t = t.replace(new RegExp(kome_rep, "g"), "");
    t = t.replace(new RegExp(ignore_symbol_rep, "g"), "");
    if (t.length === 0){
        return false;
    }
    return true;
}

//console.log(Ja_To_Kome("シークヮーサー"));
//console.log(Kome_To_Kana("ッァッギァゥャャッギッッッギ"));
// let test = "かわいい！";
// console.log(test);
// test = Ja_To_Kome(test)
// console.log(test);
// test = Kome_To_Ja(test);
// console.log(test);
//console.log(Delete_FirstChr("ーーャゥッゥグゥギギ！！"));
//console.log("test".slice(2));
//console.log("ててグててッガガガ"[5].search(kome_lower_rep));
//console.log("てててて".search(kome_rep));
// let t = 'ガ';
// console.log((t.normalize('NFD')[1].charCodeAt(0)).toString(16));
// console.log(String.fromCharCode(t.normalize('NFD')[1].charCodeAt(0)));
// for (let i = -2; i < 6; i++){
// console.log(String.fromCharCode('ガ'.normalize('NFD')[1].charCodeAt(0) + i));
// }
//console.log('゛'.charCodeAt(0));