/*散点图样式*/
var H5ComponentPie = function( name, cfg){
	var component = new H5componentBase(name ,cfg);
	/*component.text('lllll');*/
	//绘制网格
	var w = cfg.width;
	var h = cfg.height;
	//加入一个画布（网格线背景）
	var canv = document.createElement('canvas');
	var ctx = canv.getContext('2d');
	canv.width = ctx.width = w;
	canv.height = ctx.Height = h;
	component.append(canv);
	
	var r = w/2;
	var step = cfg.data.length;

	//计算一个圆周上的坐标（计算多边形的顶点）
	// 已知：圆心坐标（a，b）、半径 r：角度deg
	// rad = (2*Math.PI/360)*(360 / step )*i
	// x = a + Math.sin( rad )*r;
	// y = b + Math.cos( rad )*r;
	
	// 绘制网格背景（分面绘制，分为10份）
	for ( var s = 10; s > 0; s--) {
		ctx.beginPath();
		for (var i = 0; i < step; i++) {
			var rad = (2*Math.PI/360)*(360 / step )*i;
		    var x = r + Math.sin( rad )*r*s*0.1;
		    var y = r + Math.cos( rad )*r*s*0.1;
		
		    ctx.lineTo(x,y);
		}
		
		
		ctx.closePath();
		if(s%2 == 0){
		    ctx.fillStyle = "#99C0FF";	
		}else{
			ctx.fillStyle = "#f1f9ff";	
		}
		ctx.fill();
	}
	//绘制伞骨
	
	for (var i = 0;i<step; i++) {
		var rad = (2*Math.PI/360)*(360 / step )*i;
		var x = r + Math.sin( rad )*r;
		var y = r + Math.cos( rad )*r;
		ctx.moveTo(r,r);
		ctx.lineTo(x,y);
		
		//输出项目文字
		
		var text = $('<div class="text">');
		text.text(cfg.data[i][0]);
		text.css('top',y/2);
		
		if(x > w/2){
			text.css('left',x/2+5);
		}else{
			text.css('right',(w-x)/2+5);
		}
		
		if(y > h/2){
			text.css('top',y/2+5);
		}else{
			text.css('bottom',(h-y)/2+5);
		}
		
		if(cfg.data[i][2]){
			text.css('color',cfg.data[i][2]);
		}
		text.css('opacity',0);
		
		component.append(text);
	}
	ctx.strokeStyle='#e0e0e0';
	ctx.stroke();
	
	
	
	
	
	
	/*
	 *绘制折线以及对应的数据和阴影
	 * @param {float} per 0到1之间的数据，会根据这个值绘制最终数据对应的中间状态
	 * @return {type}[desciption]Component元素
	 * 
	 */
	
	//加入一个画布（网格线背景）
	var canv = document.createElement('canvas');
	var ctx = canv.getContext('2d');
	canv.width = ctx.width = w;
	canv.height = ctx.Height = h;
	component.append(canv);
	ctx.strokeStyle = '#f00';
	var draw = function(per){
		if(per >= 1){
			component.find('.text').css('opacity',1);
		}
	   ctx.clearRect(0,0,w,h);
	   //绘制数据层
	   //输出数据的折线
	   
	    for (var i = 0;i<step; i++) {
			var rad = (2*Math.PI/360)*(360 / step )*i;
			var rate = cfg.data[i][1];
			var x = r + Math.sin( rad )*r*rate*per;
			var y = r + Math.cos( rad )*r*rate*per;
			ctx.lineTo(x,y);
		}
	    ctx.closePath();
		ctx.stroke();
		
		//输出数据的点
	    ctx.fillStyle = "#ff7676"
	    for (var i = 0;i<step; i++) {
			var rad = (2*Math.PI/360)*(360 / step )*i;
			var rate = cfg.data[i][1];
			var x = r + Math.sin( rad )*r*rate*per;
			var y = r + Math.cos( rad )*r*rate*per;
			ctx.beginPath();
			ctx.arc(x,y,5,0,2*Math.PI);
			ctx.fill();
			ctx.closePath();
		}
		
	}
	
	
	
	
	draw(0);
	component.on('onLoad',function(){
		//雷达图生长的动画
		var s = 0;
		for (i = 0; i<100; i++) {
			setTimeout((function(){
				s+=0.01;
				draw(s);
			}),i*10+500);
		}
		
	});
	component.on('onLeave',function(){
		//雷达图退场的动画
		var s = 1;
		for (i = 0; i<100; i++) {
			setTimeout(function(){
				s-=0.01;
				draw(s);
			},i*10);
		}
		
	});
	
 	return component;
}
