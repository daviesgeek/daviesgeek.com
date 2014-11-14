---
layout: "post"
title: "Swift Singletons"
date: "2014-09-18 21:30:00"
categories: Swift
---

Over the last few months since WWDC, I've been playing around with Swift. One of the coolest things in Swift is singletons. Singletons are not new, but I thought I'd at least share this snippet.

Suppose I have a class like this:

{% highlight swift %}
class Helper {
  let fontFamily = "Helvetica Neue"
  let fontSize = 14
}
{% endhighlight %}

Now, to use it, I'd have to instantiate in each place I want to use it:

{% highlight swift %}
let helper = Helper()
{% endhighlight %}