function rollDice(dice) {
	$.each(dice, function() {
		if(! $(this).hasClass("dieClicked")) {
			this.innerText = Math.ceil(Math.random() * 6);
		}
	})
}

$(document).ready(function(){
	var dice = document.getElementsByClassName('die');

	$("#roll").click(function() {
		rollDice(dice);
	});
	
	$("#reset").click(function() {
		$.each(dice, function() {
			this.innerText = '';
			$(this).removeClass('dieClicked');
		});
	});

	$(".die").click(function() {
		if(this.innerText != '') {
			$(this).toggleClass('dieClicked');
		}
	});
});