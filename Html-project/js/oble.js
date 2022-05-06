// oble.js
// Dependencies: 
// Description: singleton object
// This object will be our main "controller" class and will contain references
// to most of the other objects in the game.

"use strict";

// if app exists use the existing copy
// else create a new object literal
var app = app || {};



app.oble = {
	// CONSTANT properties
    WIDTH : 1280, 
    HEIGHT: 920,
	
    canvas: undefined,
    ctx: undefined,
	app:undefined,
	obleImage: undefined,
	
	oneKeys : [],
	twoKeys : [],
	
	oneBlocks : [],
	
	levels: [],
	
	lvlOnePlats: [],
	lvlTwoPlats: [],
	
	
	obleWidth : 144-30,
	obleHeight : 180-5,
	// drawX: 0
	// drawY: 430
	obleX : 0,
	obleY : 430,
	velX: 0,
	velY: 0,
	dir: 1,
	speed: 3,
	friction : 0.8,
    gravity : 0.4,
	falling: false,
	iter: 0,
	dead: false,
	sx: 0,
	tickCount: 0,
	frames: 7,
	jumping : true,
	canCarry : true,
	
	walkAnim : new Image(),
	jumpAnim: new Image(),
	rwalkAnim : new Image(),
	rjumpAnim: new Image(),
	rholdAnim : new Image(),
	holdAnim: new Image(),
	boxImage: new Image(),
	keyImage: new Image(),
	
    
    // methods
	
	init: function(){
		
		this.walkAnim.src = app.IMAGES['walkImage'];
		this.jumpAnim.src = app.IMAGES['jumpImage'];
		this.rwalkAnim.src = app.IMAGES['rwalkImage'];
		this.rjumpAnim.src = app.IMAGES['rjumpImage'];
		this.rholdAnim.src = app.IMAGES['rholdImage'];
		this.holdAnim.src = app.IMAGES['holdImage'];
		this.boxImage.src = app.IMAGES['boxImage'];
		this.keyImage.src = app.IMAGES['keyImage'];
		
		//console.log("app.oble.init() called");
		// declare properties
		this.canvas = document.querySelector('canvas');
		this.canvas.width = this.WIDTH;
		this.canvas.height = this.HEIGHT;
		this.ctx = this.canvas.getContext('2d');
		
		this.lvlOnePlats.push(new app.platform(185, 485, 240, 10));
		this.lvlOnePlats.push(new app.platform(845, 485, 240, 10));
		this.lvlOnePlats.push(new app.platform(0, 880, this.WIDTH, 50));
		
		var movPlat1 = new app.platform(0, 709, 170, 170);
		movPlat1.movable = true;
		this.lvlOnePlats.push(movPlat1);
		
		var movPlat2 = new app.platform(175, 709, 170, 170);
		movPlat2.movable = true;
		this.lvlOnePlats.push(movPlat2);
		
		var movPlat3 = new app.platform(400, 709, 170, 170);
		movPlat3.movable = true;
		this.lvlOnePlats.push(movPlat3);
		
		this.oneKeys.push(new app.key(960, 450));
		this.oneKeys.push(new app.key(300, 450));
		//this.oneKeys.push(new app.key(200, 880));
		//this.oneKeys.push(new app.key(250, 860));
		
		this.levels.push(new app.level(this.ctx,600,0,new app.win(505,275,280,575),this.oneKeys, this.lvlOnePlats));
		
		//this.lvlTwoPlats.push(new app.platform(0, 0, this.WIDTH, 300));
		//this.lvlTwoPlats.push(new app.platform(0, 600, this.WIDTH, 400));
		// this.lvlTwoPlats.push(new app.platform(0, 500, 300, 10));
		//this.levels.push(new app.level(this.ctx,400,400, new app.win(500,200,300,700), this.twoKeys, this.lvlTwoPlats));
		
		//console.log(this.levels.length);
		
 		
		this.run();
		
	},
	/* fillPlats: function(plats){
		console.log("going to fill the platforms array");
		//this.plats.push(new app.platform(100, 380, 90, 20));
		//this.plats.push(new app.platform(220, 280, 90, 20));
		var plat1 = new app.platform(40, 420, 90, 20);
		//plat1.move(2,0,200,0);
		plats.push(plat1);
		//this.plats.push(new app.platform(210, 160, 150, 20));
		//this.plats.push(new app.platform(360, 100, 90, 20));
		
		return plats;
	}, */
	
	runTitle: function(){
		//ctx = this.ctx;
		// this.ctx.fillStyle = 'red';
		// this.ctx.fillRect(0,0,40,40);
		
		// this.ctx.font="40px Verdana";
		// this.ctx.fillText("title:press space", 200,this.HEIGHT/4);
		
		var img = new Image();
		img.src = "images/TitleScreen.png";
		img.onload = function(){
			
			app.oble.ctx.drawImage(img,0,0);
		};
		
	},
	
	instr: function(){
	
		
		//console.log("going to print instructions");
	/* 	this.ctx.clearRect(0,0,this.WIDTH,this.HEIGHT);
		
		this.ctx.fillText("instructions:press space", 200,this.HEIGHT/4); */
		
		var img = new Image();
		img.src = "images/Instructions.png";
		img.onload = function(){
		
			app.oble.ctx.drawImage(img,0,0);
		};
		
		/* //event listeners
		window.addEventListener("keydown", function(e)){
			app.keydown[e.keyCode] = true;
			//console.log(app.keydown[e.keyCode]);
			
			if(app.keydown[this.app.KEYBOARD.KEY_SPACE]){
				console.log("going to game");
				app.oble.runGame();
			}
		});
		
		window.addEventListener("keyup", function(e)){
			app.keydown[e.keyCode] = false;
			//console.log(app.keydown[e.keyCode]);
		}; */
	},

	runGame: function(){
		//window.removeEventListener("keydown", );
		//console.log("remove event listener");
		//console.log("run game");
		var lvl = this.levels[0];
		lvl.runLevel(this.levels);
	},
	
	cycle: function(e){
		if(this.iter==0){
			this.instr();
			this.iter++;
		} else if(this.iter == 1){
			this.runGame();
			this.iter++;
		}
	},
	
	
	run: function(){
		//console.log("app.oble.run() called");
		
		app.oble.runTitle();
		
		if(this.app.keydown[this.app.KEYBOARD.KEY_SPACE]){
			this.instr();
		}
		
		//event listeners
		//window.addEventListener("keydown", app.oble.cycle);
		
		//app.oble.runGame();
		
	}
}; // end app.blastem