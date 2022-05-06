app.win= function(){

	function win(x, y, w, h){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	};
	
	var w = win.prototype;
	
	return win;
}();