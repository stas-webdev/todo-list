
var CreateForm = require('./InboxCreateForm');
var ListView = require('./InboxItemsCollectionView');

module.exports = Marionette.LayoutView.extend({
    'template': '#tpl_Inbox_MainView',

    regions: {
        formRegion: '#TopBlock',
        listRegion: '#ItemsList'
    },

    ui: {
        form: '#Form_NewTask'
    },

    initialize: function () {
        this.createForm = new CreateForm();
        this.listenTo(this.createForm, 'submit', this.onCreateFormSubmit);
    },

    onRender: function () {
        //console.log('InboxMainView.onRender', arguments);
        this.formRegion.show(this.createForm);
    },

    onCreateFormSubmit: function (args) {
        //console.log('InboxMainView.onCreateFormSubmit', arguments);
        this.trigger('item:create', args);
    }
});