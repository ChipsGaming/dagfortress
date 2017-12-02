$(function(){
  var tape = (function($el, model){
    return {
      add: function(message){
        $el.prepend(
          '<li>' +
            message +
          '</li>'
        );
        if($el.find('li').length > 5){
          $el.find('li:last-child').remove();
        }
      }
    };
  })($('#tape'), {});

  var panel = (function($el, model){
    var $content = $el.find('#content'),
      $authorId = $el.find('#author_id'),
      $authorName = $el.find('#author_name'),
      $submit = $el.find('#submit');

    $submit.on('click', function(){
      model.tape.add(
        $content.val()
      );

      $.ajax('/submit', {
        method: 'POST',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
          content: $content.val(),
          author: {
            id: $authorId.val(),
            username: $authorName.val()
          }
        })
      })
      .then(function(response){
        model.tape.add(
          response
            .replace(/(?:\r\n|\r|\n)/g, '<br />')
            .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
            .replace(/~~(.+?)~~/g, '<s>$1</s>')
        );
        $content.val('');
      });

      return false;
    });
  })($('#panel'), {tape: tape});
});
