
var ItemView = Marionette.ItemView.extend({
    template: '#tpl_Archive_ListItemView',
    tagName: 'li',
    className: 'list-item',

    ui: {
        'activate': '.ui-activate'
    },

    triggers: {
        'click @ui.activate': 'activate'
    },

    onRender: function () {
        if (this.model.get('completed'))
            this.$el.addClass('completed');
    }
});

module.exports = Marionette.CompositeView.extend({
    template: '#tpl_Archive_MainView',
    childView: ItemView,
    childViewContainer: '.list-body',
    childViewEventPrefix: 'item',
    className: 'list-view'
});