
let word = "computer";

var queryURL = `https://wordsapiv1.p.mashape.com/words/${word}`

$.ajax ({
    url: queryURL,
    method: "GET",
    headers: {
        "X-Mashape-Key": "80c3fabd83mshc44d9723dc45a9ap1da501jsn8faca156e252"
    }
}).then(function(response){
    console.log(response);
})


var query = `https://translate.yandex.net/api/v1.5/tr.json/translate&text=${word}&lang=en-es&key=trnsl.1.1.20190610T191239Z.42fa8af67298686b.8f95c15c089890188b5307f79995ce0a704e1021`

$.ajax ({
    url: query,
    method: "GET",
}).then(function(response){
    console.log(response);
})