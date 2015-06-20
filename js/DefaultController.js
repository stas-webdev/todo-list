
var DefaultView = require('./DefaultView');
var ItemsCollectionView = require('./ItemsCollectionView');

var ItemsCollection = Backbone.Collection.extend({
    localStorage: new Backbone.LocalStorage('Items')
});

module.exports = Marionette.Controller.extend({

    initialize: function () {
        this.collection = new ItemsCollection();

        this.defaultView = new DefaultView();
        this.listenTo(this.defaultView, 'render', this.onDefaultViewRender);
        this.listenTo(this.defaultView, 'item:create', this.onUICreateItem);

        this.listView = new ItemsCollectionView({ collection: this.collection });
        this.listenTo(this.listView, 'item:complete', this.onUICompleteItem);
    },

    onDefaultViewRender: function () {
        this.defaultView.listRegion.show(this.listView);
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