

var WebSocketServer = require('websocket').server;
var http = require('http');
var ipc = require('electron').ipcMain
var ipcRen = require('electron').ipcRenderer
var mainThr = require('./main.js')
var clients = []

var server = http.createServer(function(request, response) {
  // process HTTP request. Since we're writing just WebSockets
  // server we don't have to implement anything.
});
module.exports = {

  startServer : function(){
    server.listen(1337, function() { 
        console.log("Listening")
        mainThr.winS.webContents.send('console',"Socket started listening ...")
        });
    
    // create the server
    wsServer = new WebSocketServer({
      httpServer: server
    });
    
    // WebSocket server
    wsServer.on('request', function(request) {
      console.log("incoming request to connect")
      mainThr.winS.webContents.send('console',"Incoming request to connect..")
      
      var connection = request.accept(null, request.origin);
      clients.push(connection)
      // This is the most important callback for us, we'll handle
      // all messages from users here.
      connection.on('message', function(message) {
        if (message.type === 'utf8') {
          // process WebSocket message
         console.log("message received")
        }
      });
      connection.on('connect',function(connection){
        mainThr.winS.webContents.send('console',"Connection established")
        console.log("Connection established")
      })
      connection.on('close', function(connection) {
        // close user connection
        mainThr.winS.webContents.send('console',"Closing connection")
        console.log("Connection close")
      });
    });

    wsServer.on('close',function(connection,reason,desc){
      mainThr.winS.webContents.send('console',"Cloes request from client")
      console.log("Close request from client")
        var index = clients.indexOf(connection)
        clients.splice(index,1)
        connection.close
    });
  },

  stopServer : function(){
    if(server.listening){
    server.close()
      }
  }
}


ipc.on('messageToClient',function(event,message){
    //console.log("Message to client is ",message)
    mainThr.winS.webContents.send('console',"Sending message to client")
    var msgJson = JSON.parse(message)
    var count = 0;
    clients.forEach(function (conn){
      console.log("Client --> "+count)
      count  = count +1
      conn.send(message)
    })
  });

ipc.on('event',function(event,message){
  if(server.listening){
    //module.exports.stopServer();
    mainThr.winS.webContents.send('console',"Server stopping")
    console.log("Server stopping -----> ")
    mainThr.winS.webContents.send('connect')
    
    clients.forEach(function (conn){
      conn.close
    });

  }else{
    module.exports.startServer();
    //ipc.send('disconnect','')
    mainThr.winS.webContents.send('disconnect')
    mainThr.winS.webContents.send('console',"Server starting")
    
    console.log("Server starting")
    
  }
});
