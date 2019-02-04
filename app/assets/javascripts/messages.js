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
      $(".text__holder")[0].reset();
    })
    .fail(function(){
      alert('error');
    })
  });

  var interval = setInterval(function() {
    if (location.href.match(/\/groups\/\d+\/messages/)){
      var message_id = $('.chat__chat').last().data('id');
      $.ajax({
        url: location.href,
        type: "GET",
        data: {id: message_id},
        dataType: "json"
      })
      .done(function(data) {
        data.forEach(function(message) {
          var html = buildHTML(message);
          $('.message-contents__chats').append(html);
          $('.text__holder').val();
        })
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    } else {
      clearInterval(interval);
    }
  } , 5000 );
});
