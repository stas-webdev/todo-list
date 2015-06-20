
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

    onRender: function () {
        this.$el.toggleClass('completed', !!this.model.get('completed'));
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
    className: 'list-body'
});