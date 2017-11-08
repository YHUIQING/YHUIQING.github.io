var H5 = function(){
	
	this.id = ('h5_'+Math.random()).replace('.','_');
	this.el = $('<div class="h5" id="'+this.id+'">').hide();
	this.page = [];
	$('body').append(this.el);
	
	/*新增一个页面*/
	this.addPage = function(name,text){
		var page =$('<div class="h5_page section">');
		if(name != undefined){
			page.addClass('h5_page_'+name);
		}
		if(text != undefined){
			page.text(text);
		}
		this.el.append(page);
		this.page.push(page);
		return this;
	}
	/*新增一个组件*/
	this.addComponent = function(name,cfg){
		var cfg = cfg || {};
		cfg = $.extend({
			type : 'base'
		},cfg);
		var component;
		var page = this.page.slice(-1)[0];
		switch(cfg.type){
			case 'base':
			     component = new H5componentBase(name,cfg);
			     break;
			case 'Polyline':
			     component = new H5ComponentPolyline(name,cfg);
			     break;
			case 'Bar':
			     component = new H5ComponentBar(name,cfg);
			     break;
			case 'Radar':
			     component = new H5ComponentRadar(name,cfg);
			     break;
			case 'Point':
			     component = new H5ComponentPoint(name,cfg);
			     break;
			
			     default:
		}
		
		page.append(component);
		return this;
	}
	/*h5对象初始化*/
	this.loader = function(){
		this.el.fullpage({
		  
			onLeave:function(index, nextIndex, direction){
				$(this).find('.h5_component').trigger('onLeave');
			},
			afterLoad:function(anchorLink, index){
				$(this).find('.h5_component').trigger('onLoad');
			}
		});
		this.page[0].find('.h5_component').trigger('onLoad');
		this.el.show();
	}
	return this;
}
