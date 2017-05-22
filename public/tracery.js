var tracery = require('tracery-grammar'),
    rawGrammar = require('./grammar.json'), // the grammar for the bot, edit this!
    processedGrammar = tracery.createGrammar(rawGrammar);

processedGrammar.addModifiers(tracery.baseEngModifiers); 

module.exports = {
  grammar: processedGrammar,
  use_grammar: function(grammar_name) {
    // return a grammar from the set
    var raw_json = require('./grammars/' + grammar_name + '.json');
    var new_grammar = tracery.createGrammar(raw_json);
    new_grammar.addModifiers(tracery.baseEngModifiers);
    return new_grammar;
  }
}