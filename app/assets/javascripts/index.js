$(function() {

  var search_list = $("#user-search-result");

function appendUser(user) {
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${ user.name }</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
              </div>`
  search_list.append(html);
}

function appendNoUser(user) {
  var html = `<p>
                <div class="chat-group-user__name">${ user }</div>
              </p>`
  search_list.append(html);
}

function addUser(name, user_id) {
  var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value='${ user_id }'>
                <p class='chat-group-user__name'>${ name }</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`
    $('#chat-group-users').append(html);
}


  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    if (input == ""){
      $("#user-search-result").empty();
    }
    else {
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { name: input },
        dataType: 'json'
      })
      .done(function(data) {
        $("#user-search-result").empty();
        if (data.length !== 0) {
          data.forEach(function(user){
            appendUser(user);
          });
        }
        else {
          appendNoUser("一致するユーザーがいません");
        }
      })
      .fail(function() {
        alert('ユーザー検索に失敗しました')
      })
    }
  });

  $("#user-search-result").on("click", ".chat-group-user__btn--add", function() {
    var name = $(this).data("user-name");
    var user_id = $(this).data("user-id");
    addUser(name, user_id);
    $(this).parent().remove();
  })
});
