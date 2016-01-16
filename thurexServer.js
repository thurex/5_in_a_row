var port = 1337;
var connectedClients = []; //Array of clients connected to server
//local adress: http://127.0.0.1:1337/
 
// Require the modules we need
var http = require('http');
var WebSocketServer = require('websocket').server;

var noOfClientsConnected=0, //Håller koll på hur många som är connected
        maxConnected = 2, //Hur många spelare kan spela samtidigt
        clientsIdConnected = [-1,-1]; //-1 -> plats ledig

var PLAYERX = 0,
        PLAYERO = 1;
 
// Create a http server with a callback for each request
var httpServer = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(200, {'Content-type': 'text/plain'});
    response.end('Hello world\n');
});

for (var k=0;k<2;k++) {
     clientsIdConnected[k] = [];
     clientsIdConnected[k][0] = "-1";
     clientsIdConnected[k][1] = "-1";
     clientsIdConnected[k][2] = "-1";
}
console.log('clientsIdConnected[0][0]: '+clientsIdConnected[0][0]);
console.log('clientsIdConnected[1][0]: '+clientsIdConnected[1][0]);
 
// Setup the http-server to listen to a port
httpServer.listen(port, function() {
    console.log((new Date()) + ' HTTP server is listening on port ' + port);
});
 
// Create an object for the websocket
// https://github.com/Worlize/WebSocket-Node/wiki/Documentation
wsServer = new WebSocketServer({
    httpServer: httpServer,
    autoAcceptConnections: false
});

// Create a callback
wsServer.on('request', function(request) {
    var connection = request.accept('protocol_broadcast', request.origin);
    if (noOfClientsConnected < maxConnected){ //Test om max 1 är kopplade -> plats för 1 till
        connection.broadcastId = connectedClients.push(connection) - 1; //Give client an id
        console.log((new Date()) + ' Broadcast connection accepted from ' + request.origin + ' id = ' + connection.broadcastId);
        noOfClientsConnected++;

        // Callback to handle each message from the client
        connection.on('message', function(message) {
            console.log("Send message to clients:" + message.utf8Data);  
            //var str = "Hello world!";
            var newClientTest = message.utf8Data.substring(0, 3);
            var sendingNewPlayer=null;
            var countingPlayer=0;
            
            for(var i=0; i<connectedClients.length; i++) { //Itarate through all clients
                if (newClientTest === "___" 
                        && connectedClients[i]
                        ){ //new client
                    for (var k=0; k<2; k++){
                        if (clientsIdConnected[k][0] == "-1"){
                            clientsIdConnected[k][0]=connection.broadcastId; //id of client
                            clientsIdConnected[k][1]=message.utf8Data.substring(3); //name of client
                            clientsIdConnected[k][2]=k+1; //Playertype
                            console.log("Id: "+clientsIdConnected[k][0]);
                            console.log("Name: "+clientsIdConnected[k][1]);
                            console.log("Type: "+clientsIdConnected[k][2]);
                            //connectedClients[clientsIdConnected[k][0]].sendUTF("PlayerNo"+k);
                            k=2;
                        }
                    }
                    var sendMessageToNewClients="";
                    for (var k=0; k<2; k++){
                        console.log("Sending no: "+k);
                        sendMessageToNewClients += clientsIdConnected[k][0];
                        sendMessageToNewClients += "___";
                        sendMessageToNewClients += clientsIdConnected[k][1];
                        sendMessageToNewClients += "___";
                        sendMessageToNewClients += clientsIdConnected[k][2];
                        if (k<1){
                            sendMessageToNewClients += "___";
                        }
                    }
                    console.log("sendMessageToNewClients: "+sendMessageToNewClients);
                    for (var k=0; k<2; k++){
                        if (clientsIdConnected[k][0] != -1){
                            connectedClients[clientsIdConnected[k][0]].sendUTF(sendMessageToNewClients);
                        }
                    }
                    
                    
                    
                }
                
                else { //not new client
                    if(connectedClients[i]) { //If client is connected
                        connectedClients[i].sendUTF(htmlEntities(message.utf8Data)); //Send data to client, before check against injections
                    }
                }
                
            }
            console.log('Sent message: ' + message.utf8Data);
            if (message.utf8Data.indexOf(" won!!!!!!!!") > -1){
                console.log("Reseting players");
                clientsIdConnected = []; //Bort???
                clientsIdConnected = [-1,-1];
                for (var k=0;k<2;k++) {
                    clientsIdConnected[k] = [];
                    clientsIdConnected[k][0] = "-1";
                    clientsIdConnected[k][1] = "-1";
                    clientsIdConnected[k][2] = "-1";
                    console.log("Id: "+clientsIdConnected[k][0]);
                    console.log("Name: "+clientsIdConnected[k][1]);
                    console.log("Type: "+clientsIdConnected[k][2]);
                }
                console.log('clientsIdConnected[0][0]: '+clientsIdConnected[0][0]);
                console.log('clientsIdConnected[1][0]: '+clientsIdConnected[1][0]);
                noOfClientsConnected=0;
            }
        });

      // Callback when client closes the connection
      connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected broadcastid = ' + connection.broadcastId + '.');
        connectedClients[connection.broadcastId] = null;
        noOfClientsConnected--;
      });
    } //Slut på test om 2 är kopplade
else { //Skicka felmeddelande
    
}

  return true;    
});

/**
 * Avoid injections
 *
 */
function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Always check and explicitly allow the origin
function originIsAllowed(origin) {
    if(origin === 'http://dbwebb.se' || origin === 'http://localhost') {
        return true;    
    }
    return false;
}