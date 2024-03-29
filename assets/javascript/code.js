const languages = {
    af: "Afrikaans", sq: "Albanian", am: "Amharic", ar: "Arabic", hy: "Armenian", az: "Azerbaijani", eu: "Basque",
    be: "Belarusian", bn: "Bengali", bs: "Bosnian", bg: "Bulgarian", ca: "Catalan", ceb: "Cebuano",
    'zh-CN': "Chinese (Simplified)", 'zh-TW': "Chinese (Traditional)", co: "Corsican", hr: "Croatian", cs: "Czech",
    da: "Danish", nl: "Dutch", en: "English", eo: "Esperanto", et: "Estonian", fi: "Finnish", fr: "French", 
    fy: "Frisian", gl: "Galician", ka: "Georgian", de: "German", el: "Greek", gu: "Gujarati", 
    ht: "Haitian Creole", ha: "Hausa", haw : "Hawaiian", he: "Hebrew", hi: "Hindi", hmn : "Hmong", 
    hu: "Hungarian", is: "Icelandic", ig: "Igbo", id: "Indonesian", ga: "Irish", it: "Italian", ja: "Japanese", 
    jw: "Javanese", kn: "Kannada", kk: "Kazakh", km: "Khmer", ko: "Korean", ku: "Kurdish", ky: "Kyrgyz", lo: "Lao", 
    la: "Latin", lv: "Latvian", lt: "Lithuanian", lb: "Luxembourgish", mk: "Macedonian", mg: "Malagasy", ms: "Malay", 
    ml: "Malayalam", mt: "Maltese", mi: "Maori", mr: "Marathi", mn: "Mongolian", my: "Myanmar (Burmese)", ne: "Nepali", 
    no: "Norwegian", ny: "Nyanja (Chichewa)", ps: "Pashto", fa: "Persian", pl: "Polish", pt: "Portuguese (Portugal,  Brazil)", 
    pa: "Punjabi", ro: "Romanian", ru: "Russian", sm: "Samoan", gd: "Scots Gaelic", sr: "Serbian", st: "Sesotho", sn: "Shona", 
    sd: "Sindhi", si: "Sinhala (Sinhalese)", sk: "Slovak", sl: "Slovenian", so: "Somali", es: "Spanish", su: "Sundanese", 
    sw: "Swahili", sv: "Swedish", tl: "Tagalog (Filipino)", tg: "Tajik", ta: "Tamil", te: "Telugu", th: "Thai", 
    tr: "Turkish", uk: "Ukrainian", ur: "Urdu", uz: "Uzbek", vi: "Vietnamese", cy: "Welsh", xh: "Xhosa", 
    yi: "Yiddish", yo: "Yoruba", zu: "Zulu", 
}

const langOption = () => {
    for(let key in languages){
        $lang = $('<option>').text(languages[key]).attr("id", key).addClass("lang-option");
        $(".lang-select").append($lang);
    }
} 

langOption();

let lang = "en";
let word = "";
let userObject = {};
let renderedObject = {};
var userArray = [];
var userInput = "";
var sentence = "";
let translation = "";
let realTranslation = "";
$("#real-output").hide();
$("#real-translation").hide();

const randomOf = (arr) => {
    chosenArr = Math.floor(Math.random() * arr.length);
    return chosenArr;
}
  
// function checkRegex(){
//     let input = $('#inputArea').val()
//     let check = /[ˆ(\d|+|\-)]/
//     if(check.test(input) === true) {
//         alert("try again");
//         return;
//     }
// }

$(document).on("click", "#submit-request", function (event) {
    event.preventDefault();
    userInput = $("#user-input").val().trim();
    userArray = userInput.split(" ");
    // checkRegex();
    $("#real-output").hide();
    $("#real-output").empty();
    $("#real-translation").hide()    
    $("#output").empty();
    renderedObject = {};
    userObject = {};
    sentence = "";
    replaceWords();
    const reveal = () => {
        $("#real-translation").show()
        $("#real-output").show();
    }
    setTimeout(reveal, 3000);
    console.log("User Object: " + userArray);
    
})

$(document).on("click", ".lang-select", function(event){
    event.preventDefault();
    lang = $(this).children(":selected").attr("id");
    console.log(lang);

})

$(document).on("click", "#real-translation", function (event) {
    event.preventDefault();
    realTranslate(userInput);
    $("#real-output").show();
    $("#real-output").html(realTranslation);
});


function makeObject(userArray) {
    for (let i = 0; i < userArray.length; ++i)
        userObject[i] = userArray[i];
    return userObject;  
}

const replaceWords = async () => {
    makeObject(userArray);
    for (let key in userObject) {
        word = userObject[key];
        await getWordPromise(word);
        console.log("after getwordpromise")
    }
    console.log("replace Phrase")
    replacePhrase();
}

const getWordPromise = (word) => {
    console.log(word)
    return new Promise((resolve, reject) => {
        if (word.length <= 2) {
            return resolve();
        } else {
            var queryURL = `https://wordsapiv1.p.mashape.com/words/${word}`
            $.ajax({
                url: queryURL,
                method: "GET",
                headers: {
                    "X-Mashape-Key": "80c3fabd83mshc44d9723dc45a9ap1da501jsn8faca156e252"
                }
            }).then(function (response) {
                console.log("[getWordPromise]", response);
                var anto = "";
                var partOfSpeech = "";
                if (response.results) {
                    let isfound = false
                    for (let i = 0; i < response.results.length; i++) {
                        console.log(response.results[i].antonyms)
                        if (response.results[i].antonyms) {
                            anto = response.results[i].antonyms;
                            partOfSpeech = response.results[i].partOfSpeech;
                            if (partOfSpeech === "noun" || partOfSpeech === "verb" || partOfSpeech === "adjective") {
                                renderedObject[word] = anto;    
                            }
                            isfound = true
                            break;
                        } else {

                        }
                    }
                    if (!isfound) {
                        for (let i = 0; i < response.results.length; i++) {
                            if (response.results[i].synonyms && isfound === false) {
                                anto = response.results[i].synonyms[i];
                                partOfSpeech = response.results[i].partOfSpeech;
                                if (partOfSpeech === "noun" || partOfSpeech === "verb" || partOfSpeech === "adjective") {
                                    renderedObject[word] = anto;
                                }
                            } else { }
                        }
                    }

                }
                resolve()
            })
        }
    })
}

const replacePhrase = () => {
    for (let k = 0; k < Object.values(userObject).length; k++) {
        if (renderedObject[userObject[k]]) {
            userObject[k] = renderedObject[userObject[k]];
        }
    }
    for (let j in userObject) {
        sentence += userObject[j] + " ";
    }
    console.log("Replaced Phrase: ", sentence)
    getTranslate(sentence);
}

const getTranslate = (sentence) => {
    qURL = `https://translation.googleapis.com/language/translate/v2?target=${lang}&q=${sentence}&key=AIzaSyClTfWgaANNnxJloF2kStJQwZorF8JhaG4`;
    $.ajax({
        url: qURL,
        method: "POST",
    }).then(function (response) {
        let translation = response.data.translations[0].translatedText;
        $("#output").html(translation);
        console.log("Translation: ", translation);
    })
}

const realTranslate = (userInput) => {
    qURL = `https://translation.googleapis.com/language/translate/v2?target=${lang}&q=${userInput}&key=AIzaSyClTfWgaANNnxJloF2kStJQwZorF8JhaG4`;
    $.ajax({
        url: qURL,
        method: "POST",
    }).then(function (response) {
        let realTranslation = response.data.translations[0].translatedText;
        $("#real-output").html(realTranslation);
        console.log("Real Translation: ", realTranslation);
    })
}


// input validation

// if language isn't selected, show modal

// add firebase persistence 




// capture user input, save to an array

// splice array for each word as an element

// feed each word into wordsapi and determine part of speech

// if it's a noun, push into noun array, pick one at random

// if it's a verb, push into verb array, pick one at random

// feed random noun into wordsapi, get antonym or related word

// feed random verb into wordsapi, get antonym or related word

// 


// var query = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190610T191239Z.42fa8af67298686b.8f95c15c089890188b5307f79995ce0a704e1021&text=${word}&lang=es`

// $.ajax ({
//     url: query,
//     method: "GET",
// }).then(function(response){
//     console.log(response);
// })



// userInput = "I ate an apple";

// userObject = {
//     i0: "I",
//     ate1: "ate",
//     an2: "an",
//     apple3: "apple"
// }

// {"I" - pronoun
//  "ate" - verb
//  "an" - preposition
// "apple" - noun}

// verbObject = {
//     ate1: "ate"
// }

// nounObject = {
//     apple3: "apple"
// }

// newVerbArray = ["threw up"]

// newNounArray = ["orange"]

// newUserObject = {
//     ate1: "threw up"
//     apple3: "orange"
// }

// newUserObject = "I threw up an orange"


// anto = response.results[i].antonyms && response.results[i].antonyms

