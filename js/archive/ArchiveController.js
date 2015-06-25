var MainView = require('./ArchiveMainView');

module.exports = Marionette.Controller.extend({

    mainView: null,

    initialize: function (options) {
        options = options || {};
        this.collection = options.collection;
    },

    open: function () {
        this.collection.fetch().then(function () {
            this.mainView = new MainView({ collection: this.collection });
            this.bindViewEvents(this.mainView);
            this.trigger('view:open', { view: this.mainView });
        }.bind(this));
    },

    bindViewEvents: function (view) {
        this.listenTo(view, 'item:activate', this.onItemActivate);
        this.listenTo(view, 'item:delete', this.onItemDelete);
    },

    addItem: function (model) {
        model.set('isArchived', true);
        return this;
    },

    onItemActivate: function (itemView, args) {
        //console.log('item activate', arguments);
        this.trigger('item:activate', args);
    },

    onItemDelete: function (itemView, args) {
        args.model.destroy();
    }
});