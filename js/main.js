$(document).ready(function(){


	$( ".num-button" ).click(function() {
		printToDisplay($(this).attr('id'));
	});

	document.getElementById("refresh").addEventListener("click", function(){
	});

});

function printToDisplay(str) {
	$("#display").text(str);
}
