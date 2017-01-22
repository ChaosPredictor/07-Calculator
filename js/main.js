var currentNumber = 0;
var arrayNumber = [];
var arrayAct = [];
var displayStr = "";

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

function addToSubdisplay(chr) {
	displayStr += chr;
	$("#subDisplay").text(displayStr);
}

function numberClicked(chr) {
	if (currentNumber == 0 && chr == "0") {
		return 0;
	} else {
		console.log(chr);
		currentNumber = currentNumber * 10 + Number(chr);
		addToSubdisplay(chr);
		return currentNumber;
	}
}

function actClicked(chr) {
	addToSubdisplay(chr);
	arrayNumber.push(currentNumber);
	console.log("pushed: " + currentNumber);
	currentNumber = 0;
	switch (chr) {
		case '=':
			var Act = new action(arrayAct[0]);
			currentNumber = Act.act(arrayNumber[0],arrayNumber[1]);
			arrayNumber = [];
			arrayAct = [];
			return currentNumber;
		case 'a':
			currentNumber = 0;
			arrayNumber = [];
			arrayAct = [];
			return 0;
		case 'c':
			currentNumber = 0;
			return 0;
		default:
			arrayAct.push(chr);
	}

}


function printToDisplay(str) {
	$("#display").text(str);
}


