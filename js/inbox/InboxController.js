
var MainView = require('./InboxMainView');
var ItemsCollectionView = require('./InboxItemsCollectionView');

var ItemsCollection = Backbone.Collection.extend({
    localStorage: new Backbone.LocalStorage('Inbox')
});

module.exports = Marionette.Controller.extend({

    mainView: null,

    initialize: function () {
        this.collection = new ItemsCollection();
    },

    open: function () {
        if (this.mainView) this.stopListening(this.mainView);
        this.mainView = new MainView({ collection: this.collection });
        this.bindViewEvents(this.mainView);
        this.trigger('view:open', { view: this.mainView });

        if (this.listView) this.stopListening(this.listView);
        this.listView = new ItemsCollectionView({ collection: this.collection });
        this.bindViewEvents(this.listView);
        this.collection.fetch().then(function () {
            this.listView.render();
            this.mainView.listRegion.show(this.listView);
        }.bind(this));
    },

    bindViewEvents: function (view) {
        this.listenTo(view, 'item:create', this.onUICreateItem);
        this.listenTo(view, 'item:complete', this.onUICompleteItem);
        return this;
    },

    addItem: function (model) {
        this.collection.add(model);
        model.save();
        return this;
    },

    onUICreateItem: function (args) {
        //console.log('onUICreateItem', arguments);
        var modelData = {
            completed: false
        };
        args.data.forEach(function (attr) {
            if ('undefined' === typeof attr.name || !attr.name) return;
            modelData[attr.name] = attr.value;
        });
        this.collection.create(modelData);
    },

    onUICompleteItem: function (itemView, args) {
        //console.log('onUICompleteItem', arguments);
        args.model.set('completed', !args.model.get('completed'));
        this.trigger('item:archive', args);
    }
});