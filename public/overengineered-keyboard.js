var crypto = require('crypto'),
    entries = require('object.entries'),
    weighted = require('weighted'),
    zipfs = require('zipfian').ZipfianGenerator;

function generate() {
  // let's go nuts
  //
  // okay.
  //
  // so keys in qwerty order.
  // randomly ordered with zipf's
  // with selections based on some count
  //   also weighted towards fewer, ie.
  //   mostly ones & twos but then sudden chunks
  // whitespace is irrelevant to the cat on the 
  // keyboard because they are cats. 
  // on a keyboard.
  
  var charsets = [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-, ', '='],
    ['\t', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', '\n'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
    ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+'],
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', '\n'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?'],
    [' ', ' ', ' ', ' ', ' ']
  ];
  
  var total_len = _rnd_int(30, 120);
  var charsets_wgts = _rnd_weights(charsets.length);
  
  // prep the weights for the charsets
  var prepped = [];
  charsets.forEach(function(c) {
    var cw = _rnd_weights(c.length);
    prepped.push([c, cw]);
  });
  
  // so. as long as there's char space left,
  // snag a charset, snag some chars from it,
  // add some number of each of those chars
  // to the output and carry on.
  //
  // or, build some nonsense words and then a sentence
  // of nonsense and oddball whitespace.
  //
  // this in no way mimics the behavior of a cat. i mean.
  // you'd have right-to-left (or the reverse) and top-bottom-top
  // kinds of things going on.
  //
  // my cat usually just stands on, like, the n anyway.
  
  var random_lengths = Array.from(new Array(10),(val,index)=>index);
  var random_weights = _rnd_weights(random_lengths.length).sort();
  
  var output = '';
  while (total_len > 0) {
    var charset = _choose(prepped, charsets_wgts);
    
    var char_options = Array.from(new Array(charset[0].length),(val,index)=>index + 1);
    var select_number = _choose(char_options);
  
    var selected_chars = Array.from(_subset(select_number, charset[0], charset[1]));
    
    // selected_chars.forEach(function(char) {
    selected_chars.some(function(char) {
      var num_chars = _choose(random_lengths) + 1;
      
      // if we're getting close to the end, adjust for neg lengths
      // ( assumes a 140 char limit if ever a twitter bot )
      num_chars = total_len - num_chars > 0 ? num_chars : total_len;
      
      output += char.repeat(num_chars);
      
      total_len -= num_chars;
    });
  }
  return output;
}

function *_subset(num, arr, wgts=[]) {
  while (num > 0) {
    yield _choose(arr, wgts);
    num--;
  }
}

function _choose(arr, wgts=[]) {
    // generate some weights or reuse an existing array
    wgts = wgts.length < 1 ? _rnd_weights(arr.length) : wgts;
    return weighted.select(arr, wgts);
}

function _rnd_weights(len) {
  // return an array of weights for the provided length
  var zipfGenerator = new zipfs(1, 10, 0.99);
  var weights = [];
  for (var i = 0; i < len; i++) {
    weights.push(zipfGenerator.next());
  }
  return weights;
}

function _rnd_int(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {generate: generate};