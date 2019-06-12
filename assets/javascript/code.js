
let word = "sprint";
// let userArray = [];
let userObject = {};
let renderedObject = {};
var userArray = "";
var userInput = "";
// var anto = "";
// var partOfSpeech = "";
let newUserObject = {};
let newUserArray = [];
var sentence = "";

const randomOf = (arr) => {
    chosenArr = Math.floor(Math.random() * arr.length);
    return chosenArr;
}


$(document).on("click", "#submit-request", function(){
    userInput = $("#user-input").val().trim();
    userArray = userInput.split(" ");
    $("#output").empty();
    renderedObject = {};
    userObject = {};
    sentence = "";
    replaceWords();
})

// take in user input and turn it into array

// userInput = "I ate an apple";


// userArray = ["I", "ate", "an", "apple"];

console.log(userArray);

// take in user input array and turn it into an object

function toObject(userArray) {
    for (let i = 0; i < userArray.length; ++i)
        userObject[i] = userArray[i];
    return userObject;
  }


const replaceWords = async () => {
    toObject(userArray);
    for (let key in userObject) {
        word = userObject[key];
        // getWord(word);
        await getWordPromise(word);
    }
    console.log("[getWord] ", renderedObject); 
    replacePhrase();
}

// const speechPart = () => {
//     for (let key in userObject) {
//         if (partOfSpeech === "noun") {
//             userObject[key] = anto;
//         }
//         if (partOfSpeech === "verb") {
//             userObject[key] = anto;
//         }
//     }
// }

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
                console.log(renderedObject);
                // replacePhrase();
            }
            resolve()
        })
    })
}


// const getWord = (word) => {
//     var queryURL = `https://wordsapiv1.p.mashape.com/words/${word}`
//     $.ajax ({
//         url: queryURL,
//         method: "GET",
//         headers: {
//             "X-Mashape-Key": "80c3fabd83mshc44d9723dc45a9ap1da501jsn8faca156e252"
//         }
//     }).then(function(response){
//         console.log(response);
//         var anto = "";
//         var partOfSpeech = "";
//         if (response.results){
//             for (let i = 0; i < response.results.length; i++) {
//                 if (response.results[i].antonyms) {
//                     anto = response.results[i].antonyms.trim();
//                     partOfSpeech = response.results[i].partOfSpeech.trim();
//                     if (partOfSpeech === "noun" || partOfSpeech === "verb") {
//                         renderedObject[word] = anto;
//                     }
//                 } else if (response.results[i].synonyms) {
//                     anto = response.results[i].synonyms[i].trim();
//                     partOfSpeech = response.results[i].partOfSpeech.trim();
//                     if (partOfSpeech === "noun" || partOfSpeech === "verb") {
//                         renderedObject[word] = anto;
//                     }
//                 } else {
//                 }
//             }
//             console.log(renderedObject);
//             // replacePhrase();
//         }
//         console.log("antonym: " + anto);
//         console.log("part of speech: " + partOfSpeech);
//     })
// }

/*
renderedObject
{an: "associate in nursing", apple: "malus pumila", I: "one"}
userObject
{0: "I", 1: "ate", 2: "an", 3: "apple"}
*/
const replacePhrase = () => {
    for (let k = 0; k < Object.values(userObject).length; k++) {
        if (renderedObject[userObject[k]]) {
            console.log(Object.keys(userObject)[k])
            userObject[k] = renderedObject[userObject[k]];
            console.log(userObject);
        }
    }
    for (let j in userObject) {
        sentence += userObject[j] + " ";
    }
    console.log("replacePhrase", sentence)
    getTranslate(sentence);
}
// newUserInput = newUserArray.toString();
// getTranslate(newUserInput);

const getTranslate = (sentence) => {
    qURL = `https://translation.googleapis.com/language/translate/v2?target=es&q=${sentence}&key=AIzaSyClTfWgaANNnxJloF2kStJQwZorF8JhaG4`;
    $.ajax ({
        url: qURL,
        method: "POST",
    }).then(function(response){
        console.log(response.data.translations[0].translatedText);
        let translation = response.data.translations[0].translatedText;
        $("#output").html(translation);
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

