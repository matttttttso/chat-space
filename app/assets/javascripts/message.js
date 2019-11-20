$(function(){
  function appendMessage(message) {
    var html = `<div class="message">
                  <div class="message__info">
                    <div class="message__info--name">
                      ${message.username}
                    </div>
                    <div class="message__info--date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="message__text">
                    <p class="message__text__content">
                      ${message.content}
                    </p>
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
      $('.input-box__text').val('')
    })
    .fail(function(){
      alert('エラー')
    })
  })
});