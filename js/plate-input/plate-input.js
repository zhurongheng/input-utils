	(function($) {
		var PlateInput={
				platenumber:null,
				init:function(inst){
					console.log('fn init');
				},
				change(index,val){
					console.log('fn change');
				},focus:function(index,val,element){
					console.log('fn focus');					
				},setVal:function(index,val,element){
					console.log('fn setVal');
				}
		}
		$.fn.utils = {
			plateInput : function(options) {
				
				$('.plate-item input').ready(function(){
					
				}).each(function(index, element) {
					$(this).change(function() {
						if(options&&typeof(options.change)=='function'){
							fn.change=options.change;
						}
						fn.change(index,$(this).val());
						
					}).focus(function(){
						if(options&&typeof(options.focus)=='function'){
							fn.focus=options.focus;
						}
						fn.focus;
					})
				});
			}
		}
	})(jQuery);
	$.fn.utils.plateInput({
		change:function(index,val){
			console.log('change:'+index+','+val);
		},focus:function(index,val){
			console.log('focus:'+index+','+val);
		}
	});