var SELECTED = 0;
var DESELECTED = 1;
var totalSelected = 0;


function startButtonClicked(){
    startGame();
    $("#board").show();
    $("#reset").hide();
}

function showReplayButton(){
    $("#reset").show();
}

function startGame(){
    resetScore();
    deselectTiles();
	setBoard();
	beginTimer();
}
function select(index,num){
	if(!canSelect()){
		return;
	}
	var result = toggle(index,num);
	changeColor(result,index);
	
	if(hasWon()){
		incrementAndUpdateScore();
		nextBoard();
	}
}

function resetScore(){
    setScore(0);
    updateScore();
}

function canSelect(){
	if(!outOfTime()){
		return true;
	}
	else{
        
		return false;
	}
}
function changeColor(result,index){
	var id = 'square' + index;
	if(result == SELECTED){
		document.getElementById(id).style.backgroundColor = "rgb(144,237,144)";
	}
	else if(result == DESELECTED){
		document.getElementById(id).style.backgroundColor = "white";
	}
}
function nextBoard(){
	//Game logic
	clearSelected();
	clearTiles();

	//View logic
	deselectTiles();
	setBoard();
}

function greyOutTiles(){
	document.getElementById('square0').style.backgroundColor = "grey";
	document.getElementById('square1').style.backgroundColor = "grey";
	document.getElementById('square2').style.backgroundColor = "grey";
	document.getElementById('square3').style.backgroundColor = "grey";
}
function deselectTiles(){
	document.getElementById('square0').style.backgroundColor = "white";
	document.getElementById('square1').style.backgroundColor = "white";
	document.getElementById('square2').style.backgroundColor = "white";
	document.getElementById('square3').style.backgroundColor = "white";
}

function setBoard(){
	var components = getNumbersAndSum();	
	
	$('#targetSum').html(components.sum);
	setSum(components.sum);
	setTiles(components.tiles);
}

function resetBoard(){
	var currentBoard = getCurrentSumAndTiles();
	setTiles(currentBoard.tiles);
}
function setTiles(tiles){
	$('#0').html(tiles[0]);
	$('#1').html(tiles[1]);
	$('#2').html(tiles[2]);
	$('#3').html(tiles[3]);
}

function incrementAndUpdateScore(){
	incrementScore();
    updateScore();
}
function updateScore(){
	document.getElementById('currentScore').innerHTML = getScore();
}

function updateHighScore(){
    document.getElementById('highScore').innerHTML = 'HighScore: ' + getHighScore();
}