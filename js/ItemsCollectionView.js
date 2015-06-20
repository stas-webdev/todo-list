
var ItemView = Marionette.ItemView.extend({
    template: '#tpl_Items_ListItem',

    ui: {
        'complete': '.ui-complete'
    },

    triggers: {
        'click @ui.complete': 'complete'
    }
});

module.exports = Marionette.CollectionView.extend({
    childView: ItemView,
    childViewEventPrefix: 'item'
});