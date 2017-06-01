var onomats = require('./grammars/intl-bees.json'),
    handlebars = require('handlebartender');

function generate() {
  // i think? the newer unreleased version of tracery will handle
  // dicts but this one does not
  // so 
  // also some number of repetition without adding
  // a ruleset to the tracery code (that we are not hosting
  // here)
  // 
  // so
  
  // arr of {language & arr[sounds]}
  var sounds = onomats['onomatopoeia'];

  // grab a random language blob
  var item = sounds[Math.floor(Math.random() * sounds.length)];
  
  // grab a random sound ( out of the current 1-2 *shrug* )
  var sound = item['sound'][Math.floor(Math.random() * item['sound'].length)]
  
  // repeat sound up to 75 char length
  var num = _int(75);
  var buzz = _repeat(sound, num);
  
  // little bit of current tracery in npm workaround,
  // little bit of poking at the handlebars bear....
  var template_files = ['approached', 'surrounded', 'behind'];
  var selected_template = template_files[Math.floor(Math.random() * template_files.length)];
  
  // partials needs to be here but isn't doing anything
  var templates = handlebars.compile({
    templatePath: __dirname + '/bee-templates/',
    partialsPath: __dirname + '/no-partials/'
  });
  
  var output = templates[selected_template]({language: item["language"], buzz: buzz});

  return output;
}

function _int(len) {
  var arr = Array.from({length: len}, (v, i) => i);
  return arr[Math.floor(Math.random() * arr.length)];
}

function _repeat(s, maxlen) {
  var repeats = Math.floor(maxlen / s.length);
  return Array.from({length: repeats}, (v, i) => i).map(i => s).join(' ').slice(0, maxlen);
}

module.exports = {
  generate: generate
}
