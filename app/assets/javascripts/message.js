$(function(){
  function appendMessage(message) {
  let html = `<div class="message" data-id=${message.id}>
                <div class="message__info">
                  <div class="message__info--name">
                    ${message.username}
                  </div>
                  <div class="message__info--date">
                    ${message.created_at}
                  </div>
                </div>
                <div class="message__text">
                  <p class="message__text__content">
                    ${message.content}
                  </p>
                  ${message.image_url ? `<img src="${message.image_url}">` : ""}
                </div>
              </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = appendMessage(message);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('form')[0].reset();
      $('.input__submit--btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました")
      $('.input__submit--btn').prop('disabled', false);
    })
  })

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function(message) {
          insertHTML += appendMessage(message); 
        })
        $('.messages').append(insertHTML);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, { duration: 10});
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 7000);
});