
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

    filter: function (model) {
        return model.get('isArchived');
    }
});