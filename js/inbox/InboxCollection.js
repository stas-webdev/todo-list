
var Model = Backbone.Model.extend({
    defaults: function () {
        return {
            created: (new Date()).toUTCString(),
            lastChanged: (new Date()).toUTCString(),
            completed: false
        }
    },

    save: function () {
        this.setLastChanged();
        return Backbone.Model.prototype.save.apply(this, arguments);
    },

    setLastChanged: function () {
        var updData = { lastChanged: (new Date()).toUTCString() };
        var options = { silent: true };
        this.set(updData, options);
        return this;
    }
});

module.exports = Backbone.Collection.extend({
    localStorage: new Backbone.LocalStorage('Inbox'),

    model: Model,

    comparator: function (model) {
        return -(new Date(model.get('lastChanged')));
    }
});