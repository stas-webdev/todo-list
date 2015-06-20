var Controller = require('./inbox/InboxController');

var app = new Marionette.Application();

app.addRegions({
    regionMain: '#RegionMain'
});

app.on('start', function () {
    this.controller = new Controller();
    this.controller.collection.fetch().then(function () {
        this.regionMain.show(this.controller.mainView);
    }.bind(this))
});

$(document).ready(function () {
    app.start();
});