$(function() {
  
  // roll the responses
  $('#count_btn').click(function(event){
    event.preventDefault();
    
    var n = $('#counting').val();

    $.get({
      url: '/roll',
      data: {"counting": n},
      success: function(response) {
        var txt = '';
        var values = $.map(response, function(value, key) { return value });
        values.forEach(function(v) {
          var y = v.replace(/\n/g, "<br />");
          txt += `<div>${y}</div>`;
        });
        $('#rolling').html(txt);
      }
    })

  });
  
});