// Function to keep a Ti.TableView in sync with Backbone Model.
$.table.updateContent = function(collection) {
	var rows = [];
	for (var i = 0; i < collection.length; i++) {
		var model = collection.at(i).attributes, title = "";
		for (var key in model) {
			if (key !== "id") {
				title += model[key] + "  "
			}
		}
		rows.push(Ti.UI.createTableViewRow({
			"title" : title
		}));
	}
	this.setData(rows);
};

// Now let's create a Backbone collection that will hold our models,
// the classes that represent our model have been generated automatically
// as Alloy components. Use new on the component to create the model or
// collection.
var places = Alloy.getCollection('Place');

// You can bind any Backbone event to models or collections but fetch is convenient because
// fetch occurs when the persistent store is sync'd to the local Backbone server.
places.bind("fetch", function() {
	$.table.updateContent(places);
});

//
// My hack to get the DAO associated with a collection... is there a better
// solution?
//
places.dao = Alloy.getModel('Place').dao;

// Fetch will load models from persistent starage, sync'ing Backbone and persistent store.
places.fetch();

if (false) {
	// Now we can add items to the model.
	var place = Alloy.getModel('Place', {
		"city" : "Washington",
		"state" : "DC",
		"name" : "Home"
	});
	places.add(place);

	// Use Backbone shortcut to create a model and add to collection in single step. Does the same
	// thing as the creating a new model and then adding it to the collection.
	places.add({
		"city" : "New York",
		"state" : "NY",
		"name" : "Business Location"
	});

	// Add will add models to local Backbone server but save triggers the CRUD create opperation
	// causing the model to get added to the persistent store. During create an id is added to the
	// model signaling that the model has been persisted and no longer in the new state.
	places.forEach(function(model) {
		model.save();
	});
}
/*
// UPDATE - update the model save here triggers the CRUD update opperation
place.save({
author : "R Kipling"
});
// Okay time to show the results. Remember this sync's local Backbone server with persitent store.
places.fetch();

* */

/*
 // DELETE - destroy triggers the CRUD delete opperation
 for ( i = places.length - 1; i >= 0; i--) {
 var model = places.at(i);
 model.destroy();
 };
 */
$.index.open();
