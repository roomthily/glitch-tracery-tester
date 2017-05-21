var express = require('express'),
    bodyParser = require('body-parser'),
    formidable = require("express-formidable"),
    grammars = require('./public/tracery.js');
    //grammar = require('./public/tracery.js').grammar; 

require('events').EventEmitter.defaultMaxListeners = 0

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(formidable());


app.use(express.static('public')); // serve static files like index.html http://expressjs.com/en/starter/static-files.html


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/roll', (req, res) => {
  var n = req.query.counting != undefined ? req.query.counting  : -1;
  console.log("served number: " + n);
  
  if (n < 0) {
    res.send({"reading": "troubles"});
    return;
  }
  
  // it is okay to be undefined
  var gram = req.query.grammar;
  
  var responses = {};
  for (var i=0; i < n; i++) {
    console.log('hi');
    responses[i] = generateStatus(gram);
  }
  
  res.json(responses);
});

function generateStatus(grammar) {
  // Generate a new tweet using our grammar
  // make sure an "origin" entry is in your grammar.json file, *any* grammar file
  var g;
  if (grammar === undefined) {
    console.log("rolling default");
    g = grammars.grammar; 
  } else {
    console.log("rolling " + grammar);
    g = grammars.use_grammar(grammar);
  }
  return g.flatten("#origin#");
  
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
