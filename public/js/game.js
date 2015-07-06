var MAX_SELECTED = 2;
var START_END_NUMBER = 10;

var currentSum;

var tileNumbers = [];
var selected = [];

var currentScore = 0;
var highScore = 0;

var startNumber = 1;
var endNumber= START_END_NUMBER;

var sum;
var tiles;

function toggle(index,num){
	var result = DESELECTED;
	// If element does not exist
	var foundIndex = selected.indexOf(index);
	
	if(foundIndex < 0){
		if(selected.length < MAX_SELECTED){
			selected.push(index);
			result = SELECTED;
		}
	}
	else{
		selected.splice(selected.indexOf(index),1);
		result = DESELECTED;
	}
	return result;
}

function getCurrentSumAndTiles(){
	return {
		sum: sum,
		tiles: tiles
	};
}
function getNumbersAndSum(){
	var tempSum = 0;
	var tiles = [];
	for(var i = 0;i < 4;i++){
		var rand = Math.floor(Math.random() * endNumber + startNumber);
		tiles.push(rand);
	}

	var randIndex1 = Math.floor(Math.random() * 4);
	tempSum += tiles[randIndex1];

	var randIndex2 = ( randIndex1 + Math.floor(Math.random() * 3 + 1) ) % 4
	tempSum += tiles[randIndex2];

	tileNumbers = tiles;

	updateStartAndEndNumbers();
	
	sum = tempSum;
	tiles = tiles;

	return {
		sum: tempSum,
		tiles: tiles
	};
}

function resetEndNumber(){
    endNumber= START_END_NUMBER;
}
function updateStartAndEndNumbers(){
	endNumber += 1;
}

function hasWon(){
	if(selected.length == MAX_SELECTED){

		var total = tileNumbers[selected[0]] + tileNumbers[selected[1]];
		if(total == sum){
			return true;
		}
	}
	return false;
}

function clearSelected(){
	selected = [];
}

function clearTiles(){
	tileNumbers = [];
}
function setSum(newSum){
	currentSum = newSum;
}

function getSum(){
	return currentSum;
}

function getScore(){
	return currentScore;	
}

function setScore(newScore){
	currentScore = newScore;
}

function incrementScore(){
	var s = getScore();
	setScore(s + 1);
}

function getHighScore(){
    return highScore;
}

function setHighScore(newHighScore){
    highScore = newHighScore;
}
function sendHighScore(){
    
    $.ajax({                    
        url: '/newHighScore',     
        type: 'post',
        data : {
        highScore : getScore().toString()
        },
        dataType: 'json',                   
        success: function(data)         
        {
            var hs = data.highScore;

            setHighScore(hs);
            updateHighScore();
        }
    });
}

