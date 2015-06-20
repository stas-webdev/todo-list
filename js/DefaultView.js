
module.exports = Marionette.LayoutView.extend({
    'template': '#tpl_DefaultView',

    regions: {
        formRegion: '#TopBlock',
        listRegion: '#ItemsList'
    },

    ui: {
        form: '#Form_NewTask'
    },

    events: {
        'submit @ui.form': 'onFormSubmit'
    },

    onFormSubmit: function (e) {
        e.preventDefault();
        var data = $(e.target).serializeArray();
        e.target.reset();
        this.trigger('item:create', { data: data });
    }
});