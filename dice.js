var totalRolls = 3;

function rollDice(dice) {
	$.each(dice, function() {
		if(! $(this).hasClass("dieClicked")) {
			this.innerText = Math.ceil(Math.random() * 6);
		}
	})
}

function resetDice(dice) {
	$.each(dice, function() {
		this.innerText = '';
		$(this).removeClass('dieClicked');
	});
}

function changePlayer(p1turn) {
	var players = document.getElementsByClassName('player');
	$.each(players, function() {
		$(this).toggleClass('myTurn');
	});
	return !p1turn;
}

$(document).ready(function(){
	var dice = document.getElementsByClassName('die');
	var p1turn = true;
	var numRolls = 0;

	$("#roll").click(function() {
		if (numRolls < totalRolls) {
			numRolls++;
			console.log(numRolls);
			console.log(p1turn);
			rollDice(dice);
		}
		else {
			console.log("here");
			$("#roll").addClass("disable");
			console.log(document.getElementsByClassName('disable'));
		}
	});
	
	$("#reset").click(function() {
		resetDice(dice);
	});

	$(".die").click(function() {
		if(this.innerText != '') {
			$(this).toggleClass('dieClicked');
		}
	});

	$("tr").click(function() {
		// save score appropriately
		console.log(this);
		resetDice(dice);
		p1turn = changePlayer(p1turn);
		numRolls = 0;
		$("#roll").removeClass("disable");
	});
});