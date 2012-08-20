function Controller() {
    require("alloy/controllers/BaseController").call(this);
    var $ = this, exports = {};
    $.__views.index = A$(Ti.UI.createWindow({}), "Window", null), $.addTopLevelView($.__views.index), $.__views.table = A$(Ti.UI.createTableView({}), "TableView", $.__views.index), $.__views.index.add($.__views.table), _.extend($, $.__views), $.table.updateContent = function(collection) {
        var rows = [];
        for (var i = 0; i < collection.length; i++) {
            var model = collection.at(i).attributes, title = "";
            for (var key in model) key !== "id" && (title += model[key] + "  ");
            rows.push(Ti.UI.createTableViewRow({
                title: title
            }));
        }
        this.setData(rows);
    };
    var places = Alloy.getCollection("Place");
    places.bind("fetch", function() {
        $.table.updateContent(places);
    }), places.dao = Alloy.getModel("Place").dao, places.fetch(), $.index.open(), _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;