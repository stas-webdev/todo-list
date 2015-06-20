
module.exports = Marionette.AppRouter.extend({

    routes: {
        '': 'defaultAction'
    },

    appRoutes: {
        'inbox': 'openInbox',
        'archive': 'openArchive'
    },

    defaultAction: function () {
        this.navigate('inbox', { trigger: true });
    }
});