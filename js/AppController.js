
var InboxController = require('./inbox/InboxController');
var ArchiveController = require('./archive/ArchiveController');

var TasksCollection = require('./model/TasksCollection');

module.exports = Marionette.Controller.extend({

    initialize: function () {
        this.tasksCollection = new TasksCollection();

        this.inboxController = new InboxController({
            collection: this.tasksCollection
        });
        this.listenTo(this.inboxController, 'view:open', this.onViewOpen);
        this.listenTo(this.inboxController, 'item:archive', this.onItemArchive);

        this.archiveController = new ArchiveController({
            collection: this.tasksCollection
        });
        this.listenTo(this.archiveController, 'view:open', this.onViewOpen);
        this.listenTo(this.archiveController, 'item:activate', this.onItemActivate);
    },

    openInbox: function () {
        //console.log('open Inbox');
        this.inboxController.open();
    },

    openArchive: function () {
        //console.log('open Archive');
        this.archiveController.open();
    },

    onViewOpen: function (args) {
        //console.log('onViewOpen', arguments);
        this.trigger('view:open', args);
    },

    onItemArchive: function (args) {
        //console.log('onItemArchive', arguments);
        var model = args.model;
        this.archiveController.addItem(model);
        model.save();
    },

    onItemActivate: function (args) {
        //console.log('on Item Activate', arguments);
        var model = args.model;
        model.set('isArchived', false);
        model.set('isCompleted', false);
        model.set('isInbox', true);
        this.inboxController.addItem(model);
        model.save();
    }
});