$(document).ready(function() {

  $('#pageContent > form').submit(function(event) {
    event.preventDefault();
    // $(this).serializeArray()[0].value
    $.post( `/login`, {
      user_id: $(this).serializeArray()[0].value
    })

  });

});
