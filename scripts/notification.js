var mode
window.addEventListener('load', function() {
    try {
        mode = sessionStorage.getItem('mode')
        if(mode == "dark")
            notifyDarkmode()
    } catch (error) {
        console.log(error)
    }
    
})

function notifyDarkmode(){
    if(!('Notification' in window)){
        alert("This browser does not support desktop notification")
    }
        
    else if(Notification.permission === "granted"){
        var notification = new Notification("Dark Mode")
    }
    else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                var notification = new Notification("Say \"light mode\" to go back!");
            }
        })
    }
}


