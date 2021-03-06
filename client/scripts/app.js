var app = {

  server: 'https://api.parse.com/1/classes/chatterbox/',

  init: function(){
    console.log("Chatterbox is loading"); 
    //Get username
    app.username = window.location.search.substr(10);

    app.onscreenMessages = {};    

    app.$text = $('#message');

    app.loadMsgs();
    setInterval(app.loadMsgs.bind(app), 1000);

    $('#send').on('submit', app.handleSubmit)
  },

  handleSubmit: function(e){
    e.preventDefault();

    var message = {
      username: app.username,
      text: app.$text.val()
    }

    app.$text.val('');

    app.sendMsg(message);
  },

  renderMessage: function(message){
    var $user = $("<div>", {class: 'user'}).text(message.username)
    var $text = $("<div>", {class: 'text'}).text(message.text);
    var $message = $("<div>", {class: 'chat', 'data-id': message.objectId}).append($user, $text);
    return $message;
  },

  displayMessage: function(message){
    if(!app.onscreenMessages[message.objectId]){
      var $html = app.renderMessage(message);
      $('#chats').append($html);
      app.onscreenMessages[message.objectId] = true;
    }
  },

  displayMessages: function(messages){
    for (var i = 0; i < messages.length; i++){
      app.displayMessage(messages[i]);
    }
  },

  loadMsgs: function(){
    $.ajax({
        url: app.server,
        type: 'GET',
        data: { order: '-createdAt' },
        contentType: 'application/json',
        success: function (json) {
          console.log('chatterbox: Message sent');
          app.displayMessages(json.results);
        },
        error: function (json) {
          console.error('chatterbox: Failed to send message');
        }
    });
  },


  sendMsg: function(message){
    $.ajax({
        url: app.server,
        type: 'POST',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function (json) {
          console.log('chatterbox: Message sent');
          message.objectId = json.objectId;
          app.displayMessage(message);
        },
        error: function (json) {
          console.error('chatterbox: Failed to send message');
        }
    });
  }
}