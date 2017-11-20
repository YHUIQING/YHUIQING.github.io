var ctx1;
var ctx2;
var can1;
var can2;

var lastTime;
var deltaTime;

var canWidth;
var canHeight;

var  bgPic = new Image();

var ane;
var fruit;
var mom;
var baby;
var babyTail = [];
var babyEye = [];
var babyBody = [];

var bigTail = [];
var bigEye = [];
var bigBodyOrg = [];
var bigBodyBlue = [];
/*var bigyBody = [];*/

var mx;// 有关鼠标的变量
var my;// 有关鼠标的变量

var data;
var dust;
var dustPic = [];
document.body.onload=game;
function game(){
	/*console.log("onlioad");*/
	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameloop();
}
function init(){
	//获得canvas context
	
	can1 = document.getElementById("canvas1");
	ctx1 = can1.getContext("2d");//fishes，dust，UI，circle

	can2 = document.getElementById("canvas2");
	ctx2 = can1.getContext("2d");//background，ane，fruits
	
	canWidth = can1.width;
	canHeight = can1.height;
	
	can1.addEventListener("mousemove",onMouseMove,false);
	bgPic.src="img/background.jpg";
	 
	ane = new aneObj();
	ane.init();
	
	fruit = new fruitObj();
	fruit.init();
	
	mom = new momObj();
	mom.init();
	
	mx = can1.width*0.5;
	my = can1.height*0.5;
	
	baby = new babyObj();
	baby.init();
	for (var i = 0;i<8;i++) {
		babyTail[i] = new Image();
		babyTail[i].src = "img/babyTail"+i+".png";
	}
	for (var i = 0;i<2;i++) {
		babyEye[i] = new Image();
		babyEye[i].src = "img/babyEye"+i+".png";
	}
	for (var i = 0;i<20;i++) {
		babyBody[i] = new Image();
		babyBody[i].src = "img/babyFade"+i+".png";
	}
	for (var i = 0;i<8;i++) {
		bigTail[i] = new Image();
		bigTail[i].src = "img/bigTail"+i+".png";
	}
	for (var i = 0;i<2;i++) {
		bigEye[i] = new Image();
		bigEye[i].src = "img/bigEye"+i+".png";
	}
	for (var i = 0;i<8;i++) {
		bigBodyOrg[i] = new Image();
		bigBodyOrg[i].src = "img/bigSwim"+i+".png";
	}
	for (var i = 0;i<8;i++) {
		bigBodyBlue[i] = new Image();
		bigBodyBlue[i].src = "img/bigSwimBlue"+i+".png";
	}
	for (var i = 0;i<7;i++) {
		dustPic[i] = new Image();
		dustPic[i].src = "img/dust"+i+".png";
	}
	
	data = new dataObj();
	dust = new dustObj();
	dust.init();
}
 function gameloop(){
 	requestAnimationFrame(gameloop);//当前绘制完成之后，去根据你机器的性能绘制下一帧
 	var now = Date.now();
 	deltaTime = now-lastTime;
 	lastTime = now;
	if(deltaTime>40) deltaTime = 40;
    background();
 	ane.draw();
 	fruitMonitor();
 	fruit.draw();
 	mom.draw();
 	momFruitsCollosion();
 	baby.draw();
 	momBabyCollision();
 	data.draw();
 	dust.draw();
 	
 }
function onMouseMove(e){
	if(!data.gameOver){
		if(e.offsetX||e.layerX){
			mx = e.offSetX == undefined ? e.layerX:e.offsetX;
			my = e.offSetY == undefined ? e.layerY:e.offsetY;
		}
	}
	
}
