// YOUR CODE HERE:

// TODO:
/*
Filter messages by room - case insensitive
adding friends
CSS - materialize
*/
var app;

$(function(){
  app = {
    server: 'https://api.parse.com/1/classes/chatterbox',
    username: "very_doge",
    rooms:{"lobby":"lobby"},
    messages: [],
    init: function(){
      //setInterval(app.fetch.bind(app),5000);
      app.fetch();
      console.log("init");
    },
    fetch: function(){
      $.ajax({
        // This is the url you should use to communicate with the parse API server.
        url: this.server,
        type: 'GET',
        data: JSON.stringify(message), // data: {order: "-createdAt"},
        contentType: 'application/json',
        success: function (data) {
          console.log("success");
          app.messages = data.results;
          for(var i=0; i<data.results.length; i++){
            app.rooms[data.results[i].roomname] = data.results[i].roomname;
          }
        app.refresh();
        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message');
        }
      });
    },
    send: function(message){
      console.log(message);
      $.ajax({
        // This is the url you should use to communicate with the parse API server.
        url: this.server,
        type: 'POST',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function (data) {
          console.log('chatterbox: Message sent');
          app.refresh();
        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message');
        }

      });
    },
    displayMessages: function(){ // filter by room
      console.log("displaying", this.messages.length);
      for(var i = 0; i< this.messages.length; i++){
        app.addMessage(this.messages[i]);
      }
    },
    refresh:function(){
      app.clearMessages();
      app.displayMessages();
      app.refreshRooms();
    },
    clearMessages: function(){
      $("#chats").empty();
    },
    addMessage: function(message){
      var $container = $(document.createElement('div'));
      $container.addClass("chat s12 z-depth-2 teal white-text");
      var $row = $(document.createElement('div'));
      $row.addClass("row");
      var $title = $(document.createElement('h6'));
      $title.addClass("col s12 left");
      $title.html("<b>" + _.escape(message.username)+ " </b>("+ _.escape(message.roomname)+")");
      var $message = $(document.createElement('p'));
      $message.addClass("col s12");
      $message.html(_.escape(message.text));
      // $container.addClass("chat col s12 left") //container
      // var $username = $(document.createElement('p'));
      // $username.html(_.escape(message.username)+":");
      // $username.addClass("username");
      // var $message = $(document.createElement('p'));
      // $message.addClass("message");
      // $message.html(_.escape(message.text));
      // var $room = $(document.createElement('p'));
      // $room.html(_.escape(message.roomname));
      $row.append($title);
      $row.append($message);
      $container.append($row);
      $('#chats').append($container);
    },
    addRoom: function(roomName){
        app.rooms[roomName] = roomName;
        $('#roomSelect').append('<option value='+roomName+'>'+roomName+'</option>');
        $('#roomPick').append('<option value='+roomName+'>'+roomName+'</option>');

    },
    refreshRooms: function(){
      $('#roomSelect').html("");
      $('#roomPick').html("");
      for(var key in app.rooms){
        app.addRoom(key);
      }
    },
    addFriend: function(){},
    handleSubmit: function(){
      var message = {
        username: app.username,
        text: $('#message').val(),
        roomname: $('#roomPick').val()
      };
      app.send(message);
      app.refresh();
    }
  };
}())
