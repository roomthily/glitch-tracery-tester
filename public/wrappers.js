var raw_emoji = require('./grammars/emoji.json');

function _emoji_start(num_emoji, string_to_wrap) {
  var emojis = Array.from(select_emoji(num_emoji)).join(" ");
  
  return `Commit ${emojis} : ${string_to_wrap}`;
}

function _emoji_end() {
  return '';
}

function *select_emoji(num) {
  var emoji = raw_emoji.emoji;
  while (num > 0) {
    yield emoji[Math.floor(Math.random()*emoji.length)];
    num--;
  }
}

module.exports = {
  emoji_start: _emoji_start,
  emoji_end: _emoji_end
}