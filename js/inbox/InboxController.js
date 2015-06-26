
var MainView = require('./InboxMainView');
var CreateForm = require('./InboxCreateForm');
var ListView = require('./InboxItemsCollectionView');

module.exports = Marionette.Controller.extend({

    initialize: function (options) {
        options = options || {};
        this.collection = options.collection;

        this.mainView = new MainView();
        this.listenTo(this.mainView, 'render', this.onMainViewRender.bind(this));

        this.createForm = new CreateForm();
        this.listenTo(this.createForm, 'submit', this.onUICreateItem);

        this.listView = new ListView({
            collection: this.collection
        });
        this.listenTo(this.listView, 'item:complete', this.onUICompleteItem);
    },

    open: function () {
        this.trigger('view:open', { view: this.mainView });
    },

    onMainViewRender: function (view) {
        //console.log('InboxController.onMainViewRender', arguments);
        view.getRegion('form').show(this.createForm);
        view.getRegion('list').show(this.listView);
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