var momObj = function(){
	this.x;                  //大鱼x坐标
	this.y;                  //大鱼y坐标
	this.angle;
	//this.bigEye = new Image();
	//this.bigBoy = new Image();
	//this.bigTail = new Image();
	
	this.bigTailTimer = 0;
	this.bigTailCount = 0;
	
	this.bigEyeTimer = 0;
	this.bigEyeCount = 0;
	this.bigEyeInterval = 1000;
	
	
	this.bigBodyCount = 0;
}
momObj.prototype.init = function(){
	this.x = can1.width*0.5;
	this.y = can2.height*0.5;
	this.angle = 0;
	//this.bigEye.src = "img/bigEye0.png"
	//this.bigBoy.src = "img/bigSwim0.png"
	//this.bigTail.src = "img/bigTail0.png"
}
momObj.prototype.draw = function(){
	
	
	this.x = lerpDistance(mx,this.x,0.98);
	this.y = lerpDistance(my,this.y,0.98);
	//delta angle
	//Math.atan2(y,x)
	var deltaY = my - this.y;
	var deltaX = mx - this.x;
	var beta = Math.atan2(deltaY,deltaX)+Math.PI;
	//lerp angle 让大鱼的角度趋向于鼠标的角度
	this.angle = lerpAngle(beta,this.angle,0.6);
	//baby tail count
	this.bigTailTimer += deltaTime;
	if(this.bigTailTimer>50){
		this.bigTailCount = (this.bigTailCount+1)%8;
		this.bigTailTimer %= 50;
	}
	//baby eye
	this.bigEyeTimer += deltaTime;
	if(this.bigEyeTimer>this.bigEyeInterval){
		this.bigEyeCount = (this.bigEyeCount+1)%2;
		this.bigEyeTimer %= this.bigEyeInterval;
		if(this.bigEyeCount == 0){
			this.bigEyeInterval = Math.random()*1500+2000;//[2000,3500)
		}else{
			this.bigEyeInterval = 200;
		}
	}
	//lerp x,y 使得一个值趋向于一个目标值
	ctx1.save();
	ctx1.translate(this.x,this.y); //移动原点
	ctx1.rotate(this.angle);       //然后旋转画布
	
	var bigTailCount = this.bigTailCount;
	var bigEyeCount = this.bigEyeCount;
	var bigBodyCount = this.bigBodyCount;
	
	ctx1.drawImage(bigTail[bigTailCount],-bigTail[bigTailCount].width*0.5+30,-bigTail[bigTailCount].height*0.5);
	
	//ctx1.drawImage(this.bigBoy,-this.bigBoy.width*0.5,-this.bigBoy.height*0.5);
	if(data.double == 1){
		ctx1.drawImage(bigBodyOrg[bigBodyCount],-bigBodyOrg[bigBodyCount].width*0.5,-bigBodyOrg[bigBodyCount].height*0.5);
	}else{
		ctx1.drawImage(bigBodyBlue[bigBodyCount],-bigBodyBlue[bigBodyCount].width*0.5,-bigBodyBlue[bigBodyCount].height*0.5);
	}
	ctx1.drawImage(bigEye[bigEyeCount],-bigEye[bigEyeCount].width*0.5,-bigEye[bigEyeCount].height*0.5);
	ctx1.restore();
	
}
