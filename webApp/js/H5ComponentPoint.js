/*散点图样式*/
var H5ComponentPoint = function( name, cfg){
	var component = new H5componentBase(name ,cfg);
	/*component.text('test H5ComponentPoint');*/
	var base = cfg.data[0][1];//以第一个数据的比例为大小的100%
	$.each(cfg.data,function(idx , item){
		var point = $('<div class="point point_'+idx+'">');
		var name = $('<div class="name">'+item[0]+'</div>');
		var rate = $('<div class="per">'+item[1]*100+'%</div>');
		name.append(rate);
		point.append(name);
		/*point.text(item[0]);*/
		var per = (item[1]/base*100);
		point.width(per).height(per);
		if(item[2]){
			point.css('backgroundColor',item[2]);
		}
		if(item[3] !== undefined&&item[4] !== undefined){
			point.css('left',item[3]).css('top',item[4]);
		}
		/*point.*/
		component.append(point);
	});
	return component;
}
