function Controller() {
    function doAddPlaceClick() {
        var placeController = Alloy.getController("place");
        placeController.create($.tab1);
    }
    require("alloy/controllers/BaseController").call(this);
    var $ = this, exports = {};
    $.__views.index = A$(Ti.UI.createTabGroup({}), "TabGroup", null), $.__views.mainWindow = A$(Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Window Title",
        tabBarHidden: !0
    }), "Window", null), $.__views.table = A$(Ti.UI.createTableView({}), "TableView", $.__views.mainWindow), $.__views.mainWindow.add($.__views.table), $.__views.tab1 = A$(Ti.UI.createTab({
        window: $.__views.mainWindow
    }), "Tab", null), $.__views.index.addTab($.__views.tab1), $.addTopLevelView($.__views.index), $.__views.addButton = A$(Ti.UI.createButton({
        title: "Add"
    }), "Button", null), $.addTopLevelView($.__views.addButton), $.__views.addButton.on("click", doAddPlaceClick), _.extend($, $.__views), $.table.updateContent = function(collection) {
        var rows = [];
        for (var i = 0; i < collection.length; i++) {
            var model = collection.at(i).attributes, title = "";
            for (var key in model) key !== "id" && (title += model[key] + "  ");
            rows.push(Ti.UI.createTableViewRow({
                title: title
            }));
        }
        this.setData(rows);
    }, $.mainWindow.setRightNavButton($.addButton), $.index.open(), _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;