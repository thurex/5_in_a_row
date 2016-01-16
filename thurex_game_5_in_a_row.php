<!doctype html>
<meta charset=utf-8>
<title>HTML5 websockets</title>
<!--<input id='url' value='ws://dbwebb.se:1337'/> -->
<input id='url' value='ws://127.0.0.1:1337'/></br>
<label>Name: </label><input id="userName" /><input id="playerType" hidden = true/></br>
<button id='connect'>Connect</button><button id='disConnect' hidden = true>Disconnect</button></br>
<label>Message: </label><input id="textMessage" /><button id='sendMessage'>Send</button></br>
<div >Sent messages: </br></div>
<textarea id="sentMessages" rows="4" cols="50"></textarea></br>
<table>
    <tr><td><label>Player Cross: </label></td><td><input id="playerCross"></input></td></tr>
    <tr><td><label>Player Circle: </label></td><td><input id="playerCircle"></input></td></tr>
    <tr><td><label hidden = true>Player turn: </label></td><td><input id="currentPlayer" value ="1" hidden = true></input></td><td><input id="squareNo" hidden = true></input></td></tr>
    <tr><td><button id='sendTurn'>Send your turn</button></td><td><label>Status: </label></td><td><input id="status"></input></td></tr>
</table>



 
<script>
    //Trig when new turn recieved
    //$('#squareNo').val(currentSquareNo.value)
    //             .trigger('change');
    //5 in a row variables
    
    
    //Websocket variables
    var url = document.getElementById('url'),
    connect = document.getElementById('connect'),
    disconnect = document.getElementById('disConnect'),
    statusInput = document.getElementById('status'),
    playerType = document.getElementById('playerType'),
    textMessage = document.getElementById('textMessage'),
    sendMessage = document.getElementById('sendMessage'),
    sentMessages = document.getElementById('sentMessages'),
    userName = document.getElementById('userName'),
    playerCross = document.getElementById('playerCross'),
    playerCircle = document.getElementById('playerCircle'),
    sendTurn = document.getElementById('sendTurn'),
    PLAYERX = 1,
    PLAYERO = 2,
    currentSquareNo = document.getElementById('squareNo'),
    currentPlayerNoInputBox = document.getElementById('currentPlayer'),
    currentPlayer,
    uName = null,
    NO_PLAYERS = 2,
    COLUMNS = 24,
    ROWS = 24,
    NOT_CONNECTED = "Not connected",
    playersArray =[],
    websocket;
    playerType.value ="";
    
    playerCross.value ="";
    playerCircle.value ="";
                
    for (var k=0; k<NO_PLAYERS; k++){
        playersArray[k] = [];
    }
// Event handler to create the websocket connection when someone clicks the button #connect
connect.addEventListener('click', function(event) {
    if ((userName.value.length>0 && (playerCross.value.length<1 || playerCircle.value.length<1)) && statusInput.value.indexOf("Not connected") > -1 ){
        if (uName == null){
            uName = userName.value;
        }
        for (var i=0; i< COLUMNS * ROWS; i++){ //resets gameplan
            document.getElementById('n' + i).className = "tile t0";
        }
        statusInput.value = NOT_CONNECTED;
        websocket = new WebSocket(url.value, 'protocol_broadcast');        
        console.log('Connecting to: ' + url.value);
        //websocket.send("___"+uName); 
        
        //websocket.send('Hej!');
        
        disconnect.addEventListener('click', function(event){
            websocket.close();
        });
        
        sendTurn.addEventListener('click', function(event){
            console.log('Send turn');
            websocket.send(playerType.value+'Turn sent: ' + currentSquareNo.value); 
            currentSquareNo.value ="";
            if (statusInput.value.indexOf(" won!!!!!!!!") > -1){
                console.log("Test of winner");
                websocket.send(statusInput.value); 
                websocket.close();
            }
            //statusInput.value ="Waiting";
        });
            
        
        sendMessage.addEventListener('click', function(event) {
           websocket.send(uName + ": " + textMessage.value); 
           textMessage.value="";
        });
  
        
        
 
        // Eventhandler when the websocket is opened.
        websocket.onopen = function() {
            console.log('The websocket is now open.');
            websocket.send('___'+uName);
            if (playerCross.value.length < 1){
                playerCross.value = uName;
                playerCross.disabled = true;
                currentPlayer = PLAYERX;
            }
            else {
                playerCircle.value = uName;
                playerCircle.disabled = true;
                currentPlayer = PLAYERO;
            }
            
        }
 
        websocket.onmessage = function(event) {
            var messageData = event.data;
            console.log('Receiving message: ' + event.data);
            
            var recievingNewPlayer = event.data;
            if (event.data.indexOf("Turn sent: ") > -1 ){
                var playerTurn = event.data.split("Turn sent: ");
                if (playerTurn[0] != playerType.value){
                    console.log("New turn recieved from: "+playerTurn[0]);
                    if (playerTurn[0]===playerType.value){
                        statusInput.value = "Waiting";
                    }
                    else{
                        statusInput.value = "Your turn";
                    }
                    //Players turn
                    currentSquareNo.disabled = false;
                    currentSquareNo.value = playerTurn[1];
                    currentSquareNo.disabled = true;
                    //Player sent
                    //currentPlayerNoInputBox.disabled = false;
                    document.getElementById(playerTurn[1]).className = 'tile t'+currentPlayerNoInputBox.value;
                    if (playerTurn[0] == 1){
                        currentPlayerNoInputBox.value = "2";
                    }
                    else {
                        currentPlayerNoInputBox.value = "1";
                    }
                    
                    console.log(playerTurn[1].target.className);
                }
                
            }
            
            if (event.data.indexOf(" won!!!!!!!!") > -1){
                console.log("Test of winner");
                statusInput.value=event.data; 
                websocket.close();
            }
            
            if (event.data.indexOf("___")>-1){ //Test of new player
                var playersArrayTemp =[];
                
                playersArrayTemp = event.data.split("___");
                
                if (playersArrayTemp[4]!= "-1"){
                    playerCircle.disable = false;
                    playerCircle.value = playersArrayTemp[4];
                    playerCircle.disable = true;
                }
                var counter =0;
                for (var k=0; k<NO_PLAYERS; k++){
                    for (var i=0; i<3; i++){
                        if (playersArray[k][i] != "-1"){
                            playersArray[k][i] = playersArrayTemp[counter];
                        }
                        counter++;
                    }
                }
            
                if (playersArray[0][0] != "-1"){
                    playerCross.value = playersArray[0][1];
                    if (playersArray[1][0] == "-1" && playerType.value ==""){
                        playerType.value = playersArray[0][2];;
                        playerType.disabled = true;
                    }
                    playerCross.disabled = true;
                    currentPlayer = PLAYERX;
                }
                if(playersArray[1][0] != "-1"){
                    if (playerType.value ==""){
                        playerType.value = playersArray[1][2];
                    }
                    playerCircle.disabled = false;
                    playerCircle.value = playersArray[1][1];
                    playerCircle.disabled = true;
                }
                
                if (playerType.value.indexOf("1") > -1){
                    statusInput.value = "Your turn";
                }
                else {
                    statusInput.value = "Waiting";
                }
                var newPlayersTest = event.data.substring(2, 4);
                
                if (newPlayersTest === "__"){
                    players = recievingNewPlayer.split("___");
                }
                playerCircle.disable = true;
            } //new player test closed
            
            else if(event.data.indexOf("Turn sent: ") === -1 ){
                sentMessages.value += event.data + "\n";
            }
            
        }
 
        // Eventhandler when the websocket is closed.
        websocket.onclose = function() {
            console.log('The websocket is now closed.');
            playerCross.disabled = false;
            playerCircle.disabled = false;
            playerType.disabled = false;
            statusInput.disabled = false;
            playerCross.value ="";
            playerCircle.value ="";
            sentMessages.value="";
            userName.value="";
            statusInput.value = "Update browser to play again";
            currentPlayerNoInputBox.value = PLAYERX;
            playerType.value = "";
            currentSquareNo.value ="";
            playersArray =[];
        }
}} , false);

</script>
<h1 class="center">5 in a row</h1>

<div id='gameplan'>

</div>
 
