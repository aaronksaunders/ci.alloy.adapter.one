var Alloy = require("alloy"), model, collection;

model = Alloy.M("place", {
    defaults: {},
    adapter: {
        type: "acs",
        name: "places"
    }
}, function(Model) {
    var DAO = function(db) {
        this.Cloud = require("ti.cloud"), this.Cloud.debug = !0;
        var that = this;
        _.extend(this, {
            findAll: function(params, _callback) {
                var that = this, _options = {
                    per_page: 200,
                    order: "name"
                };
                Ti.API.info("findAll"), params && _.extend(_options, params), that.Cloud.Places.query(_options, function(e) {
                    if (e.success) {
                        if (e.places.length != 0) {
                            var d = [];
                            for (var i in e.places) d.push(new Model(e.places[i]));
                            _callback(d);
                        }
                    } else _callback(null);
                });
            },
            search: function(params, _callback) {
                var that = this;
                Ti.API.info("search"), that.Cloud.Places.search({
                    per_page: 200,
                    order: "name",
                    q: params.q
                }, function(e) {
                    if (e.success) {
                        if (e.places.length != 0) {
                            var d = [];
                            for (var i in e.places) d.push(new Model(e.places[i]));
                            _callback(d);
                        }
                    } else _callback(null);
                });
            },
            query: function(params, _callback) {
                var that = this;
                Ti.API.info("query"), that.Cloud.Places.query({
                    per_page: 200,
                    order: "name",
                    where: params.where
                }, function(e) {
                    if (e.success) {
                        if (e.places.length != 0) {
                            var d = [];
                            for (var i in e.places) d.push(new Model(e.places[i]));
                            _callback(d);
                        }
                    } else _callback(null);
                });
            },
            create: function(model, callback) {
                var that = this;
                Ti.API.info("create"), that.Cloud.Places.create({
                    name: model.get("name"),
                    address: model.get("address"),
                    city: model.get("city"),
                    state: model.get("state"),
                    postal_code: model.get("postal_code")
                }, function(e) {
                    e.success ? Ti.API.info("success") : Ti.API.error("ERROR");
                });
            },
            update: function(model, callback) {
                Ti.API.info("update:model " + JSON.stringify(model)), that.Cloud.Places.update({
                    place_id: model.id,
                    name: model.get("name"),
                    address: model.get("address"),
                    city: model.get("city"),
                    state: model.get("state"),
                    postal_code: model.get("postal_code")
                }, function(e) {
                    e.success ? (Ti.API.info("success"), callback(new Model(e.places[0]))) : (Ti.API.error("ERROR"), callback(null));
                });
            },
            destroy: function(model, callback) {
                Cloud.Places.remove({
                    place_id: model.id
                }, function(e) {
                    e.success ? callback(!0) : callback(!1);
                });
            },
            find: function(model, _callback) {
                var that = this;
                Ti.API.info("find"), that.Cloud.Places.show({
                    place_id: model.id
                }, function(e) {
                    e.success ? e.places.length != 0 && _callback(new Model(e.places[0])) : _callback(null);
                });
            },
            populate: function(callback) {
                console.log("populate"), callback({});
            }
        });
    };
    return Model = Model.extend({
        initialize: function() {
            this.bind("change", this.render, this);
        },
        dao: new DAO,
        idAttribute: "id",
        defaults: {
            country: "United States",
            phone_number: "(212) 555-1212",
            city: "",
            state: ""
        },
        render: function(d) {
            Ti.API.info("called on change of model, update the view here " + JSON.stringify(d));
        }
    });
}, []), collection = Alloy.Backbone.Collection.extend({
    model: model
}), collection.prototype.config = model.prototype.config, exports.Model = model, exports.Collection = collection;