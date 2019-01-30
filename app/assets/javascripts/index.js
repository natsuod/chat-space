$(function() {
  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

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
    fail(function() {
      alert('ユーザー検索に失敗しました')
    })
  });
});
