var seconds;
var START_TIMER = 10;

var current_time;
var timer;

function beginTimer(){
	setTimer(START_TIMER);	
	timer = setInterval('decrementTime()', 1000);
}
function decrementTime(){
	seconds--;
	if(outOfTime()){
		greyOutTiles();
		clearInterval(timer);
        showReplayButton();
        sendHighScore();
	}
	updateTimer();
}

function setTimer(num){
	seconds = num;
	current_time = seconds;

	updateTimer();
}

function addTime(num){
	seconds += num;
	updateTimer();	
}

function outOfTime(){
	if(seconds > 0){
		return false;
	}
	return true;
}
function updateTimer(){
	$('#timer').html(seconds);
}