
var ArchiveController = require('./archive/ArchiveController');
var InboxMainView = require('./inbox/InboxMainView');

var TasksCollection = require('./model/TasksCollection');

module.exports = Marionette.Controller.extend({

    initialize: function () {
        this.tasksCollection = new TasksCollection();

        this.archiveController = new ArchiveController({
            collection: this.tasksCollection
        });
        this.listenTo(this.archiveController, 'view:open', this.onViewOpen);
        this.listenTo(this.archiveController, 'item:data:change', this.onTaskDataChanged);
    },

    openInbox: function () {
        //console.log('open Inbox');
        this.tasksCollection.fetch().then(function () {
            var mainView = new InboxMainView();
            mainView.collection = this.tasksCollection;
            this.listenTo(mainView, 'item:create', this.onItemCreate);
            this.listenTo(mainView, 'item:data:change', this.onTaskDataChanged);
            this.trigger('view:open', { view: mainView });
        }.bind(this));
    },

    openArchive: function () {
        //console.log('open Archive');
        this.archiveController.open();
    },

    onViewOpen: function (args) {
        //console.log('onViewOpen', arguments);
        this.trigger('view:open', args);
    },

    onItemCreate: function (args) {
        //console.log('onItemCreate', arguments);
        this.tasksCollection.create(args.data);
    },

    onTaskDataChanged: function (args) {
        args.model.save().then();
    }
});