var fruitObj = function(){
	this.alive = [];               //bool
	this.x = [];                   //果实x坐标
	this.y = [];                   //果实y坐标
	this.aneNo = [];               //生长海葵编号
	this.l = [];                   //大小
	this.spd = [];                 //长大的速度
	this.fruitType = [];           //果实类型
	this.orange = new Image();
	this.blue = new Image();
}
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function(){
	for (var i = 0;i<this.num;i++) {
		
		this.alive[i] = false;
		this.x[i] = 0;
		this.y[i] = 0;
		this.l[i] = 0;
		this.aneNo[i] = 0;
		this.spd[i] = Math.random()*0.017+0.001;//[0.003,0.02)
		
		var ran =Math.random();
		if(ran<0.2){
			this.fruitType[i] = "bule";
		}else{
			this.fruitType[i] = "orange";
		}
		//this.born(i);
	}
	this.orange.src = "img/fruit.png";
	this.blue.src = "img/blue.png";
	
}
fruitObj.prototype.draw = function(){
	
	for (var i = 0;i<this.num;i++) {
		//draw
		//find an ane,grow,fly up
		var pic;
		if(this.fruitType[i] == "bule"){
			pic = this.blue;
		}else{
			pic = this.orange;
		}
		if(this.alive[i]){
			if(this.l[i]<=12){       //如果小于12，让果实继续长
				this.x[i] = ane.headx[this.aneNo[i]];
				this.y[i] = ane.heady[this.aneNo[i]];
				this.l[i]+=this.spd[i]*deltaTime;
				ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i])
			}else{
				this.y[i] -= this.spd[i]*3*deltaTime;//如果大于12，让果实往上飘
				ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i])
			}
			
			if(this.y[i]<10){
				//this.alive[i] = false;
				fruit.dead(i);
			}
		
		}
		
	}
}
fruitObj.prototype.born = function(i){
	/*var aneID = Math.floor( Math.random()*ane.num);
	this.x[i] = ane.headx[aneID];
	this.y[i] = ane.heady[aneID];*/
	this.aneNo[i] = Math.floor( Math.random()*ane.num);
	this.l[i] = 0;
	this.alive[i] = true;
}
/*fruitObj.prototype.update = function(){
	var num = 0;
	for (var i = 0; i<this.num;i++) {
		
			if(this.alive[i]) num++
		
	}
}*/
fruitObj.prototype.dead = function(i){
	this.alive[i] = false;
}
function fruitMonitor(){
	var num = 0;
	for (var i = 0;i<fruit.num;i++) {
		if(fruit.alive[i]) num++;
	}
	if(num<15){
		sendFruit();
		return;
	}
}
function sendFruit(){
	for (var i = 0; i<fruit.num;i++) {
		if(!fruit.alive[i]){
			fruit.born(i);
		}
	}
}