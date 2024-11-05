If you repeatedly click on the first link of any wikipedia page, you tend to end up at philosophy!

Basic running:
`npm install`
`npm run build`
`npm start`

You can specify the start url:
`npm start https://en.wikipedia.org/wiki/Seamount`

You can specify a random start url using wikipedia's build in random, which is the default behavior:
`npm start random`

You can specify the maximum iterations (default is 50):
`npm start random 27`

You can specify the target url (default is https://en.wikipedia.org/wiki/Philosophy):
`npm start random 27 https://en.wikipedia.org/wiki/Seamount`