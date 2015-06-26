
var ItemView = Marionette.ItemView.extend({
    template: '#tpl_Archive_ListItemView',
    tagName: 'li',
    className: 'list-item',

    ui: {
        'activate': '.ui-activate',
        'delete': '.ui-delete'
    },

    triggers: {
        'click @ui.activate': 'activate',
        'click @ui.delete': 'delete'
    },

    onRender: function () {
        if (this.model.get('isCompleted'))
            this.$el.addClass('completed');
    }
});

module.exports = Marionette.CompositeView.extend({
    template: '#tpl_Archive_MainView',
    childView: ItemView,
    childViewContainer: '.list-body',
    childViewEventPrefix: 'item',
    className: 'list-view',

    childEvents: {
        'activate': 'onTaskActivate',
        'delete': 'onItemDelete'
    },

    filter: function (model) {
        return model.get('isArchived');
    },

    onTaskActivate: function (itemView, args) {
        args.model.set('isArchived', false);
        args.model.set('isCompleted', false);
        args.model.set('isInbox', true);
        this.trigger('item:data:change', args);
        itemView.remove();
    },

    onItemDelete: function (itemView, args) {
        this.trigger('item:delete', args);
    }
});