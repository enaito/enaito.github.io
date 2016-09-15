function setScore(score, dice) {
	var d = Array();
	var sum = 0;
	score.fill(0);
	$.each(dice, function(i, val) {
		d.push(parseInt(this.innerText));
		score[d[i]-1] += d[i];
		sum += d[i];
	});

	score[13] = sum;
	if (d[0] == d[4]) {
		score[7] = sum;
		score[8] = sum;
		score[12] = 50;
	}
	else if (d[0] == d[3] || d[1] == d[4]) {
		score[7] = sum;
		score[8] = sum;
	}
	else if(d[0] == d[2] || d[1] == d[3] || d[2] == d[4]) {
		score[7] = sum;
		if ( (d[0] == d[1] && d[1] != d[2]) || (d[2] != d[3] && d[3] == d[4]) ) {
			score[9] = 25;
		}
	}
	else if (d[1] + 1 == d[2] && d[2] + 1 == d[3] ) {
		if (d[0] + 1 == d[1]) {
			score[10] = 30;
			if (d[3] + 1 == d[4]) {
				score[11] = 40;
			}
		}
		else if (d[3] + 1 == d[4]) {
			score[10] = 30;
		}
	}
}
					
					
		