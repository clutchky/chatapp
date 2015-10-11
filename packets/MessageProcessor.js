///<reference path=".\typings\all.d.ts" />

MessageProcessor = (function(app){
	var server = require('http').Server(app);
	var io = require('socket.io')(server);
	var users = [];
	
	var broadCastMessage = function(socket, data){
		socket.broadcast.emit('message', data);
		console.log(data.username + ' sent ' + data.message);
	}
	var setUserName = function(id, username){
		if(users[id] === undefined){
			users[id] = { username: '' };
		}
		users[id].username = username;

		console.log(username + ' has enterred the pit.');
	}

	function init(){
		server.listen(8080);

		io.on('connection', function(socket){
			socket.on('username', function(data){
				setUserName(socket.id, data);
			});
			socket.on('message', function(data){
				var broadcast_data = {message: data, username: users[socket.id].username}
				broadCastMessage(socket, broadcast_data);
			})
		});
	}
	
	//initialize like a contructor
	init();
});

module.exports = MessageProcessor;