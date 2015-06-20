
var MainView = require('./InboxMainView');
var ItemsCollectionView = require('./InboxItemsCollectionView');

var ItemsCollection = Backbone.Collection.extend({
    localStorage: new Backbone.LocalStorage('Inbox')
});

module.exports = Marionette.Controller.extend({

    initialize: function () {
        this.collection = new ItemsCollection();

        this.mainView = new MainView();
        this.listenTo(this.mainView, 'render', this.onMainViewRender);
        this.listenTo(this.mainView, 'item:create', this.onUICreateItem);

        this.listView = new ItemsCollectionView({ collection: this.collection });
        this.listenTo(this.listView, 'item:complete', this.onUICompleteItem);
    },

    onMainViewRender: function () {
        this.mainView.listRegion.show(this.listView);
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
        args.model.save();
        itemView.render();
    }
});