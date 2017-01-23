var currentNumber = 0;
var arrayNumber = [];
var arrayAct = [];
var displayStr = "";
var onlyAct = false;
var decimal = false;

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
	//console.log("action run");
	this.operator = operator;
    this.act = function (a, b) {
        //console.log("act run");
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
	SubdisplayRefresh();
}

function clearSubdisplay() {
	displayStr = "";
	SubdisplayRefresh();
}

function deleteLastNumberSubdisplay(){
	console.log(displayStr);
	var arr = displayStr.split("");
	var leng = arr.length;
	var r = false;
	for(var i = 0; i < leng; i++) {
		var temp = arr.pop();
		console.log(arr);
		console.log(temp);
		if (!( temp >= '0' && temp <= '9')) {
			console.log("runrun run");
			arr.push(temp);
			displayStr = arr.join("");
			console.log(displayStr);
			SubdisplayRefresh();
			return r; 
		}
		r = true;
	}
}

function SubdisplayRefresh() {
	$("#subDisplay").text(displayStr);
}

function numberClicked(chr) {
	if (currentNumber == 0 && chr == "0") {
		return 0;
	} else if (onlyAct) {
		onlyAct = false;
		currentNumber = Number(chr);
		clearSubdisplay();
		addToSubdisplay(chr);
		return currentNumber;
	} else if (chr == "." && decimal == false) {
		decimal = true;
		addToSubdisplay(chr);
		//console.log(getDecimalFractions(5.145));
	} else {
		if (decimal == false) {
			//console.log(chr);
			currentNumber = currentNumber * 10 + Number(chr);
			addToSubdisplay(chr);
			return currentNumber;
		} else {
			console.log("decimal number " + Math.pow(0.1, getDecimalFractions(currentNumber)+1));
			currentNumber += Number(chr) * Math.pow(0.1, getDecimalFractions(currentNumber)+1);
			addToSubdisplay(chr);
			return currentNumber;
		}
	}
}

function getDecimalFractions(number) {
	console.log(number);
	for(var i = 0; i < 10; i++) {
		if (number % 1 == 0) {
			return i
		}
		number *= 10;
	}
};

function actClicked(chr) {
	//console.log(onlyAct);
	arrayNumber.push(currentNumber);
	//console.log("pushed: " + currentNumber);
	switch (chr) {
		case '=':
			if (onlyAct==true) {
				arrayNumber.pop();
				clearSubdisplay();
				addToSubdisplay(currentNumber);
				return currentNumber;
			};
			addToSubdisplay(chr);
			//console.log("act: " +arrayAct[0]);
			//console.log("a: " + arrayNumber[0] + "  b: " + arrayNumber[1]);i
			calculate();
			arrayNumber = [];
			arrayAct = [];
			console.log(arrayNumber);
			onlyAct = true;
			return currentNumber;
		case 'a':
			clearSubdisplay();
			onlyAct = false;
			currentNumber = 0;
			arrayNumber = [];
			arrayAct = [];
			return 0;
		case 'c':
			onlyAct = false;
			if (deleteLastNumberSubdisplay() == true) {
				arrayNumber.pop();
			};
			currentNumber = 0;
			return 0;
		default:
			addToSubdisplay(chr);
			currentNumber = 0;
			decimal = false;
			onlyAct = false;
			arrayAct.push(chr);
	}

}

function calculate(){
			for(var i = 0; i < arrayNumber.length-1; i++){
				console.log(arrayNumber);
				console.log(arrayAct);
				if (arrayAct[i] == '*' || arrayAct[i] == '/') {
					var Act = new action(arrayAct[i]);
					currentNumber = Act.act(arrayNumber[i],arrayNumber[i+1]);
					arrayNumber.splice(i, 2, currentNumber);
					arrayAct.splice(i,1);
					i--;
				}
			}
			for(var i = 0; i < arrayNumber.length-1; i++){
				console.log(arrayNumber);
				console.log(arrayAct);
				var Act = new action(arrayAct[i]);
				currentNumber = Act.act(arrayNumber[i],arrayNumber[i+1]);
				arrayNumber.splice(i, 2, currentNumber);
				arrayAct.splice(i,1);
				i--;
			}
}

function printToDisplay(str) {
	$("#display").text(str);
}


