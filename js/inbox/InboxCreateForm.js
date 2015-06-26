
module.exports = Backbone.View.extend({
    template: '#tpl_Inbox_CreateForm',
    tagName: 'form',

    events: {
        'submit': 'onSubmit'
    },

    render: function () {
        var template = $(this.template).html();
        this.$el.empty().html(_.template(template));
        return this;
    },

    onSubmit: function (e) {
        e.preventDefault();
        var data = $(e.target).serializeArray();
        e.target.reset();
        this.trigger('submit', { data: data });
    }
});