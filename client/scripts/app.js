// YOUR CODE HERE:

// TODO:
/*
Get create room button to work
Filter messages by room - case insensitive
Finish app.init
adding friends
CSS - materialize
*/
var app;

$(function(){
  app = {
    server: 'https://api.parse.com/1/classes/chatterbox',
    username: "hiii",
    rooms:{"lobby":"lobby"},
    messages: [],
    init: function(){
      // Fetch all of the Data - place in an array of objects
      // Build roomList
      console.log(app.rooms);
      for (var key in app.rooms){
        app.addRoom(key);
      }
      // Display messages
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
          console.log(data.results);
          // console.log(_.pluck(data.results,"roomName"));
          app.messages = data.results;
          for(var i=0; i<data.results.length; i++){
            app.rooms[data.results[i].roomName] = data.results[i].roomName;
            // console.log(_.pluck(data.results[i],"roomname"));
            console.log(data.results[i]);
          }
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
        this.addMessage(this.messages[i]);
      }
    },
    refresh:function(){
      this.clearMessages();
      this.displayMessages();
    },
    clearMessages: function(){
      $("#chats").empty();
    },
    addMessage: function(message){
      var $container = $(document.createElement('div'));
      $container.addClass("chat") //container
      var $username = $(document.createElement('p'));
      $username.html(message.username+":");
      $username.addClass("username");
      var $message = $(document.createElement('p'));
      $message.addClass("message");
      $message.html(_.escape(message.text));
      $container.append($username);
      $container.append($message);
      $('#chats').append($container);
      console.log("addMessage");
    },
    addRoom: function(roomName){
      if (_.indexOf(this.rooms,roomName) < 1){
        $('#roomSelect').append('<option value='+roomName+'>'+roomName+'</option>');
        app.rooms[roomName] = roomName;
      }
    },
    addFriend: function(){},
    handleSubmit: function(){
      var message = {
        username: app.username,
        text: $('#message').val(),
        roomname: $('#roomSelect').val()
      };
      app.send(message);
      app.refresh();
    }
  };
}())
