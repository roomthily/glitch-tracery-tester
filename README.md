Create a generative Twitter bot using [Tracery](http://tracery.io/). 

This is a version of [Cheap Bots, Done Quick!](http://cheapbotsdonequick.com/) that runs as a single bot. It is based on [v21/tracerybot](http://github.com/v21/tracerybot). 

How to build your own bot:
- Click the settings above and "Remix" this project!
- Modify the [Tracery](http://tracery.io/) grammar in `grammar.json`. Here's a [tutorial](http://www.crystalcodepalace.com/traceryTut.html). The output will start from field "origin".

Or!

- Add another grammar to `public/grammars` and to the `select` element in `views/index.html` with the file name of that grammar. 

It does not tweet or toot or any of those things, but will generate some number of responses from the grammar for testing.
