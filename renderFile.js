const ipcRenderer = require('electron').ipcRenderer
var clients = [];
var btn = document.getElementById("conbtn")
var consoleop = document.getElementById("consoleop")

function sendForm(event) {
    let message = document.getElementById("msg").value;
    ipcRenderer.send('messageToClient', message)
}

function connect(event){
    ipcRenderer.send('event',connect)
}

function updateClientList(client){
    clients.push(client)
}

function updateButtonState(state){
    document.getElementById("conbtn").innerHTML = state
}

ipcRenderer.on('connect',function(event, arg){
    btn.innerHTML = "Connect"
})

ipcRenderer.on('disconnect',function(event, arg){
    console.log("--> DIsconnect")
    btn.innerHTML = "Disconnect"
})

ipcRenderer.on('console',function(event, arg){
    var inp = "\n" + arg
    consoleop.innerHTML += inp
})