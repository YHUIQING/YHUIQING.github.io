var aneObj = function(){
//start point,control point,end point(sin)
this.rootx = [];   //海葵根部位置
this.headx = [];   //海葵头部位置和根部一样
this.heady = [];   //海葵头部高度
this.alpha = 0;    //海葵角度
this.amp = [];     //海葵摆动振幅  
//this.len = [];
}
aneObj.prototype.num = 50;
aneObj.prototype.init = function(){
	var h = can1.height;
	for (var i = 0;i<this.num;i++) {
		this.rootx[i] = i*20 + Math.random()*20;  //[0,20) 海葵根部位置
		this.headx[i] = this.rootx[i];            //
		this.heady[i] = h - 200+Math.random()*50;
		//this.len[i] = 200+Math.random()*50;
		this.amp[i] = Math.random()*50+20;
	}
	//console.log("ane");
}
aneObj.prototype.draw = function(){
	this.alpha +=deltaTime*0.001;
	var l = Math.sin(this.alpha);//[-1,1]
	ctx2.save();
	ctx2.strokeStyle = "#3b154e";
	ctx2.lineWidth=20;
	ctx2.lineCap = "round";
	ctx2.globalAlpha=0.6;
	
	for (var i = 0;i<this.num;i++) {
		ctx2.beginPath();
		ctx2.moveTo(this.rootx[i],can1.height);//开始点
		this.headx[i] = this.rootx[i]+l*this.amp[i];
		ctx2.quadraticCurveTo(this.rootx[i],can1.height-100,this.headx[i],this.heady[i]);//控制点和结束点   二次贝塞尔曲线
		ctx2.stroke();
		
	}
	ctx2.restore();
}


