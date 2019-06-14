//this function makes sure the browser is safe for voice recongnitions//

try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
}
catch (e) {
    console.error(e);
    $('.no-browser-support').show();
    $('.app').hide();
}

// Voice Recognition //

var textNote = $('#user-input');
var noteContent = '';
var microphoneStart = $("#microphone");
var pause = $("#pause-circle");

// the recording will stop if no noise is picked up
//will stay on if sound continues
recognition.continuous = true;

// To capture a line for the Speech API  
recognition.onresult = function (event) {

    //to hold only current line in speech object
    var current = event.resultIndex;

    // Get a transcript of what was said.
    var transcript = event.results[current][0].transcript;

    // to fix know duplicate bug on mobile
    var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

    if (!mobileRepeatBug) {
        noteContent += transcript;
        textNote.val(noteContent);
    }
};

// HTML buttons


$('#start-recording').on('click', function (e) {
    if (noteContent.length) {
        noteContent += ' ';
    }
    recognition.start();
    // recording icon
    $("#microphone-icon").addClass("active-mic");

    // $("#microphone-icon").show();
    
  
    
});


$('#pause-recording').on('click', function (e) {
    recognition.stop();
    // pause icon
    $("#microphone-icon").removeClass("active-mic");
    // $("#microphone-icon").hide();
   
});


$('#delete-content').on('click', function (e) {
    recognition.stop();
   $("#user-input").val("");
   $("#output").val("");
   $("#real-output").val("");
})


