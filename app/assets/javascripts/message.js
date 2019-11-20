$(function(){
  function appendMessage(message) {
    let html = `<div class="message">
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
      $('.input-box__text').val('')
      $('form')[0].reset();
      $('.input__submit--btn').removeAttr("disabled");
    })
    .fail(function(){
      alert('エラー')
    })
  })
});