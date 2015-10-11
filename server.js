///<reference path=".\typings\all.d.ts" />

var express = require('express')
var app = express();
var msg_processor = require('./packets/MessageProcessor')(app);
var jade = require('jade');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', {layout: false});
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.render('home.jade');
});

