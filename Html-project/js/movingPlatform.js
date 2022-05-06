
function movingPlatform(plat, velX, velY, fromX, toX, fromY, toY){
	
		if((x1 < fromX) || (x2 > toX)){
			velX = 0-velX;
		}
		
		if((y1 < fromY) || (y2 > toY)){
			velY = 0-velY;
		}
		plat.x1 = x1+velX;
		plat.x2 = x2+velX;
		
		plat.y1 = y1+velY;
		plat.y2 = y2+velY;
	};