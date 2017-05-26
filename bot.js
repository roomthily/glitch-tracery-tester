var express = require('express'),
    bodyParser = require('body-parser'),
    formidable = require("express-formidable"),
    grammars = require('./public/tracery.js'),
    over_keyboard = require('./public/overengineered-keyboard.js'),
    wrappers = require('./public/wrappers.js'); 

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
  // if no number specified, run once
  var n = req.query.counting != undefined ? req.query.counting  : 1;
  
  // it is okay to be undefined
  var gram = req.query.grammar;
  
  var responses = {};
  for (var i=0; i < n; i++) {
    console.log('hi');
    responses[i] = generateStatus(gram);
  }
  
  res.json(responses);
});

app.get('/keyboard', (req, res) => {
  try {
    // create a fake commit, glitch style (with emoji!)
    var n = req.query.counting != undefined ? req.query.counting  : 1;

    var responses = {};
    for (var i=0; i<n; i++) {
      var result = over_keyboard.generate();
      responses[i] = wrappers.emoji_start(2, result);
    }
    
    res.json(responses);
  } catch(e) {
    console.log(e);
  }
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
