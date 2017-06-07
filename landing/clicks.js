$(document).ready(function() {
	// Update this link every day
	$("#announcements").click(function() {
		location.href = "http://google.com";
	});

	// Update this link every day
	$("#atlas").click(function() {
		location.href = "http://google.com";
	});

	// Update this variable to have the text for the last box. If you want a line break, use "\n"
	var newHeader = "Joke of the Day:"
	var newContent= "Why don't kleptomaniacs understand puns?\n\nBecause they take everything literally!"

	// Update this link once a week
	$("#tripDescriptions").click(function() {
		location.href = "http://google.com";
	});

	staticLinks(newHeader, newContent);
});

function staticLinks(newHeader, newContent) {
	$("#tripSignUps").click(function() {
		location.href = "http://google.com";
	});
	$("#badgeForm").click(function() {
		location.href = "http://google.com";
	});
	$("#mainEventDescriptions").click(function() {
		location.href = "http://google.com";
	});
	var header = document.createTextNode(newHeader);
	var content = document.createTextNode(newContent);
	document.getElementById("header").innerText = header.textContent;
	document.getElementById("content").innerText = content.textContent;
}