/*
loader.js
variable 'app' is in global scope - i.e. a property of window.
app is our single global object literal - all other functions and properties of 
the game will be properties of app.
*/
"use strict";

// if app exists use the existing copy
// else create a new object literal
var app = app || {};

//constants
app.KEYBOARD = {
	"KEY_LEFT": 37,
	"KEY_RIGHT": 39,
	"KEY_SPACE": 32,
	"KEY_UP": 38,
}

app.keydown = [];
app.keyup = [];

app.IMAGES = {
	instrImage: "images/Instructions.png",
	titleImage: "images/TitleScreen.png",
	boxImage: "images/Box.png",
	walkImage: "images/ObleWalkingAnimation.png",
	jumpImage: "images/ObleJumpingAnimation.png",
	rwalkImage: "images/RObleWalkingAnimation.png",
	rjumpImage: "images/RObleJumpingAnimation.png",
	rholdImage: "images/RHoldAnimation.png",
	holdImage: "images/HoldAnimation.png",
	winImage: "images/WinScreen.png",
	keyImage: "images/key.png",
	backGroundImage: "images/ObleBackground2.png"
};

window.onload = function(){
	//console.log("window.onload called");
	//sandbox section
	app.oble.app = app;
	app.oble.init();
	var i = 0
	
	window.addEventListener("keydown", function(e){
		//console.log("keydown=" + e.keyCode);
		app.keydown[e.keyCode] = true;
		app.keyup[e.keyCode] = false;
	});
	
	window.addEventListener("keyup", function(e){
		//console.log("keyup=" + e.keyCode);
		app.keydown[e.keyCode] = false;
		app.keyup[e.keyCode] = true;
		if(e.keyCode == '32') { app.oble.cycle();}
		//if(e.charCode == '33') console.log("press !!!!");
	});
	
	app.queue = new createjs.LoadQueue(false);
	app.queue.installPlugin(createjs.Sound);
	app.queue.on("complete", function(){
		//console.log("images loaded called");
	});
	
	app.queue.loadManifest([
		{id: "walkImage", src:"images/ObleWalkingAnimation.png"},
		{id: "jumpImage", src:"images/ObleJumpingAnimation.png"},
		{id: "holdImage", src:"images/HoldAnimation.png"},
		{id: "rholdImage", src:"images/RHoldAnimation.png"},
		{id: "rwalkImage", src:"images/RObleWalkingAnimation.png"},
		{id: "rjumpImage", src:"images/RObleJumpingAnimation.png"},
		{id: "instrImage", src:"images/Instructions.png"},
		{id: "titleImage", src:"images/TitleScreen.png"},
		{id: "boxImage", src:"images/Box.png"},
		{id: "winImage", src:"images/WinScreen.png"},
		{id: "keyImage", src:"images/key.png"},
		{id: "backGroundImage", src:"images/ObleBackground2.png"},
	]);

	
}