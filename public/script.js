///<reference path=".\typings\all.d.ts" />

var ClientMessageProcessor = {
    socket: io.connect(),
    init: function(){
        ClientMessageProcessor.viewEvents();

        ClientMessageProcessor.socket.on('message', function(data){
            ClientMessageProcessor.pushMessageToView(data.username, data.message);
        });
    },
    sendUsername: function(username){
        if(username){
            ClientMessageProcessor.socket.emit('username', username);
        }
    },
    sendMessage: function(message){
        if(message){
            ClientMessageProcessor.socket.emit('message', message);
            ClientMessageProcessor.pushMessageToView("Me", message);
        }
    },

    viewEvents: function(){
        $('#message_control_panel').hide();

        $('#username_panel button').on('click', function(){
            var usr = $('#username_panel input[type="text"]').prop('value');
            ClientMessageProcessor.sendUsername(usr);
            ClientMessageProcessor.removeUserNamePanel();
        });
        $('#message_panel button').on('click', function(){
            var msg = $('#message_panel input[type="text"]').prop('value');
            ClientMessageProcessor.sendMessage(msg);
        });

        $('#username_panel input[type="text"]').on('focus', function(){
            $('#username_panel input[type="text"]').on('keyup', function(evt){
                if(evt.keyCode == 13){
                    var usr = $('#username_panel input[type="text"]').prop('value');
                    ClientMessageProcessor.sendUsername(usr);
                    ClientMessageProcessor.removeUserNamePanel();
                }
            });
        });
        $('#message_panel input[type="text"]').on('focus', function(){
            $('#message_panel input[type="text"]').on('keyup', function(evt){
                if(evt.keyCode == 13){
                    var msg = $('#message_panel input[type="text"]').prop('value');
                    ClientMessageProcessor.sendMessage(msg);
                }
            });
        });
    },
    removeUserNamePanel: function(){
        $('#username_panel input[type="text"]').prop('value','');
        $('#username_panel').hide();
        $('#message_control_panel').show();
        $('#message_panel input[type="text"]').focus();
    },
    pushMessageToView: function(username, message){
        $('#message_panel input[type="text"]').prop('value','');
        $('#chatEntries').append('<div class="message message_me"><p>'+username+' : '+message+'</p></div>');
    }
}

$(function(){
    ClientMessageProcessor.init();
});
