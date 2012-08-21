// does what is says
function closeModalDialog(e) {
	Ti.API.info(' closeModalDialog ' + e.source);
	$.addWindow.close();
}

// this is the exported function that opens the controller and displays
// the main window
exports.create = function(_tab) {
	$.addWindow.setLeftNavButton($.place_cancel);
	$.addWindow.setRightNavButton($.place_save);

	$.place_save.on("click", function(e) {
		alert('save clicked');
		
		// Now we can add items to the model.
		var place = Alloy.getModel('Place', {
			"city" : $.city.value,
			"state" : $.state.value,
			"name" : $.name.value
		});
		place.save();
	});
	$.place_cancel.on("click", function(e) {
		alert('cancel clicked');
		$.addWindow.close();
	})
	$.addWindow.open({
		modal : true
	});
}