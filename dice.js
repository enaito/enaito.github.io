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

function displayPotenScores(scores, pNum) {
	$("td:nth-child(" + pNum + ")").each(function(i) {
		if (! ($(this).hasClass("total") || $(this).hasClass("permanent"))) {
			$(this).html(scores[i]);
			$(this).addClass("potential");	
		}
	});
}

function displayScore(scores, pNum, clicked) {
	var sum = 0;
	console.log("clicked is " + clicked);
	$("td:nth-child(" + pNum + ")").each(function(i) {
		console.log(this);
		$(this).removeClass("potential");

		// TODO: should ony do first if when greater than 63; 
		// should add that to the total (aka should only do first or second, second or third, or just third)
		// also should be able to have bonus as an ID, not as a class

		if ($(this).parent().hasClass("bonus") && sum >= 63) {
			sum += 35;
		 	$(this).html(35);
		 	scores[i] = 35;
		 	$(this).addClass("permanent");
		}
		else if ($(this).parent().hasClass("total")) {
			scores[i] = sum;
			$(this).html(sum);
			$(this).addClass("permanent");
		}
		else {
			console.log("i is " + i);
			sum += scores[i];
			if (! $(this).hasClass('permanent')) {
				if (i == clicked) {
					$(this).html(scores[i]);
					$(this).addClass("permanent");
				}
				else {
					$(this).html('');
				}
			}
		}
	});
}

$(document).ready(function(){
	var dice = document.getElementsByClassName('die');
	dice = $.makeArray(dice);
	var p1turn = true;
	var diceShowing = false;
	var numRolls = 0;
	var potenScores = Array(16);
	var p1Scores = Array(16).fill(0);
	var p2Scores = Array(16).fill(0);


	$("#roll").click(function() {
		if (numRolls < totalRolls) {
			numRolls++;
			rollDice(dice);
			diceShowing = true;
			dice.sort(function(a, b) {
				return a.innerText - b.innerText;
			});
			if (numRolls == totalRolls) {
				$("#roll").addClass("disable");
			}
		}
		setScore(potenScores.fill(0), dice);
		if (p1turn) {
			displayPotenScores(potenScores, 2);
		}
		else {
			displayPotenScores(potenScores, 3);
		}
	});

	$(".die").click(function() {
		if(this.innerText != '') {
			$(this).toggleClass('dieClicked');
		}
	});

	$("tr").click(function() {
		if (diceShowing) {
			// save score appropriately
			var i = ($(this).attr('id'));
			if (p1turn) {
				p1Scores[i] = potenScores[i];
				displayScore(p1Scores, 2, i);
				console.log(p1Scores);
			}
			else {
				p2Scores[i] = potenScores[i];
				console.log(p2Scores);
				displayScore(p2Scores, 3, i);
			}
			resetDice(dice);
			diceShowing = false;
			p1turn = changePlayer(p1turn);
			numRolls = 0;
			$("#roll").removeClass("disable");
		}
	});
});