// YOUR CODE HERE:

var app;

$(function(){
  app = {

    username: "hiii",
    init: function(){
      console.log("init");},
    fetch: function(){
      $.ajax({
        // This is the url you should use to communicate with the parse API server.
        type: 'GET',
        data: JSON.stringify(message), // data: {order: "-createdAt"},
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
    send: function(message){
      console.log(message);
      $.ajax({
        // This is the url you should use to communicate with the parse API server.
        url: 'https://api.parse.com/1/classes/chatterbox',
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
    display: function(){},
    refresh:function(){},
    escape: function(){},
    login: function(){},
    clearMessages: function(){
      $("#chats").empty();
    },
    addMessage: function(message){
      var $container = $(document.createElement('div'));
      $container.addClass("messageContainer") //container
      var $username = $(document.createElement('p'));
      $username.html(message.username+":");
      $username.addClass("username");
      var $message = $(document.createElement('p'));
      $message.addClass("message");
      $message.html(message.message);
      $container.append($username);
      $container.append($message);
      $('#chats').append($container);


    },
    addRoom: function(){},
    addFriend: function(){},
    handleSubmit: function(){}




  };





}())
