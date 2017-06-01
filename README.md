## A bot playground that shouldn't be used by anyone

Widget to play with [Tracery](http://tracery.io/) grammars or other generative things. 

Remixing:
- Click the settings above and "Remix" this project!
- Modify the [Tracery](http://tracery.io/) grammar in `grammar.json`. Here's a [tutorial](http://www.crystalcodepalace.com/traceryTut.html). The output will start from field "origin".

Or!

- Add another grammar to `public/grammars` and to the `select` element in `views/index.html` with the file name of that grammar. 

It does not tweet or toot or any of those things, but will generate some number of responses from the grammar for testing.

Example grammar in grammars cobbled together from tinysubversion's [corpora](https://github.com/dariusk/corpora) dataset

### TODOs

🔜 add svg generator

🔜 the default bot favors the first column which is odd based on the stated statistical qualities of tracery.
