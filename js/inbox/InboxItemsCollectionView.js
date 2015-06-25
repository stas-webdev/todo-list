
var ItemView = Marionette.ItemView.extend({
    template: '#tpl_Items_ListItem',
    tagName: 'li',
    className: 'list-item',

    ui: {
        'complete': '.ui-complete',
        'details': '.ui-details'
    },

    triggers: {
        'click @ui.complete': 'complete'
    },

    events: {
        'click @ui.details': 'onUIDetailsClick'
    },

    modelEvents: {
        'change': 'render'
    },

    onRender: function () {
        this.$el.toggleClass('completed', !!this.model.get('isCompleted'));
    },

    onDetailsClick: function (e) {
        console.log('onUIDetails', arguments);
        e.preventDefault();
    }
});

module.exports = Marionette.CollectionView.extend({
    childView: ItemView,
    childViewEventPrefix: 'item',
    tagName: 'ul',
    className: 'list-body',

    filter: function (model) {
        return model.get('isInbox');
    },

    viewComparator: function (model) {
        return -(new Date(model.get('lastChanged')));
    }
});