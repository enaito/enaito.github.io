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
	$("td:nth-child(" + pNum + ")").each(function(i) {
		$(this).removeClass("potential");
		if ($(this).parent().hasClass("total")) {
			$(this).html(sum);
			$(this).addClass("permanent");
		}
		else {
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
			console.log(dice);
	var p1turn = true;
	var numRolls = 0;
	var potenScores = Array(15);
	var p1Scores = Array(15).fill(0);
	var p2Scores = Array(15).fill(0);


	$("#roll").click(function() {
		if (numRolls < totalRolls) {
			numRolls++;
			rollDice(dice);
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
		// save score appropriately
		var i = ($(this).attr('id'));
		if (p1turn) {
			p1Scores[i] = potenScores[i];
			displayScore(p1Scores, 2, i);
		}
		else {
			p2Scores[i] = potenScores[i];
			displayScore(p2Scores, 3, i);
		}
		resetDice(dice);
		p1turn = changePlayer(p1turn);
		numRolls = 0;
		$("#roll").removeClass("disable");
	});
});