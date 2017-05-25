$(function() {
  
  // roll the responses
  $('#count_btn').click(function(event){
    event.preventDefault();
    
    var n = $('#counting').val();
    var g = $('#grammar').val();
    
    var data = {
      "counting": n
    };
    if (g != 'default') {
        data["grammar"] = g;
    }
    
    console.log("grammar: " + g);

    $.get({
      url: '/roll',
      data: data,
      success: function(response) {
        var txt = '';
        var values = $.map(response, function(value, key) { return value });
        values.forEach(function(v) {
          var y = v.replace(/\n/g, "<br />");
          txt += `<div>${y}</div>`;
        });
        $('#rolling').html(txt);
        
        if (g === 'default') {
          $('#rolling div').toggleClass('default');  
        }
      }
    })

  });
  
});