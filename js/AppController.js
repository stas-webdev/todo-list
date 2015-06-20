
var InboxController = require('./inbox/InboxController');
var ArchiveController = require('./archive/ArchiveController');

module.exports = Marionette.Controller.extend({

    initialize: function () {
        this.inboxController = new InboxController();
        this.listenTo(this.inboxController, 'view:open', this.onViewOpen);
        this.listenTo(this.inboxController, 'item:archive', this.onItemArchive);

        this.archiveController = new ArchiveController();
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
        model.destroy({ silent: (!!args.silentDestroy) });
        this.archiveController.addItem(model);
    },

    onItemActivate: function (args) {
        //console.log('on Item Activate', arguments);
        var model = args.model;
        model.destroy();
        model.set('completed', false);
        this.inboxController.addItem(model);
    }
});