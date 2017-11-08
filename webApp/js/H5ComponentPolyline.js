/*散点图样式*/
var H5ComponentPolyline = function( name, cfg){
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
	
	
	//水平网格线 100份 -> 10份
	var step = 10;
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.strokeStyle = "#DBDBDB";
	window.ctx = ctx;
	for (var i = 0; i < step+1; i++) {
		var y = (h/step)*i;
		ctx.moveTo(0,y);
		ctx.lineTo(w,y);
		
	}
	
	//垂直网格线（根据项目的个数去分）

	step = cfg.data.length+1;
	var text_w = w/step;
	for (var i = 0; i < step+1; i++) {
		var x = (w/step)*i;
		ctx.moveTo(x,0);
		ctx.lineTo(x,h);
		if(cfg.data[i]){
			var text = $('<div class="text">');
			text.text(cfg.data[i][0]);
			text.css('top',h/2).css('width',text_w/2).css('left',x/2-text_w/4+text_w/2);
			component.append(text);
		}
	}
	ctx.stroke();
	
	
	//绘制折线图  -- 数据层
	var canv = document.createElement('canvas');
	var ctx = canv.getContext('2d');
	canv.width = ctx.width = w;
	canv.height = ctx.Height = h;
	component.append(canv);
	/*
	 *绘制折线以及对应的数据和阴影
	 * @param {float} per 0到1之间的数据，会根据这个值绘制最终数据对应的中间状态
	 * @return {type}[desciption]Component元素
	 * 
	 */
	var draw = function(per){  //////////////////////////////
	    //清除画布	
	    ctx.clearRect(0,0,w,h);
		//绘制折线数据
		ctx.beginPath();
		ctx.lineWidth = 4;
		ctx.strokeStyle = "#ff8878";
		
		var x = 0;
		var y = 0;
		
		
		var row_w = (w/(cfg.data.length+1))
		//画点
		for(i in cfg.data){
			var item = cfg.data[i];
			x = row_w*i+row_w;
			y = h-(item[1]*h*per);/////////
			ctx.moveTo(x,y);
			ctx.arc(x,y,5,0,2*Math.PI);
		}
		
		//连线
		//移动画笔到第一个数据点的位置cfg.data[0][1]
		ctx.moveTo(row_w,h-(cfg.data[0][1]*h*per));
		for(i in cfg.data){
			var item = cfg.data[i];
			x = row_w*i+row_w;
			y = h-(item[1]*h*per);/////////////
			ctx.lineTo(x,y);
		}
		ctx.stroke();
		
		
	   //绘制阴影
		ctx.lineWidth = 1;
		ctx.strokeStyle = "rgba(255,118,118,0.37)";
		
		ctx.lineTo(x,h);
		ctx.lineTo(row_w,h);
		ctx.fillStyle = 'rgba(255,118,118,0.37)';
		ctx.fill();
		
		//写数据
		for(i in cfg.data){
			var item = cfg.data[i];
			x = row_w*i+row_w;
			y = h-(item[1]*h*per);////////////////////
			if(item[2]){
				ctx.fillStyle = item[2];
			}
			ctx.fillText((item[1]*100)+'%',x-10,y-10);
		}
		ctx.stroke();
	}
	
	draw(0);//调用函数
	
	component.on('onLoad',function(){
		//折线图生长的动画
		var s = 0;
		for (i = 0; i<100; i++) {
			setTimeout((function(){
				s+=0.01;
				draw(s);
			}),i*10+500);
		}
		
	});
	component.on('onLeave',function(){
		//折线图退场的动画
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
