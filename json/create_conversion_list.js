
const fs = require('fs'); // ファイル読み込み用
const kome_kana = ["ガ", "ァ", "ギ", "ャ"]; // 変換先
// 仮名
const kana = [
    "あ", "い", "う", "え", "お",
    "か", "き", "く", "け", "こ",
    "さ", "し", "す", "せ", "そ",
    "た", "ち", "つ", "て", "と",
    "な", "に", "ぬ", "ね", "の",
    "は", "ひ", "ふ", "へ", "ほ",
    "ま", "み", "む", "め", "も",
    "や",       "ゆ",       "よ",
    "ら", "り", "る", "れ", "ろ",
    "わ",       "を",       "ん",
    "ゃ",       "ゅ",       "ょ",
    "ぁ", "ぃ", "ぅ", "ぇ", "ぉ",
    "っ", "ゎ", "゛", "゜"
];

/**
 * json生成
 */
function Create_Conversion_List(){
    let words = []; // 最終出力
    let kome_all = []; // 全てのコメ語になりえる組み合わせ

    // 全ての組み合わせを生成
    for (let i = 0; i < kome_kana.length; i++){
        for (let j = 0; j < kome_kana.length; j++){
            for (let k = 0; k < kome_kana.length; k++){
                kome_all.push(kome_kana[i] + kome_kana[j] + kome_kana[k]);
            }
        }
    }

    // words変数に格納
    for (let i = 0; i < kana.length; i++){
        let ja = kana[i];
        let rand = Math.floor( Math.random() * kome_all.length); // ランダムに選択
        let obj = {
            ja: ja,
            kome: kome_all[rand]
        };

        words.push(obj);
        kome_all.splice(rand, 1); // 選択済みの要素は削除
    }
    
    // 出力
    let data = JSON.stringify({words: words}, null, ' ')
    fs.writeFileSync('conversion_list.json', data);
}

//Create_Conversion_List();