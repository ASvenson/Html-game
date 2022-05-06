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

app.IMAGES = {
	instrImage: "images/Instructions.jpeg",
	titleImage: "images/TitleScreen.jpeg"
};

app.keydown = [];


window.onload = function(){
	console.log("window.onload called");
	//sandbox section
	app.oble.app = app;
	app.oble.init();
	
	
	/* app.queue = new createjs.LoadQueue(false);
	app.queue.installPlugin(createjs.Sound);
	app.queue.on("complete", function(){
		console.log("images loaded called");
		app.blastem.init(app.ship);
	}); */
	
	/* app.queue.loadManifest([
		{id: "instrImage", src:"images/Instructions.jpeg"},
		{id: "titleImage", src:"images/TitleScreen.jpeg"},
	]); */

	
}