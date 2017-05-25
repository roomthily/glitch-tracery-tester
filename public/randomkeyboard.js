var crypto = require('crypto'),
    entries = require('object.entries');

//
// really should be a ruleset or two in tracery but 
// we're pulling the tracery lib from npm and i don't
// want to load a copy here ͡¯\_(°_o)_/¯

function _values(d) {
  // mixing and matching our polyfill-like bobs
 return Object.keys(d).map(function(k){ return d[k] });
}

function get_weighted(weights) {
  // weights as {count: weight}
  var sums = _values(weights).reduce(function(a, b) { return a + b; });
  var r = Math.random() * sums;
  for (let [key, value] of entries(weights)) {
    r -= value;
    if (r < 0) {
      return key;
    }
  } 
}

// a little goofy but zipf's law 
// for number of keydowns 
var weighted_counts = {
  1: 1,
  2: 0.5,
  3: 0.33,
  4: 0.25,
  5: 0.2,
  6: 0.16,
  7: 0.14,
  8: 0.125,
  9: 0.11,
  10: 0.1
};

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var generate = function() {
  console.log('hi');

  var charsLower = 'abcdefghijklmnopqrstuvwxyz';
  var chars = '0123456789' + charsLower + charsLower.toUpperCase() + ' \n\t,./;\'[]\\{}|<>?":~!@#$%^&*()_+';

  // random characters but with some number of repeats
  // for the cat distracted by a duck video or what have you

  console.log('random')
  var len = getRandomIntInclusive(50, 130);

  console.log('length: '+len);

  var k = "";
  var charsLen = chars.length;
  var maxByte = 256 - (256 % charsLen);
  while (len > 0) {
    var buf = crypto.randomBytes(Math.ceil(len * 256 / maxByte));
    
    console.log('buffer length: ' + buf.length);
    
    for (var i = 0; i < buf.length && len > 0; i++) {
      var rbyte = buf.readUInt8(i);
      if (rbyte < maxByte) {
        // introduce the cat standing situation
        var cat_len = get_weighted(weighted_counts);
        
        k+= chars.charAt(rbyte % charsLen).repeat(cat_len);
        len -= cat_len;

        console.log('updated string: '+ k);
      }
    }
  }
  return k;
};

module.exports = {generate: generate};
