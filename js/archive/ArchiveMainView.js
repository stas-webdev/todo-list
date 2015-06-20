
var ItemView = Marionette.ItemView.extend({
    template: '#tpl_Archive_ListItemView'
});

module.exports = Marionette.CollectionView.extend({
    childView: ItemView
});