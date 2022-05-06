app.level = function(){

	function level(ctx, startX, startY,win, keys, plats){
		//console.log("made level");
		
		this.win = win;
		this.plats = plats;
		this.ctx = ctx;
		this.startX = startX;
		this.startY = startY;
		app.oble.obleX = startX;
		app.oble.obleX = startY;
		this.levels = undefined;
		this.keys = keys;
		this.anim = app.oble.jumpAnim;
		this.countTicker = 0;
		this.down = false;
		this.up = false;
	};
	
	var lvl = level.prototype;
	
	lvl.travel = function(){
		if(app.oble.sx >= 144 * app.oble.frames){
		//			console.log("what");
					app.oble.sx = 0;
		} else {
			if(app.oble.tickCount >= 2){
				app.oble.tickCount = 0;
				app.oble.sx += 144;
			} else {
				app.oble.tickCount++
			}
		//	console.log(app.oble.sx);
		}
	}
	lvl.moveSprites = function(){
		if(app.keydown[app.KEYBOARD.KEY_LEFT]){
				if (app.oble.velX > -app.oble.speed) {             
					app.oble.velX--; 
					app.oble.dir = -1;
					if(!app.oble.canCarry){
						this.anim = app.oble.rholdAnim;
						app.oble.frames=7;
					} else if(!app.oble.jumping){
						this.anim = app.oble.rwalkAnim;
						app.oble.frames = 9;
					} else {
						this.anim = app.oble.rjumpAnim;
						app.oble.frames = 7;}
					
					this.travel();
				}  
			} else
		if(app.keydown[app.KEYBOARD.KEY_RIGHT]){
			if (app.oble.velX < app.oble.speed) {
				//console.log(app.oble.obleX);
				app.oble.velX++;  
				app.oble.dir = 1;
				if(!app.oble.canCarry){
					console.log("ping");
					this.anim = app.oble.holdAnim;
					app.oble.frames = 7;
				
				} else if(!app.oble.jumping){
					this.anim = app.oble.walkAnim;
					app.oble.frames = 9;
				} else {
					this.anim = app.oble.jumpAnim;
					app.oble.frames = 7;
				}
				
				this.travel();
				
			}
			
		} else { 
			if(app.oble.jumping){
				this.travel();
			} else {
			app.oble.tickCount = 0;
			app.oble.sx = 0;
			}
		}
		//app.oble.tickCount=0;
		//app.oble.sx=0;
		if(app.keydown[app.KEYBOARD.KEY_UP]){
			//console.log("JUMP");
			if(!app.oble.jumping){
				app.oble.jumping = true;
				app.oble.falling = true;
				app.oble.velY = -app.oble.speed*4.2;
			}
			if(app.oble.canCarry){
				if(app.oble.dir>0){
					this.anim = app.oble.jumpAnim;
				} else {
					this.anim = app.oble.rjumpAnim;
				}
				app.oble.frames = 7;
			}
		}
		
		if(app.keydown[app.KEYBOARD.KEY_SPACE]){
				this.down = true;
			}
			
		if(this.down && app.keyup[app.KEYBOARD.KEY_SPACE]){
			this.down = false;
			var finalBlock = new app.platform(0, 0, 0, 10000);
			finalBlock.movable = true;
			
			for(var i=0; i<this.plats.length; i++){
				if(this.plats[i].carried == true){
					if(this.plats[i].downBlock(this.plats)){
						this.plats[i].carried = false;
						if(app.oble.dir < 1){this.anim = app.oble.rwalkAnim;} else{this.anim = app.oble.walkAnim;}
						//console.log("putting down")
					}
					break;
				}else if(this.plats[i].movable == true){
					if(this.plats[i].close() && app.oble.canCarry == true){
						//console.log("going to be picking up");
						if(app.oble.dir < 1){this.anim = app.oble.rholdAnim;} else{this.anim = app.oble.holdAnim;}
						if(this.plats[i].y2 < finalBlock.y2 //&& 
							// this.plats.y2 > app.oble.obleY+app.oble.obleHeight-340
							){
							//console.log("picking up");
							finalBlock = this.plats[i];
						}
					} else {//console.log("not close");
					
					}
				}
			}
			if(finalBlock.y2 != 10000){
				finalBlock.carried = true;
				app.oble.canCarry = false;
			}
		}
			
		
		for(var i=0; i<this.plats.length; i++){
			if(this.plats[i].carried == true){
				this.plats[i].moveBlock();
			}
		}
		//moving platforms
		for(var i=0; i<this.plats.length; i++){
			//console.log("checked plat " + i);
			if(this.plats[i].moving == true){
				this.plats[i].checkMove();
				
				this.plats[i].x1 += this.plats[i].velX; 
				this.plats[i].x2 = this.plats[i].x1 + this.plats[i].width; 
				
				this.plats[i].y1 += this.plats[i].velY; 
				this.plats[i].y2 = this.plats[i].y1 + this.plats[i].height; 
		
			}
		}
		
		//move character
		app.oble.velX *= app.oble.friction;
		if(app.oble.falling){
			app.oble.velY += app.oble.gravity;
		}
		
		app.oble.obleX = app.oble.obleX + app.oble.velX;
		app.oble.obleY = app.oble.obleY + app.oble.velY;
		
		if (app.oble.obleX >= app.oble.WIDTH-app.oble.obleWidth) {
			app.oble.obleX = app.oble.WIDTH-app.oble.obleWidth;
		} else if (app.oble.obleX <= 0) {         
			app.oble.obleX= 0;     
		}
	  
		if(app.oble.obleY >= app.oble.HEIGHT-app.oble.obleHeight){
			//app.oble.obleY = app.oble.HEIGHT - app.oble.obleHeight;
			app.oble.falling = false;
			app.oble.jumping = false;
			app.oble.velY = 0;
		} else {
			app.oble.falling = true;
		}
		
		this.checkCollisions();
	}
	
	lvl.checkCollisions = function(){
		for(var i=0; i<this.plats.length; i++){
			//var currPlat = this.plats[i];
			//console.log("checking for landing");
			if(this.plats[i].landBlock(app.oble.velX, app.oble.velY, app.oble.obleX, app.oble.obleY, 
					app.oble.obleX+app.oble.obleWidth, app.oble.obleY+app.oble.obleHeight)){
				//console.log("landing");
				app.oble.falling = false;
				app.oble.jumping = false;
				app.oble.velY = 0;
				app.oble.obleY = this.plats[i].y1 - app.oble.obleHeight;
			}
			
			if(this.plats[i].upBlock(app.oble.velX, app.oble.velY, app.oble.obleX, app.oble.obleY, 
					app.oble.obleX+app.oble.obleWidth, app.oble.obleY+app.oble.obleHeight)){
				console.log("upblock");
				app.oble.velY = 0;
				app.oble.falling = true;
				app.oble.obleY = this.plats[i].y2;
			}
			
			if(this.plats[i].leftBlock(app.oble.velX, app.oble.velY, app.oble.obleX, app.oble.obleY, 
					app.oble.obleX+app.oble.obleWidth, app.oble.obleY+app.oble.obleHeight)){
				//console.log("block to the left")
				//console.log("left");
				app.oble.velX= 0;
				app.oble.obleX = this.plats[i].x2+.1;
			}
			
			if(this.plats[i].rightBlock(app.oble.velX, app.oble.velY, app.oble.obleX, app.oble.obleY, 
					app.oble.obleX+app.oble.obleWidth, app.oble.obleY+app.oble.obleHeight)){
				//console.log("block to the right")
				//console.log("left");
				app.oble.velX= 0;
				app.oble.obleX = this.plats[i].x1-app.oble.obleWidth-.1;
			}
		};
	};
	
	lvl.drawSprites = function(){
		var image = new Image();
		image.src = app.IMAGES['backGroundImage'];
		app.oble.ctx.drawImage(image,0,0);
		    
		//this.ctx.fillStyle = "pink";
		for(var i=0; i<this.plats.length; i++){
			//console.log("drawing");
			this.plats[i].draw(this.ctx);
		};
		
		this.ctx.fillStyle = 'yellow';
		for(var i=0; i<this.keys.length; i++){
			//console.log("drawing");
			this.keys[i].draw();
		};
		
		this.ctx.fillStyle = 'blue';
		//this.ctx.fillRect(this.win.x-this.win.w/2,this.win.y-this.win.height/2,this.win.w,this.win.h);
		//this.ctx.fillRect(this.win.x,this.win.y, this.win.w, this.win.h);
		
		
		//console.log("draw char");
		app.oble.ctx.drawImage(this.anim, app.oble.sx , 0, 144, 180-5, app.oble.obleX, app.oble.obleY, 144, 180)
		// this.ctx.fillStyle = "red";
		// this.ctx.fillRect(app.oble.obleX, app.oble.obleY, app.oble.obleWidth, app.oble.obleHeight);
		//loop
	};
	
	
	lvl.checkWin = function(){
		if((app.oble.obleX >= this.win.x-app.oble.obleWidth) && 
			(app.oble.obleX <= this.win.x+this.win.w) &&
			(app.oble.obleY >= this.win.y-app.oble.obleHeight) &&
			(app.oble.obleY <= this.win.y+this.win.h)){
			
			for(var i=0; i<this.keys.length; i++){
				//console.log("checking for win");
				if(!this.keys[i].state){
					return false;
				}
			};
			return true;
		} else { return false; }
	};
	
	lvl.update = function(){
		
		
		if(app.oble.dead == true){
			//console.log("rerun");
			this.runLevel(levels);
		};
		
	
		//clear screen
		this.ctx.clearRect(0,0,640*2,460*2);
		//console.log("cleared");
		
		//UPDATE
		// move sprites
		this.moveSprites();
		
		
		//Draw
		this.drawSprites();
		//console.log("drawn");
		
		//check for collisions
		//this.checkForCollisions();
		
		//LOOP
		var win = false;
		
		if(app.keydown[114]){location.reload()}
		
		
		if(this.checkWin()){
			console.log("winning");
			var currLevel = this.levels.pop();
			if(this.levels.length == 0){
					var image = new Image();
					image.src = app.IMAGES['winImage'];
					app.oble.ctx.drawImage(image,0,0);
					if(app.keydown[app.KEYBOARD.KEY_SPACE]){
						location.reload();
					}
					requestAnimationFrame(this.update.bind(this));
			} else {
				currLevel.runLevel(this.levels);
			}
		} else {
			requestAnimationFrame(this.update.bind(this));
		}
	};
	
	lvl.runLevel = function(levels){
			//console.log("running level");
			this.levels = levels;
			app.oble.obleX = this.startX;
			app.oble.obleY = this.startY;
			this.update();
	};
	 
	return level;
}();