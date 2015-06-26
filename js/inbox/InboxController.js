
var MainView = require('./InboxMainView');
var CreateForm = require('./InboxCreateForm');
var ListView = require('./InboxItemsCollectionView');

module.exports = Marionette.Controller.extend({

    initialize: function (options) {
        options = options || {};
        this.collection = options.collection;
    },

    open: function () {
        this.collection.fetch().then(function () {
            var mainView = new MainView();
            this.listenTo(mainView, 'render', this.onMainViewRender);
            this.trigger('view:open', { view: mainView });
        }.bind(this));
    },

    onMainViewRender: function (view) {
        //console.log('InboxController.onMainViewRender', arguments);
        var createForm = new CreateForm();
        this.listenTo(createForm, 'submit', this.onUICreateItem);
        view.getRegion('form').show(createForm);

        var listView = new ListView({
            collection: this.collection
        });
        this.listenTo(listView, 'item:complete', this.onUICompleteItem);
        view.getRegion('list').show(listView);
    },

    onUICreateItem: function (args) {
        //console.log('onUICreateItem', arguments);
        var modelData = {};
        modelData.isInbox = true;
        args.data.forEach(function (attr) {
            if ('undefined' === typeof attr.name || !attr.name) return;
            modelData[attr.name] = attr.value;
        });
        this.trigger('item:create', { data: modelData });
    },

    onUICompleteItem: function (itemView, args) {
        //console.log('onUICompleteItem', arguments);
        args.model.set('isCompleted', true);
        args.model.set('isInbox', false);
        args.model.set('isArchived', true);
        this.trigger('item:data:change', args);
    }
});