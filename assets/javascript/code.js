
let word = "sprint";
// let userArray = [];
let userObject = {};
// var userInput = $("#user-input").val().trim();
var anto = false;
var partOfSpeech = "";

const randomOf = (arr) => {
    chosenArr = Math.floor(Math.random() * arr.length);
    return chosenArr;
}


// take in user input and turn it into array

userInput = "I ate an apple";

var userArray = userInput.split(" ");

userArray = ["I", "ate", "an", "apple"];

console.log(userArray);

// take in user input array and turn it into an object

function toObject(userArray) {
    for (var i = 0; i < userArray.length; ++i)
        userObject[i] = userArray[i];
    return userObject;
  }


const replaceWords = () => {
    debugger;
    toObject(userArray); 
    for (let key in userObject) {
        word = valueOf(userObject.key);
        console.log(key);
        // console.log(userObject.key);

        // console.log(word);
        getWord(word);
        if (partOfSpeech === "noun") {
            valueOf(key) = anto;
        }
        if (partOfSpeech === "verb") {
            valueOf(key) = anto;
        }
    }
    newUserInput = JSON.stringify(userObject);
    getTranslate(newUserInput);
}

const getWord = () => {
    var queryURL = `https://wordsapiv1.p.mashape.com/words/${word}`
    $.ajax ({
        url: queryURL,
        method: "GET",
        headers: {
            "X-Mashape-Key": "80c3fabd83mshc44d9723dc45a9ap1da501jsn8faca156e252"
        }
    }).then(function(response){
        console.log(response);
        if (response.results){
            partOfSpeech = response.results[0].partOfSpeech;
            for (let i = 0; i < response.results.length; i++) {
                if (response.results[i].antonyms) {
                    anto = response.results[i].antonyms;
                    break;
                } else {
                    anto = response.results[i].synonyms[i];
                    break;
                }
            }
        }
        console.log(anto);
        console.log(partOfSpeech);
    })
}

const getTranslate = () => {
    qURL = `https://translation.googleapis.com/language/translate/v2?target=es&q=${newUserInput}&key=AIzaSyClTfWgaANNnxJloF2kStJQwZorF8JhaG4`;
    $.ajax ({
        url: qURL,
        method: "POST",
    }).then(function(response){
        console.log(response.data.translations[0].translatedText);
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

