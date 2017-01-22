var currentNumber = 0;
var arrayNumber = [];
var arrayAct = [];

$(document).ready(function(){


	$( ".num-button" ).click(function() {
		toPrint = numberClicked($(this).attr("id"));
		printToDisplay(toPrint);
	});

	$( ".act-button" ).click(function() {
		toPrint = actClicked($(this).attr("id"));
		printToDisplay(toPrint);
	});



});

function action(operator) {
	console.log("action run");
	this.operator = operator;
    this.act = function (a, b) {
        console.log("act run");
		switch (this.operator) {
			case "+":
				return a + b;
			case "-":
				return a - b;
			case "*":
				return a * b;
			case "/":
				return a / b;
		};
    };
}


function numberClicked(chr) {
	console.log(chr);
	currentNumber = currentNumber * 10 + Number(chr);
	return currentNumber;
}

function actClicked(chr) {
	arrayNumber.push(currentNumber);
	console.log("pushed: " + currentNumber);
	currentNumber = 0;
	switch (chr) {
		case '=':
			var Act = new action(arrayAct[0]);
			return Act.act(arrayNumber[0],arrayNumber[1]);
		default:
			arrayAct.push(chr);

	}

}


function printToDisplay(str) {
	$("#display").text(str);
}


