var dataObj = function(){
	this.fruitNum = 0;
	this.double = 1;
	this.score = 0;
	this.gameOver = false;
}
/*dataObj.prototype.reset = function(){
	this.fruitNum = 0;
	this.double = 1;
	
}*/
dataObj.prototype.draw = function(){
	var w = can1.width;
	var h = can1.height;
	ctx1.save();
	ctx1.shadowBlur = 10;
	ctx1.shadowColor = "white";
	ctx1.fillStyle = "white";
	ctx1.font = "30px Verdana";
	ctx1.textalign = "center";//left  right  center
	//ctx1.fillText("num " +this.fruitNum,w*0.5,h-50);
	//ctx1.fillText("double " +this.double,w*0.5,h-80);
	ctx1.fillText("score "+this.score,w*0.5-50,h-20);
	if(this.gameOver){
		ctx1.fillText("GAMEOVER",w*0.5-50,h*0.5);
	}
	ctx1.restore();
}
dataObj.prototype.addScore = function(){
	this.score += this.fruitNum*10*this.double;
	this.fruitNum = 0;
	this.double = 1;
}
