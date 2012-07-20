function nestifycss(css, by) {
	if(typeof jQuery == 'undefined') throw 'jQuery is required for nestifycss to work';
	var nestified = $.trim(css);
	
	// remove comments
	nestified = nestified.replace(/\/\*[\s\S]*?\*\//gi, '');

	// split into rules
	nestified = $.grep($.map(nestified.split('}'), function(item){
		return $.trim(item).length > 0 ? $.trim(item + '}') : false;
	}), function(item){ return item; });

	// nest selectors
	nestified = $.map(nestified, function(item){
		var selectors = $.trim(item.split('{').shift());
		var rules = $.trim('{' + item.split('{').pop());

		selectors = $.map(selectors.split(','), function(item) {
			return by + ' ' + $.trim(item);
		});

		selectors = selectors.join(', ')

		return selectors + ' ' + rules;
	});

	nestified = nestified.join('\n');

	// move html and body styles
	nestified = nestified.replace(by + ' html', by);
	nestified = nestified.replace(by + ' body', by);

	return nestified;
}
