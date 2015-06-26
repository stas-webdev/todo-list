
var CreateForm = require('./InboxCreateForm');
var ListView = require('./InboxItemsCollectionView');

module.exports = Marionette.LayoutView.extend({

    'template': '#tpl_Inbox_MainView',

    regions: {
        form: '.form-block',
        list: '.list-view'
    },

    onRender: function () {
        var createForm = new CreateForm();
        this.listenTo(createForm, 'submit', this.onFormSubmit);
        this.getRegion('form').show(createForm);

        var listView = new ListView({
            collection: this.collection
        });
        this.listenTo(listView, 'item:complete', this.onItemComplete);
        this.getRegion('list').show(listView);
    },

    onFormSubmit: function (args) {
        var modelData = {};
        modelData.isInbox = true;
        args.data.forEach(function (attr) {
            if ('undefined' === typeof attr.name || !attr.name) return;
            modelData[attr.name] = attr.value;
        });
        this.trigger('item:create', { data: modelData });
    },

    onItemComplete: function (itemView, args) {
        var toggleValue = !args.model.get('isCompleted');
        args.model.set('isCompleted', toggleValue);
        args.model.set('isInbox', !toggleValue);
        args.model.set('isArchived', toggleValue);
        this.trigger('item:data:change', args);
    }
});