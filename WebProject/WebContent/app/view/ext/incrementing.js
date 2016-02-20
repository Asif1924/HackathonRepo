(function($) {

    $.fn.durationControl = function(method) {

        var methods = {

            init : function(options) {
                this.durationControl.settings = $.extend({}, this.durationControl.defaults, options);
                
                return this.each(function() {
                    var $element = $(this), // reference to the jQuery version of the current DOM element
                         element = this;      // reference to the actual DOM element
                    // code goes here
                    
                });

            },

 
            createControl: function() {

             if($(this).attr('inited') == true)
             {
            	 return;
             }
            	//$(".numbers-row").append('<div class="inc spinbutton">+</div><div class="spindec spinbutton">-</div>');
             var upButtonID = this.attr('id') + '_Up';
             var downButtonID = this.attr('id') + '_Down';
             
             var upControlBody = '<div class="spininc spinbutton" value="+" id="' + upButtonID + '"/>';
             var downControlBody = '<div class="spindec spinbutton" value="-" id="' + downButtonID + '"/>';
            	 
      		  $(this).before(downControlBody);
      		  $(this).after(upControlBody);
      		  
      		  $(this).attr('inited', true); 
      		  
      		  $('#' + upButtonID).on("click", buttonClick);
      		  $('#' + downButtonID).on("click", buttonClick);
            }
        }
        
        function buttonClick(event)
        {
        	var $button = $(this);
  		    var oldValue = $button.parent().find("input").val();
  		    
  		    var maxValue = $button.parent().find("input").attr('max');
  		    var minValue = $button.parent().find("input").attr('min');
  		
  		    var newVal = parseFloat(oldValue);
  		    
  		    if ($button.attr('value') == "+") {
  		      if(parseFloat(oldValue)  < parseFloat(maxValue))
  		    	{
  		    	  newVal = parseFloat(oldValue) + 1;
  		    	}
  		       
  		  	} else {
  			   // Don't allow decrementing below zero
  		      if (oldValue > 0) {
  		        newVal = parseFloat(oldValue) - 1;
  			    } else {
  		        newVal = 0;
  		      }
  			}
  		
  		    if(isNaN(newVal))
  		    {
  		    	newVal = 0;
  		    }
  		    
  		    $button.parent().find("input").val(newVal);
  		    $button.parent().find("input").trigger('change');
        }

        var helpers = {
            slider_private_method: function() {
                // code goes here
            }
        }

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error( 'Method "' +  method + '" does not exist in durationControl plugin!');
        }

    }

    $.fn.durationControl.defaults = {
        
    }

    $.fn.durationControl.settings = {
    		isInited : false
    }

})(jQuery);