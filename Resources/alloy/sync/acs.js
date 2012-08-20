function getUniqueId(id) {
    if (!id || _.contains(idList, id)) id = getUniqueId(uniqueIdCounter++);
    return idList.push(id), id;
}

function authorize(_callback) {
    var that = this;
    this.Cloud = require("ti.cloud"), this.Cloud.debug = !0, this.Cloud.Users.create({
        username: "CI_ADMIN",
        password: "password",
        name: "CI_ADMIN",
        password_confirmation: "password"
    }, function(e) {
        if (e.success) {
            that.authorized = e.success;
            var user = e.users[0];
            Ti.App.fireEvent("app.loggedin", {}), _callback(!0);
        } else that.Cloud.Users.login({
            login: "CI_ADMIN",
            password: "password"
        }, function(e) {
            that.authorized = e.success;
            if (e.success) {
                var user = e.users[0];
                Ti.App.fireEvent("app.loggedin", {}), _callback(!0);
            } else Ti.API.error(e), _callback(!1);
        });
    });
}

function Sync(model, method, opts) {
    var dao = model.dao, processRequest = function(method, model, options) {
        switch (method) {
          case "read":
            model.id ? dao.find(model, function(data) {
                options.success(data), model.trigger("fetch");
            }) : dao.findAll(null, function(data) {
                options.success(data), model.trigger("fetch");
            });
            break;
          case "create":
            dao.create(model, function(data) {
                options.success(data), model.trigger("fetch");
            });
            break;
          case "update":
            dao.update(model, function(data) {
                options.success(data), model.trigger("fetch");
            });
            break;
          case "delete":
            dao.destroy(model, function(data) {
                options.success(data), model.trigger("fetch");
            });
        }
    };
    this.authorized ? processRequest(method, model, opts) : authorize(function(retval) {
        if (!retval) return typeof callback == "function" && callback(!1), !1;
        processRequest(method, model, opts);
    });
}

var Alloy = require("alloy"), _ = require("alloy/underscore")._, TAP = Ti.App.Properties, idList = [], uniqueIdCounter = 1;

module.exports.Adapter = function() {
    this.authorized = !1;
}, module.exports.sync = Sync, module.exports.beforeModelCreate = function(config) {
    return config = config || {}, config.columns = config.columns || {}, config.defaults = config.defaults || {}, config.columns.id = "Int", config.defaults.id = getUniqueId(), config;
};