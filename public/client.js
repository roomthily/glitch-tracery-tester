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
    
    var url = '/roll';  // for tracery bots
    
    if (['cat-keyboard'].includes(g)) {
      // for special flower bots
      url = '/keyboard';
    } else if (['international-bees'].includes(g)) {
      url = '/buzz';
    }

    $.get({
      url: url,
      data: data,
      success: function(response) {
        var txt = '';
        var values = $.map(response, function(value, key) { return value });
        values.forEach(function(v) {
          var y = v.replace(/\n/g, "<br />");
          txt += `<div>${y}</div>`;
        });
        $('.results').html(txt);
        
        if (g === 'default') {
          $('.results div').toggleClass('default');  
        }
      }
    })

  });
  
});