/**
 * 
 */
$(document).ready(function(){
    'use strict';
    /*
     * 
    
     */
    //var canvas = document.getElementById("canvasGame");
    //var ctx = canvas.getContext("2d");
    var gridSize = 24,  
    gameOn = true,
    CROSSPLAYER = 1,
    CIRCLEPLAYER = 2,
    currentPlayer = CIRCLEPLAYER,
    crossPlayerArray =[],
    circlePlayerArray =[],
    playerArray = ['Crossplayer','Circleplayer'],
    area = document.getElementById('gameplan'),
    playerType = document.getElementById('playerType'),
    five =[],
    sendTurn = document.getElementById('sendTurn'),
    statusInput = document.getElementById('status'),
    counter, //used as counter
    /**
     * This is the background for the game area.
     */
    gameArea = [
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    ],
    GameBlocks = [
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    ],
    playerTurnInputBox = document.getElementById('currentPlayer'),
    squareSelected = document.getElementById('squareNo'),
    playerCross = document.getElementById('playerCross'),
    playerCircle = document.getElementById('playerCircle'),
    inRow =1;
    squareSelected.value ="";
    statusInput.value = "Not connected";
    
    //function drawGamePlan(gameArea, gameBlocks) {
    function drawGamePlan(gameArea) {
        var i,e,b;
        for(i = 0; i < gameArea.length; i++) {
            e = document.createElement('div');
            e.innerHTML = '';
            e.className = 'tile t' + gameArea[i];
            e.id = 'n' + i;
            area.appendChild(e);
        } 
    };
  
    drawGamePlan(gameArea);
  
    $('#gameplan').click(function(e) {
        crossPlayerArray = [];
        circlePlayerArray = [];
        for (var i=0; i<(gridSize*gridSize); i++){
            if (document.getElementById('n'+i).className === 'tile t1'){
                crossPlayerArray.push(i);
            }
            else if (document.getElementById('n'+i).className === 'tile t2'){
                circlePlayerArray.push(i);
            }
        }
        //var target = $(e.target);
        //console.log("Clicked on square: "+e.target.id);
        var matrixNo = e.target.id.substring(1);
        //console.log("Clicked on square: "+matrixNo);
        gameArea[matrixNo-1]=1;
        //Testa om rutan redan är vald, om inte vald fortsätt med nedanstående kod
        //e.className = 'tile t' + gameArea[matrixNo];
        var test = true;
        if (gameOn && playerCross.value != "" && playerCircle.value != ""){
            for (var i=0; i<crossPlayerArray.length; i++){
                //console.log("Inside for loop-cross");
                if (crossPlayerArray[i] === matrixNo){
                    test = false;
                }
                else if(circlePlayerArray[i] === matrixNo){
                    test = false;
                }
            }
            //var testVal = parseInt(playerTurnInputBox.value,10);
            currentPlayer = playerTurnInputBox.value;
            statusInput.value = "Waiting";
            if (playerTurnInputBox.value === playerType.value){
                statusInput.value = "Your turn";
            }

            if (test === true
                    //&& parseInt(playerType.value,10) != parseInt(playerTurnInputBox.value+1,10) 
                    && statusInput.value === "Your turn" //Check that its your turn
                    ){ //Check that box is empty and currentplayers turn 
                statusInput.value = "Waiting";
                currentPlayer = playerTurnInputBox.value;
                
                e.className = 'tile t'+currentPlayer;
                e.target.className = 'tile t'+currentPlayer;
                squareSelected.disabled = false;
                playerTurnInputBox.disabled = false;
                squareSelected.value = e.target.id;
                squareSelected.disabled = true;

                if (currentPlayer == CROSSPLAYER){
                    crossPlayerArray.push(matrixNo);
                    currentPlayer = CIRCLEPLAYER;
                    playerTurnInputBox.value = CIRCLEPLAYER;
                    testWin(crossPlayerArray, matrixNo);

                }else {
                    circlePlayerArray.push(matrixNo);
                    currentPlayer = CROSSPLAYER;
                    playerTurnInputBox.value = CROSSPLAYER;
                    testWin(circlePlayerArray, matrixNo);
                }      
            }
        }
        
      
    });
    
    /*
     * 
     * @param {type} playerArray
     * @param {type} matrixNo
     * @returns {undefined}
     * 
     */
    
    function testWin(playerArray, matrixNo){
        /*
        if (playerArray.length>1){
            var testingLastNo = playerArray[playerArray.length-2];
            console.log("testNo: "+parseInt(testingLastNo/24+playerArray.length-1,10));
            console.log("matrixNo: "+parseInt(testingLastNo/24+playerArray.length-1,10));
        }
        */
        five =[]; //Used for store location of 5 in a row
        five.push(matrixNo); //First location of 5 in a row
        
        if (playerArray.length>4){ //Måste vara minst 5 st för att få 5 i rad
            var j=0, //Inre loop genom hela array
            testing =0; //Yttre loop, max 5 varv
            //HORIZONTAL TEST
            //Testing horizontal lower value
            //------------------------------
            while (testing<6){ 
                console.log("Testa lägre värde");
                j=0;
                while (j<(playerArray.length-1)){
                    var testingValue = parseInt(playerArray[j],10);
                    if ((testingValue+inRow)==matrixNo && 
                            parseInt((testingValue)/24,10)===parseInt(matrixNo/24,10)){ //Testar horisontellt lägre och samma rad
                        inRow++; //1 till i rad
                        j=playerArray.length; //Börja om inre loop med 1 steg till längre från sista
                        five.push(playerArray[j]); //Location of 5 in a row
                        console.log("In a row: "+inRow);
                    }
                    j++; //Stega upp inre loop 1 steg                    
                }
                testing++; //Stega upp yttre loop 1 steg    
            }
            //Testing horizontal higher value
            //-------------------------------
            if (inRow<5){ 
                j=0; //Inre loop genom hela array
                testing =0; //Yttre loop, max 5 varv
                var testHigher=1; //Testa 1 steg högre
                while (testing< (6)){
                    j=0;
                    while (j<(playerArray.length-1)){
                        if ((parseInt(playerArray[j],10)-testHigher)==matrixNo && 
                            parseInt((testingValue)/24,10)===parseInt(matrixNo/24,10)){ //Testar horisontellt lägre och samma rad
                            inRow++; //1 till i rad
                            j=playerArray.length; //Börja om inre loop med 1 steg till längre från sista
                            console.log("In a row: "+inRow);
                            testHigher++; //Testa ytterliggare 1 steg högre
                            five.push(playerArray[j]); //Location of 5 in a row
                        }
                        j++; //Stega upp inre loop 1 steg                    
                    }
                    testing++; //Stega upp yttre loop 1 steg    
                }
            }
        }
        if (inRow>4){
            endOfGame();
        }
        else{
            five =[]; //Used for store location of 5 in a row. Reset
            five.push(matrixNo); //First location of 5 in a row
            testing = 0;
            //VERTICAL TEST
            //Testing vertical higher value
            //------------------------------
            while (testing<6){ //Testing vertical lower value                
                j=0;
                while (j<(playerArray.length-1)){
                    if ((parseInt(playerArray[j],10)+inRow*24)==matrixNo){ //Testar horisontellt lägre
                        inRow++; //1 till i rad
                        j=playerArray.length; //Börja om inre loop med 1 steg till längre från sista
                        console.log("In a row: "+inRow);
                        five.push(playerArray[j]); //Location of 5 in a row
                    }
                    j++; //Stega upp inre loop 1 steg  
                }
                testing ++;
            }
            //Testing vertical higher value
            //------------------------------
            
            if (inRow<5){ 
                j=0; //Inre loop genom hela array
                testing =0; //Yttre loop, max 5 varv
                var testHigher=1; //Testa 1 steg högre
                while (testing< (6)){
                    j=0;
                    while (j<(playerArray.length-1)){
                        if ((parseInt(playerArray[j],10)-testHigher*24)==matrixNo){ //Testar horisontellt lägre
                            inRow++; //1 till i rad
                            j=playerArray.length; //Börja om inre loop med 1 steg till längre från sista
                            console.log("In a row: "+inRow);
                            testHigher++; //Testa ytterliggare 1 steg högre
                            five.push(playerArray[j]); //Location of 5 in a row
                        }
                        j++; //Stega upp inre loop 1 steg                    
                    }
                    testing++; //Stega upp yttre loop 1 steg    
                }
            }
        }
        var testingNo; //Used for testing 5 in a row digonal not crossing the borders
        if (inRow>4){
            endOfGame();
        }
        else{
            testing = 0;
            five =[]; //Used for store location of 5 in a row. Reset
            five.push(matrixNo); //First location of 5 in a row
            inRow=1;  //Reset counter
            //Diagonal TEST
            //Testing diagonal up-hill
            //Nya tester: Testa radskilnaden.
            //------------------------------
            while (testing<6){ //Testing horizontal lower value. Måste hela tiden vara 1 rad högre(div med heltal, se horizontal)
                j=0;
                var testDia;
                while (j<(playerArray.length-1)){
                    testingNo = parseInt(playerArray[j],10)+inRow*23; //testa istället om det skiljer en rad varken mer eller mindre
                    testDia = parseInt(playerArray[j],10)+inRow*23 +1*inRow;
                    
                    //testingNo = testingNo%24;
                    if ((parseInt(playerArray[j],10)+inRow*23)==matrixNo){
                        if (parseInt (matrixNo/24,10) == parseInt(playerArray[j]/24+inRow,10)){
                            inRow++; //1 till i rad
                            j=playerArray.length; //Börja om inre loop med 1 steg till längre från sista
                            console.log("In a row: "+inRow);
                            five.push(playerArray[j]); //Location of 5 in a row
                        }
                            /*
                        inRow++; //1 till i rad
                        j=playerArray.length; //Börja om inre loop med 1 steg till längre från sista
                        console.log("In a row: "+inRow);
                        */
                    }
                    j++; //Stega upp inre loop 1 steg  
                }
                testing ++;
            }
            //Testing diagonal up-hill, backward
            //------------------------------
            
            if (inRow<5){ 
                j=0; //Inre loop genom hela array
                testing =0; //Yttre loop, max 5 varv
                var testHigher=1; //Testa 1 steg högre
                testingNo = parseInt(playerArray[j],10)-testHigher*23;
                //testingNo = testingNo%24;
                while (testing< (6)){
                    j=0;
                    while (j<(playerArray.length-1)){
                        
                        if ((parseInt(playerArray[j],10)-inRow*23)==matrixNo ){
                            if (parseInt (matrixNo/24+inRow,10) == parseInt(playerArray[j]/24,10)){
                                inRow++; //1 till i rad
                                j=playerArray.length; //Börja om inre loop med 1 steg till längre från sista
                                console.log("In a row: "+inRow);
                                testHigher++; //Testa ytterliggare 1 steg högre
                                five.push(playerArray[j]); //Location of 5 in a row
                            }
                        }
                        j++; //Stega upp inre loop 1 steg                    
                    }
                    testing++; //Stega upp yttre loop 1 steg    
                }
            }
        }
        if (inRow>4){
            endOfGame();
        }        
        else{
            testing = 0;
            five =[]; //Used for store location of 5 in a row. Reset
            five.push(matrixNo); //First location of 5 in a row
            inRow=1;  //Reset counter
            //Diagonal TEST
            //Testing diagonal down-hill
            //------------------------------
            while (testing<6){ //Testing horizontal lower value                
                j=0;
                while (j<(playerArray.length-1)){
                    testingNo = parseInt(playerArray[j],10)+inRow*25;
                    testingNo = testingNo%24;
                    if ((parseInt(playerArray[j],10)+inRow*25)==matrixNo){ //Testar horisontellt lägre
                        if (parseInt (matrixNo/24,10) == parseInt(playerArray[j]/24+inRow,10)){
                            inRow++; //1 till i rad
                            j=playerArray.length; //Börja om inre loop med 1 steg till längre från sista
                            console.log("In a row: "+inRow);
                            five.push(testingValue); //Location of 5 in a row
                        }
                    }
                    j++; //Stega upp inre loop 1 steg  
                }
                testing ++;
            }
            //Testing diagonal down-hill, backward
            //------------------------------
            
            if (inRow<5){ 
                j=0; //Inre loop genom hela array
                testing =0; //Yttre loop, max 5 varv
                var testHigher=1; //Testa 1 steg högre
                while (testing< (6)){
                    j=0;
                    while (j<(playerArray.length-1)){
                        testingNo = parseInt(playerArray[j],10)-inRow*25;
                        testingNo = testingNo%24;
                        if ((parseInt(playerArray[j],10)-testHigher*25)==matrixNo){ //Testar horisontellt lägre
                            if (parseInt (matrixNo/24+inRow,10) == parseInt(playerArray[j]/24,10)){
                                inRow++; //1 till i rad
                                j=playerArray.length; //Börja om inre loop med 1 steg till längre från sista
                                console.log("In a row: "+inRow);
                                testHigher++; //Testa ytterliggare 1 steg högre
                                five.push(testingValue); //Location of 5 in a row
                            }
                        }
                        j++; //Stega upp inre loop 1 steg                    
                    }
                    testing++; //Stega upp yttre loop 1 steg    
                }
            }
        }
        if (inRow>4){
            endOfGame();
        }
        inRow=1;  //Reset counter
        /*
        for (var i=0; i<playerArray.length-1; i++){
            console.log("matrixNo - "+inRow+" playerArray: "+playerArray[i]);
            console.log("matrixNo-inRow: "+matrixNo-inRow);
            if (playerArray[i] === (matrixNo-inRow)){
                inRow++;
                console.log("In a row: "+inRow);
            }
        }
        */
    }
    
    function addInRow(){
        
    }
    
    function endOfGame(){
        var x;
        /*
        for (var i=0; i<inRow; i++){
            document.getElementById('n' + five[i]).className = "tile t3";
            //console.log("Element: "+five[i]);
        }
        */
       var name;
       if (currentPlayer != CROSSPLAYER){
           name = "crossplayer";
       }
       else {
           name = "circleplayer";
       }
        statusInput.value = name+" won!!!!!!!!";
        gameOn = false;
       /*
        if (confirm("Congratualations "+name+" you got 5 in a row!!! Play again?") == true) {
            x = "You pressed OK!";
            for (var i=0; i<gameArea.length; i++){
                gameArea[i]=0;
                document.getElementById('n' + i).className = "tile t0";
            }
            
            gameOn = true;
        } else {
            x = "You pressed Cancel!";
            gameOn = false;
        }*/
        //Setting all global variables to its default value
        inRow = 1;
        currentPlayer = CROSSPLAYER;
        crossPlayerArray =[];
        circlePlayerArray =[];
        circlePlayerArray;
        five = [];
        for (var i=0; i<gameArea.length; i++){
            gameArea[i]=0;
        }

    }
  /*
      var tileName = "#n";
      $("#n5").click(function() {
        //$('#thure').fadeToggle(1000);
        console.log("Clicked on square: 5");
        return false;
    });
    */
  

});
 