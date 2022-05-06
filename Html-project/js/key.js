app.key= function(){

	function key(keyX, keyY){
		this.keyX = keyX;
		this.keyY = keyY;
		this.width = 85;
		this.height = 35;
		this.image = undefined;
		this.state = false;
	};
	
	var k = key.prototype;
	
	k.draw = function(){
		this.collected();
		if(!this.state){
			if(!app.oble.keyImage){
					app.oble.ctx.fillStyle = 'yellow';
					app.oble.ctx.fillRect(this.keyX, this.keyY, this.width, this.height);
				} else{
					//console.log("here");
					app.oble.ctx.drawImage(app.oble.keyImage,this.keyX,this.keyY);
					app.oble.ctx.fillStyle = 'yellow';
					//app.oble.ctx.fillRect(this.keyX, this.keyY, this.width, this.height);
					
				}
		}
	};
	
	k.collected = function(){
		if((app.oble.obleX >= this.keyX-app.oble.obleWidth) && 
			(app.oble.obleX <= this.keyX+this.width) &&
			(app.oble.obleY >= this.keyY-app.oble.obleHeight) &&
			(app.oble.obleY <= this.keyY+this.height)
			){
			this.state = true;
			//console.log(this.state);
			return true;
		} else { 
			//console.log(this.state);
			return false;
		}
	}
	return key;
}();