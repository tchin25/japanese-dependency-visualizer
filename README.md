# jp-dependency


### What is this?

This is a website that visualizes the dependency relations within Japanese sentences, which I like to call 'The Flow of Japanese'.


### What does that mean?

[Here's a link](https://barelylingual.net/posts/flow-part-1) to a series of blog posts I wrote that explains it. Basically, Japanese has a few quirks in its sentence structure that has some interesting effects. The first is that each part of the sentence always depends on something to its right. The second is that every Japanese sentence ends in a verb/copula. This means that each line of dependencies is by itself a completely valid Japanese sentence.


### How do I use it?

Put in a Japanese sentence, and either hit the auto-generate button, or manually create the flow by inserting the character `|` between chunks of the sentence and linking them together using the table provided.

### Any caveats?

Of course, languages are always evolving and there are always exceptions. The main one would be people taking poetic license on the Japanese sentence structure. Specifically, a thing called 「[体言止め](https://japanese.stackexchange.com/questions/14524/what-exactly-is-%e4%bd%93%e8%a8%80%e6%ad%a2%e3%81%9f%e3%81%84%e3%81%92%e3%82%93%e3%81%a9%e3%82%81)」. The way the website is coded and also the dependency parser I used would probably not like it if you put one of those sentences in. Also, the dependency parser is about 90% accurate, so don't put complete trust in it.

---

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
