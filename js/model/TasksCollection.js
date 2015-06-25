
var localStorage = new Backbone.LocalStorage('Tasks');

var Model = Backbone.Model.extend({

    localStorage: localStorage,

    defaults: function () {
        return {
            created: (new Date()).toUTCString(),
            lastChanged: (new Date()).toUTCString(),
            isInbox: false,
            isCompleted: false,
            isArchived: false
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
    localStorage: localStorage,
    model: Model
});