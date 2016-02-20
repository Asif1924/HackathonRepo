(function (jQuery) {
	jQuery.extend( jQuery.tmpl.tag, {
		"for": {
			open: "if($notnull_1){for(var i = 0; i < $1a; i++){",
			close: "}}"
		}
	});
})( jQuery );