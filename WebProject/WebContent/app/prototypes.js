// these operate on the original Array
// return value: length (as for other 'destructive' operations such as 'push')
Array.prototype.remove = function(val) {
	return this.removeAt($.inArray(val, this));
};

Array.prototype.removeList = function(vals) {
	if (vals === undefined || vals.length === undefined || vals.length === 0)
		return this.length;
	var newArray = this.slice(0);
	_.each(vals, function(val) {
		newArray = $.grep(newArray, function(searchItem) {
			return searchItem !== val;
		});
	});
	this.length = 0;
	this.push.apply(this, newArray);
	return this.length;
};

Array.prototype.removeAt = function(index) {
	if (index >= 0)
		this.splice(index, 1);
	return this.length;
};

//return value: Boolean
Array.prototype.contains = function(val) {
	if (val === undefined)
		return false;
	return ($.inArray(val, this) !== -1);
};

Array.prototype.copy = function() {
	return this.slice(0);
};

Array.prototype.deepCopy = function() {
	return $.extend(true, [], this);
};




