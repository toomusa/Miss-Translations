

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

$(document).on("click", "#submit-request", function(event){
    event.preventDefault();
    $("#real-output").hide();
    $("#real-output").empty();
    $("#real-translation").hide()
    userInput = $("#user-input").val().trim();
    userArray = userInput.split(" ");
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

$(document).on("click", "#real-translation", function(event){
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
    }
    replacePhrase();
}

const getWordPromise = (word) => {
    return new Promise ((resolve, reject) => {
        var queryURL = `https://wordsapiv1.p.mashape.com/words/${word}`
        $.ajax ({
            url: queryURL,
            method: "GET",
            headers: {
                "X-Mashape-Key": "80c3fabd83mshc44d9723dc45a9ap1da501jsn8faca156e252"
            }
        }).then(function(response){
            console.log(response);
            var anto = "";
            var partOfSpeech = "";
            if (response.results){
                for (let i = 0; i < response.results.length; i++) {
                    if (response.results[i].antonyms) {
                        anto = response.results[i].antonyms;
                        partOfSpeech = response.results[i].partOfSpeech;
                        if (partOfSpeech === "noun" || partOfSpeech === "verb") {
                            renderedObject[word] = anto;
                        }
                    } else if (response.results[i].synonyms) {
                        anto = response.results[i].synonyms[i];
                        partOfSpeech = response.results[i].partOfSpeech;
                        if (partOfSpeech === "noun" || partOfSpeech === "verb") {
                            renderedObject[word] = anto;
                        }
                    } else {

                    }
                }
            }
            resolve()
        })
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
    qURL = `https://translation.googleapis.com/language/translate/v2?target=es&q=${sentence}&key=AIzaSyClTfWgaANNnxJloF2kStJQwZorF8JhaG4`;
    $.ajax ({
        url: qURL,
        method: "POST",
    }).then(function(response){
        let translation = response.data.translations[0].translatedText;
        $("#output").html(translation);
        console.log("Translation: ", translation);
    })
}

const realTranslate = (userInput) => {
    qURL = `https://translation.googleapis.com/language/translate/v2?target=es&q=${userInput}&key=AIzaSyClTfWgaANNnxJloF2kStJQwZorF8JhaG4`;
    $.ajax ({
        url: qURL,
        method: "POST",
    }).then(function(response){
        let realTranslation = response.data.translations[0].translatedText;
        $("#real-output").html(realTranslation);
        console.log("Real Translation: ", realTranslation);
    })
}





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

