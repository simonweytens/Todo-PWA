window.addEventListener('load', function(){
    setDarkMode()
    ButtonHandler()
})

var message = document.querySelector('#message')

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

var grammer = '#JSQF v1.0;'

var recognition = new SpeechRecognition()
var speechRecognitionGrammerList = new SpeechGrammarList()
speechRecognitionGrammerList.addFromString(grammer, 1)

recognition.grammars = speechRecognitionGrammerList;
recognition.lang = 'eng-US'
recognition.interimResults = false;

recognition.onresult = async function(event) {
    var last = event.results.length - 1;
    var command = event.results[last][0].transcript;
    message.textContent = 'Voice Input: ' + command ;
    var ref = command.toLowerCase()

    if(ref == "dark mode." || ref == "dark mode")
    {
        window.sessionStorage.setItem('mode', 'dark')
        setDarkMode()
    }else if(ref == "normal mode." || ref == "normal mode")
    {
        sessionStorage.removeItem('mode')
        location.reload()
    }
}
async function setDarkMode(){
    var mode = sessionStorage.getItem('mode')
    if(mode == 'dark')
    {
        var darkbody = document.querySelector("body").style
        darkbody.backgroundColor = "#2A2A2A"
        darkbody.color = "#CFCFCF"
    
        try {
            var darkheader = document.querySelector(".month").style
            darkheader.backgroundColor = "black"
        } catch (error) {
            console.log(error)
        }
    
    
        var darknav = document.querySelector("nav").style
        darknav.backgroundColor = "black"
        try {
            var darkcalender = document.querySelector(".calender").style
            darkcalender.backgroundColor = "#2A2A2A"
    
            var darktoday = document.querySelector(".today").style
            darktoday.backgroundColor = "black"
        } catch (error) {
            console.log(error)
        }
    
        var darkbutton = document.querySelector(".btn").style
        darkbutton.backgroundColor = "black"
        darkbutton.color = "#CFCFCF"
    }
}




recognition.onspeechend = function() {
    recognition.stop();
};

recognition.onerror = function(event) {
    message.textContent = 'Error occurred in recognition: ' + event.error;
}        
async function ButtonHandler(){
    try {
        document.querySelector('#btnGiveCommand').addEventListener('click', function(){
            recognition.start();
      });
    } catch (error) {
        console.log(error)
    }

}







