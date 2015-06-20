var Controller = require('./DefaultController');

var app = new Marionette.Application();

app.addRegions({
    regionMain: '#RegionMain'
});

app.on('start', function () {
    this.controller = new Controller();
    this.controller.collection.fetch().then(function () {
        this.regionMain.show(this.controller.defaultView);
    }.bind(this))
});

$(document).ready(function () {
    app.start();
});