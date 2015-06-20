var MainView = require('./ArchiveMainView');

var ArchiveCollection = Backbone.Collection.extend({
    localStorage: new Backbone.LocalStorage('Archive')
});

module.exports = Marionette.Controller.extend({

    mainView: null,

    initialize: function () {
        this.collection = new ArchiveCollection();
    },

    open: function () {
        this.collection.fetch().then(function () {
            this.mainView = new MainView({ collection: this.collection });
            this.trigger('view:open', { view: this.mainView });
        }.bind(this));
    },

    addItem: function (model) {
        this.collection.add(model);
        model.save();
        return this;
    }
});