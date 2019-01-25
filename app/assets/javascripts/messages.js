$(function() {
  function buildHTML(message){
    var imagehtml = '';
    if (message.image.url) {
      imagehtml = `<img src="${ message.image.url }">`;
    }

    var html = `<div class="chats__chat">
                  <div class="chat__name">
                    ${ message.name }
                  </div>
                  <div class="chat__date">
                    ${ message.time }
                  </div>
                  <div class="chat__message">
                    ${ message.content }
                    ${ imagehtml }
                  </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-contents__chats').append(html)
      $('.text__holder').val('')
      $('#submit_button').prop('disabled', false)
    })
  })
});
