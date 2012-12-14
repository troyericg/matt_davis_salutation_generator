<!--- hide script from old browsers


window.onload = function() { 
	init();
};

var public_spreadsheet_url = 'https://docs.google.com/spreadsheet/pub?key=0Ang1OfZPG6vydC1leThCMTJyTEktMUM1M3Y2djgwbHc&output=html';
var theEmails = [];
var alphaBet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");


function init() {
	Tabletop.init( { key: public_spreadsheet_url,
	callback: useData,
	simpleSheet: true } )
}

//Call back for the Tabletop function
function useData(data, tabletop) {
	theEmails = data;
	addDates(data);
	pickOne(data);
	addNumToAlpha(ListFirstLetters(data));
}


//Adds dates to list of dates
function addDates(data){
	for(i=0;i<data.length;i++) {
		$('<li></li>').html(data[i].date).attr('relGreet', data[i].salutation).addClass('unselectable').appendTo('#dateHolder ul');
	}
	dateDisplayUpdate();
}

//Random greeting generator
function pickOne(data) {
	var singleSalutation = data[Math.floor(Math.random()*data.length)];
	
	if (singleSalutation.salutation == "N/A") {
		singleSalutation.salutation = "[ No Greeting ]";
	}
	$('#salutationSpace').html(singleSalutation.salutation);
	$('#salutationDate p').html(singleSalutation.date);
	$('#dateHolder li:contains(\''+ singleSalutation.date + '\')').addClass('current');
}


//Randomly selects a new greeting on click:
$(document).ready(function(){
	$('#salutationContainer').click(function(){
		$('#dateHolder li').removeClass('current');
		pickOne(theEmails);
	});
});



//HARDWARE: Generates alphabet 
$(document).ready(function(){
	$.each(alphaBet,function(i, value){
		$('<p></p>').html(value).addClass('unselectable').attr({'data-alpha': alphaBet[i], 'data-count': 0}).appendTo('#alphaHolder');
	});
	
});


//Display number of greetings on hover
$(document).ready(function(){
	$('#alphaHolder p').hover(function(){
		var alph = $(this); 
		var yPos = alph.offset().top; 
		var xPos = alph.offset().left;
		
		$('div .tooltip').css({'left': xPos - 10, 'top': yPos - 30}).html(alph.attr('data-count')).toggle();
	}, function() {
		$('div .tooltip').toggle();
	});
});


//Updates display according to date clicked
var dateDisplayUpdate = function() {
	$(document).ready(function(){
		$('#dateHolder li').click(function(){
			var currDate = $(this);
			
			if (currDate.attr('relGreet') == "N/A") {
				$('#salutationSpace').html('[ No Greeting ]');
			} else {
				$('#salutationSpace').html(currDate.attr('relGreet'));
			}
			$('#salutationDate p').html(currDate.text());
			$('#dateHolder li').removeClass('current');
			currDate.addClass('current');
		});
	});
};



//1: two part process that adds number of greetings to the letters of the alphabet 
function ListFirstLetters(data) {
	var lettersArray = [];
	var firstLetter;
	
	for(i=0;i<data.length;i++) {
		firstLetter = data[i].salutation.charAt(0).toUpperCase();
		lettersArray.push(firstLetter);
	}
	return lettersArray;
}

//2: two part process that adds number of greetings to the letters of the alphabet 
function addNumToAlpha(list) {
	//console.log(list);
	var oneLetter = "C";
	var letters = list.sort().join(",");
	
	for(i=0;i<list.length || i<alphaBet.length;i++) {
		var currentLetter;
		if ($('#alphaHolder [data-alpha=' + list[i] + ']')) {
			$('#alphaHolder [data-alpha=' + list[i] + ']')
			.addClass('containsGreeting')
			.attr('data-count', letters.count(list[i]));
		}
	}
}

















// !!IMPORTANT!! UPDATES 'STRING' PROTOTYPE TO INCLUDE A FUNCTION FOR COUNTING LETTERS!!
String.prototype.count=function(s1) { 
    return (this.length - this.replace(new RegExp(s1,"g"), '').length) / s1.length;
}


// stop hiding script -->