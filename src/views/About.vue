<template>
  <div class="section">
    <div class="container">
      <div class="content">
        <h1 class="title">What is this?</h1>
        This is a website that visualizes the dependency relations within
        Japanese sentences, which I like to call 'The Flow of Japanese'.
      </div>
      <div class="content">
        <h1 class="title">What does that mean?</h1>
        Here's a link to a series of blog posts I wrote that explains it.
        Basically, Japanese has a few quirks in its sentence structure that has
        some interesting effects. The first is that each part of the sentence
        always depends on something to its right. The second is that each
        individual branch is by itself a completely valid Japanese sentence.
      </div>
      <div class="content">
        <h1 class="title">How do I use it?</h1>
        Put a Japanese sentence it, and either hit the auto-generate button, or
        you can manually create the flow by inserting the character
        <code>|</code> between chunks of the sentence and linking them together
        using the table provided.
      </div>
      <div class="content">
        <h1 class="title">Any caveats?</h1>
        Of course, languages are always evolving and there are always
        exceptions. The main one would be people taking poetic license on the
        Japanese sentence structure. Specifically, a thing called 「<a
          rel="nofollow noreferrer"
          href="https://japanese.stackexchange.com/questions/14524/what-exactly-is-%e4%bd%93%e8%a8%80%e6%ad%a2%e3%81%9f%e3%81%84%e3%81%92%e3%82%93%e3%81%a9%e3%82%81"
          >体言止め</a
        >」. The way the website is coded and also the dependency parser I used
        would probably not like it if you put one of those sentences in. Also,
        the dependency parser is about 90% accurate, so don't put complete trust
        in it.
      </div>
      <div class="content">
        <h1 class="title">Who made this?</h1>
        Hello. I'm Thomas. You can find my blog about language learning
        <a href="https://barelylingual.net/"> here</a>, and the code for this
        project can be found
        <a href="https://github.com/tchin25/jp-dependency-diagrams-visualizer">
          here</a
        >. If you like this project, consider giving it a star because making
        something like this has zero return on investment for me.
      </div>
    </div>
  </div>
</template>
