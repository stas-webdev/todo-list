var AppRouter = require('./AppRouter');
var TasksController = require('./TasksController');

var app = new Marionette.Application();

app.addRegions({
    regionMain: '#RegionMain'
});

app.on('start', function () {
    this.controller = new TasksController();
    this.controller.on('view:open', onMainViewOpen);
    this.router = new AppRouter({ controller: this.controller });
    Backbone.history.start();
});

$(document).ready(function () {
    app.start();
});

function onMainViewOpen (args) {
    app.regionMain.show(args.view);
}