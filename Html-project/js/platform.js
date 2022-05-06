app.platform = function(){

	function platform(x1, y1, width, height){
		//console.log("made platform");
		this.x1 = x1;
		this.y1 = y1;
		this.width = width;
		this.height = height;
		this.x2 = x1 + width;
		this.y2 = y1 + height;
		this.velX = 0;
		this.velY = 0;
		this.toX = undefined;
		this.fromX = undefined;
		this.toY = undefined;
		this.fromY = undefined;
		this.moving = false;
		this.movable = false;
		this.carried = false;
		this.boximage = undefined;
		this.falling = false;
		
	};
	
	var plat = platform.prototype;
	
	plat.fillStyle = "rgb("+
				  Math.floor(Math.random()*256)+","+
				  Math.floor(Math.random()*256)+","+
				  Math.floor(Math.random()*256)+")" 
				  ;
	
	plat.move = function(velX, velY, goX, goY){
		this.velX = velX;
		this.velY = velY;
		this.toX = goX + this.x1;
		this.fromX = this.x1;
		this.toY = goY+this.y1;
		this.fromY = this.y1;
		
		this.moving = true;
	};
	
	// plat.movable = function(){
	
		// this.movable = true;
		
	// };
	
	plat.moveBlock = function(){
		
			//console.log("Holding");
			this.x1 = (app.oble.obleWidth/2 + app.oble.obleX) - this.width/2;
			this.y2 = app.oble.obleY;
			
			this.x2 = this.x1+this.width;
			this.y1 = this.y2-this.height;
		
	};
	
	plat.downBlock = function(plats){
		hitBlocks = [];
		var leastY2 = 0;
		var tempBlock = {};
		if(app.oble.dir > 0){
				tempBlock.x1 = app.oble.obleX+app.oble.obleWidth/* +.5 */;
				tempBlock.x2 = tempBlock.x1 + this.width;
		} else if(app.oble.dir < 0){
			tempBlock.x2 = app.oble.obleX /*-.5 */;
			tempBlock.x1 = tempBlock.x2 - this.width;
		}
		hitBlocks = this.getPlaceY(tempBlock, plats);
		for(i=0; hitBlocks.length > i; i++){
			//console.log("Temp.y2:" + hitBlocks[i].y2);
			tempBlock.y1 = hitBlocks[i].y1 - 170
			tempBlock.w = 170
			tempBlock.h = 170
			tempBlock.y2 = hitBlocks[i].y1
			//console.log(tempBlock.x1 + ", " + tempBlock.y1 + ", " + tempBlock.x2 + ", " + tempBlock.y2);
			
			var col = false;
			for(f=0; hitBlocks.length > f; f++){
				//console.log("checking");
				if(hitBlocks[f].y1<=tempBlock.y2-.1){
				if(hitBlocks[f].y2>=tempBlock.y1+.1){
				if(hitBlocks[f].x1<=tempBlock.x2-.1){
				if(hitBlocks[f].x2>=tempBlock.x1+.1){
					col = true;
					
					// console.log("\ncolls");
					// console.log(hitBlocks[f].x1 + " collideds wiht " + (tempBlock.x2 - .1));
					// console.log(hitBlocks[f].x2 + " collideds wiht " + (tempBlock.x1+.1));
					// console.log(hitBlocks[f].y1 + " collideds wiht " + (tempBlock.y2+.1));
					// console.log(hitBlocks[f].y2 + " collideds wiht " + (tempBlock.y1 - .1));	
					
					
				}}}}
				
			}
			
			//console.log("block " + tempBlock.y2);
			//console.log("least: " + leastY2);
			if(tempBlock.y2 > leastY2 && !col && tempBlock.y2 > app.oble.obleY+app.oble.obleHeight-340){
				//console.log("changing least");
				leastY2 = tempBlock.y2;
			}
		}
		
		if(leastY2 <= 0){
			//console.log("issues");
			return false;
		} else {
			this.x1 = tempBlock.x1;
			this.x2 = tempBlock.x2;
			this.y2 = leastY2;
			this.y1 = this.y2-this.width;
			app.oble.canCarry = true;
			return true;
		}
	};
	
	plat.getPlaceY = function(hit, plats){
		//var lowY = 100000;
		for(var i=0; i<plats.length; i++){
			//if(plats[i].movable == true){
			//console.log(hit.x1 + hit.x2)
			if(((plats[i].x1 <= hit.x2) && (plats[i].x2 >= hit.x1)) &&
			   !((plats[i].x1 == this.x1) && (plats[i].x2 == this.x2) && (plats[i].y1 == this.y1) && (plats[i].y2 == this.y2))
				 ){
		
				//console.log("push plat at y1: " + plats[i].y1);
				hitBlocks.push(plats[i]);
			//}
			} else { lowY = app.oble.obleY+app.oble.obleHeight;}
		}
		return hitBlocks;
			
		//}
		
	};
	
	plat.close = function(){
		//  console.log("close");
		var ply1 = app.oble.obleY;
		var ply2 = app.oble.obleY + app.oble.obleHeight;
		var plx1 = app.oble.obleX
		var plx2 = app.oble.obleX + app.oble.obleWidth;
		
		
		if((ply2 >= this.y1) && 
		   (ply1 <= this.y2) && 
		 !((plx2 >= this.x1) && 
		   (plx1 <= this.x2))){
		   //console.log("in y range");
			if((plx2 >= this.x1-5) && (plx1 <= this.x2+5)){
				return true;
			}
		}
		return false;
		
	};
	
	plat.checkMove = function(){
		if((this.x1 < this.fromX) || (this.x1 > this.toX)){
			this.velX = 0-this.velX;
		}
		
		if((this.y1 < this.fromY) || (this.y1 > this.toY)){
			this.velY = 0-this.velY;
		}
	};
	
	plat.landBlock = function(velx, vely, plx1, ply1, plx2, ply2){
		if(vely >= 0 && plx1<=this.x2 && plx2>=this.x1 && ply2>=this.y1 && ply2<=this.y2
				&& !(this.rightBlock(velx, vely, plx1, ply1, plx2, ply2))
				&& !(this.leftBlock(velx, vely, plx1, ply1,plx2,ply2))){
			return true;
		} else {
			return false;
		}
	};
	
	plat.upBlock = function(velx, vely, plx1, ply1, plx2, ply2){
		//console.log("checking");
		if(vely < 0 && plx1<=this.x2 && plx2>=this.x1 && ply1<=this.y2 && ply1>=this.y1
				&& !(this.rightBlock(velx, vely, plx1, ply1, plx2, ply2))
				&& !(this.leftBlock(velx, vely, plx1, ply1,plx2,ply2))){
			return true;
		} else {
			return false;
		}
	};
	
	plat.rightBlock = function(velx, vely, plx1, ply1, plx2, ply2){
		if(velx >= 0 && ply1<=this.y2 && ply2>=this.y1+.1 && plx2>=this.x1 && plx2<=this.x1+10
				//&& !(this.landBlock(vely, plx1, ply1, plx2, ply2)) 
				//&& !(this.upBlock(vely, plx1, ply1, plx2, ply2))
				){
			return true;
		} else {
			return false;
		}
	};
	
	plat.leftBlock = function(velx, vely, plx1, ply1, plx2, ply2){
		if(velx <= 0 && ply1<=this.y2 && ply2>=this.y1+.1 && plx1<=this.x2 && plx1>=this.x2-10
				//&& !(this.landBlock(vely, plx1, ply1, plx2, ply2))
				//&& !(this.upBlock(vely, plx1, ply1, plx2, ply2))
				){
			return true;
		} else {
			return false;
		}
	};
			
	plat.draw = function(ctx) {
		// var halfW = this.width/2;
		// var halfH = this.height/2;
		
		if(this.carried){
			this.moveBlock
		}
		if(this.movable == true){
			if(!app.oble.boxImage){
				//console.log("drawing level");
				// ctx.fillStyle = 'pink';
				// ctx.fillRect(this.x1, this.y1, this.x2-this.x1, this.y2-this.y1);
				
			} else{
				//console.log("here");
				// ctx.drawImage(this.boximage, this.x1, this.y1);
				/* app.oble.ctx.fillStyle = "rgb("+
				  Math.floor(Math.random()*256)+","+
				  Math.floor(Math.random()*256)+","+
				  Math.floor(Math.random()*256)+")"; */
				// app.oble.ctx.fillStyle = this.fillStyle;
				// app.oble.ctx.fillRect(this.x1, this.y1, this.x2-this.x1, this.y2-this.y1);
				app.oble.ctx.drawImage(app.oble.boxImage,this.x1,this.y1);
				
			}
		} else{
			//ctx.fillStyle = 'pink';
			//ctx.fillRect(this.x1, this.y1, this.x2-this.x1, this.y2-this.y1);
		}
		
	};
	
	return platform;
}();