
var InboxMainView = require('./inbox/InboxMainView');
var ArchiveMainView = require('./archive/ArchiveMainView');

var TasksCollection = require('./model/TasksCollection');

module.exports = Marionette.Controller.extend({

    initialize: function () {
        this.tasksCollection = new TasksCollection();
    },

    openInbox: function () {
        //console.log('open Inbox');
        this.tasksCollection.fetch().then(function () {
            var mainView = new InboxMainView();
            mainView.collection = this.tasksCollection;
            this.bindViewEvents(mainView);
            this.trigger('view:open', { view: mainView });
        }.bind(this));
    },

    openArchive: function () {
        //console.log('open Archive');
        this.tasksCollection.fetch().then(function () {
            var archiveView = new ArchiveMainView({
                collection: this.tasksCollection
            });
            this.bindViewEvents(archiveView);
            this.trigger('view:open', { view: archiveView });
        }.bind(this));
    },

    bindViewEvents: function (view) {
        this.listenTo(view, 'item:create', this.onItemCreate);
        this.listenTo(view, 'item:delete', this.onItemDelete);
        this.listenTo(view, 'item:data:change', this.onTaskDataChanged);
        return this;
    },

    onItemCreate: function (args) {
        //console.log('onItemCreate', arguments);
        this.tasksCollection.create(args.data);
    },

    onItemDelete: function (args) {
        args.model.destroy();
    },

    onTaskDataChanged: function (args) {
        args.model.save().then();
    }
});