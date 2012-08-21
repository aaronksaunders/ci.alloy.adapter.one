function Controller() {
    function closeModalDialog(e) {
        Ti.API.info(" closeModalDialog " + e.source), $.addWindow.close();
    }
    require("alloy/controllers/BaseController").call(this);
    var $ = this, exports = {};
    exports.create = function(_tab) {
        $.addWindow.setLeftNavButton($.place_cancel), $.addWindow.setRightNavButton($.place_save), $.place_save.on("click", function(e) {
            alert("save clicked");
            var place = Alloy.getModel("Place", {
                city: $.city.value,
                state: $.state.value,
                name: $.name.value
            });
            place.save();
        }), $.place_cancel.on("click", function(e) {
            alert("cancel clicked"), $.addWindow.close();
        }), $.addWindow.open({
            modal: !0
        });
    }, $.__views.addWindow = A$(Ti.UI.createWindow({
        backgroundColor: "white",
        title: "Create New Place",
        tabBarHidden: !0,
        layout: "vertical"
    }), "Window", null), $.addTopLevelView($.__views.addWindow), $.__views.__alloyId1 = A$(Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: 10,
        left: 10,
        layout: "horizontal"
    }), "View", $.__views.addWindow), $.__views.addWindow.add($.__views.__alloyId1), $.__views.__alloyId2 = A$(Ti.UI.createLabel({
        borderColor: "black",
        width: 80,
        height: Ti.UI.SIZE,
        text: "Name"
    }), "Label", $.__views.__alloyId1), $.__views.__alloyId1.add($.__views.__alloyId2), $.__views.name = A$(Ti.UI.createTextField({
        left: 5,
        borderColor: "black",
        width: 200,
        height: Ti.UI.SIZE
    }), "TextField", $.__views.__alloyId1), $.__views.__alloyId1.add($.__views.name), $.__views.__alloyId3 = A$(Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: 10,
        left: 10,
        layout: "horizontal"
    }), "View", $.__views.addWindow), $.__views.addWindow.add($.__views.__alloyId3), $.__views.__alloyId4 = A$(Ti.UI.createLabel({
        borderColor: "black",
        width: 80,
        height: Ti.UI.SIZE,
        text: "City"
    }), "Label", $.__views.__alloyId3), $.__views.__alloyId3.add($.__views.__alloyId4), $.__views.city = A$(Ti.UI.createTextField({
        left: 5,
        borderColor: "black",
        width: 200,
        height: Ti.UI.SIZE
    }), "TextField", $.__views.__alloyId3), $.__views.__alloyId3.add($.__views.city), $.__views.__alloyId5 = A$(Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: 10,
        left: 10,
        layout: "horizontal"
    }), "View", $.__views.addWindow), $.__views.addWindow.add($.__views.__alloyId5), $.__views.__alloyId6 = A$(Ti.UI.createLabel({
        borderColor: "black",
        width: 80,
        height: Ti.UI.SIZE,
        text: "State"
    }), "Label", $.__views.__alloyId5), $.__views.__alloyId5.add($.__views.__alloyId6), $.__views.state = A$(Ti.UI.createTextField({
        left: 5,
        borderColor: "black",
        width: 200,
        height: Ti.UI.SIZE
    }), "TextField", $.__views.__alloyId5), $.__views.__alloyId5.add($.__views.state), $.__views.place_cancel = A$(Ti.UI.createButton({
        title: "Cancel"
    }), "Button", null), $.addTopLevelView($.__views.place_cancel), $.__views.place_save = A$(Ti.UI.createButton({
        title: "Save"
    }), "Button", null), $.addTopLevelView($.__views.place_save), _.extend($, $.__views), _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;