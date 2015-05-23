---
  title: "Web tools are the problem"
  link: http://www.quirksmode.org/blog/archives/2015/05/tools_dont_solv.html
  layout: post
  date: "2015-05-23 12:25"
  tags: web, web development, web tools
---

Peter-Paul Koch on the ever growing overcomplication of web tools:

> Why all the cruft?…  
> Tools don’t solve problems any more, they have _become_ the problem.

<!-- more -->

<a href="http://www.marco.org/2015/05/15/tools-are-the-problem" target="_blank">Marco Arment on Marco.org:</a>

> Most times I land on a Stack Overflow page with a simple Javascript question, the highest-voted answer is “Just include [framework X] and then call this function,” even though a few posts beneath it is a perfectly suitable, standalone 10-line function. 

Sadly, I see this more often than not. I look for a simple answer and the "simple" answer is to include a multi-kilobyte JS framework that adds layers of unnecessary complexity and overhead.  

"Just do `npm install <package>` it's easy!".  

I've been guilty of this many times before (as I think we all have), but just because it's easy to do, does _not_ mean you should do it! Yes, it's easy to write a cool flashy website, but at what cost? The user experience may be horrible, since you require them to load 3MB of JavaScript frameworks and 50MB of video and pictures before even being able to load the content. [^1]  

Before you include that cool framework, take a second to think about it. Do you really need this framework? Or can you get by with the 10-line alternative? It may cost you some time, but your user's experience should be your first priority.

[^1]: <a href="https://blog.kissmetrics.com/loading-time/?wide=1" target="_blank">Page speed matters</a>