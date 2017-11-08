/*散点图样式*/
var H5ComponentBar = function( name, cfg){
	var component = new H5componentBase(name ,cfg);
	/*component.text('test H5ComponentPoint');*/
	var base = cfg.data[0][1];//以第一个数据的比例为大小的100%
	$.each(cfg.data,function(idx , item){
		var line = $('<div class="line line_'+idx+'">');
		var name = $('<div class="name">'+item[0]+'</div>');
		var rate = $('<div class="rate"></div>');
		var per = $('<div class="per">'+item[1]*100+'%</div>');
		
		
		var width = item[1]*100+'%';
        
        rate.css('width',width);
        var bgStyle = ''; 
        if(item[2]){
        	 bgStyle = 'style="background-color:'+item[2]+'"';
        	 per.css('color',item[2]);
		}
        rate.html('<div class="bg" '+bgStyle+'></div>');
		line.append(name).append(rate).append(per);
		component.append(line);
	});
	return component;
}
