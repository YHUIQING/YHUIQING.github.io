var dustObj = function(){
	this.x= [];   //漂浮物的x坐标
	this.y = [];  //漂浮物的y坐标
	this.amp = [];//漂浮物的振幅
	this.NO = []; //漂浮物的编号
	this.alpha;   //角度
}
dustObj.prototype.num = 30;
dustObj.prototype.init = function(){
	for (var i = 0;i<this.num;i++) {
		this.x[i] = Math.random()*can1.width;
		this.y[i] = Math.random()*can1.height;
		this.amp[i] = 20 +Math.random()*15;
		this.NO[i] = Math.floor(Math.random()*7);
		this.alpha = 0;
	}
}
dustObj.prototype.draw = function(){
	/*this.alpha+=deltaTime*0.0008;
	
	var l = Math.sin(this.alpha);*/
	//console.log("*");
	this.alpha +=deltaTime*0.001;
	var l = Math.sin(this.alpha);
	
	for (var i=0;i < this.num;i++) {
		var no = this.NO[i];
		//console.log(i);
		ctx1.drawImage(dustPic[no],this.x[i]+this.amp[i]*l,this.y[i]);
		//ctx1.drawImage(dustPic[no],500,600);
	}
}
