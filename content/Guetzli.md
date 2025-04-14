---
date: 2017-03-17T20:18:49-07:00
title: Guetzli
categories:
  - image encoder
tags:
  - image
  - encoder
  - image
  - processing
  - av
aliases:
  - 2017/03/guetzli
---

Google recently released [guetzli](https://github.com/google/guetzli), a JPEG encoder that claims 20%-30% smaller compressed images, while still retaining the same image quality.

I thought this looked pretty cool, so I gave it a try. It seems to work quite well. I was able to compress a 2.7MB image down to 1MB. The only downside was that guetzli took almost _20 minutes_ to compress the image. I hope Google improves the speed of the tool, but it's worth a shot if you have some images that need compressing.

<figure class="figure-left grid-50">
  <img class="grid-100" src="./guetzli-gui.png" alt="" />
  <figcaption>Guetzli GUI for Mac</figcaption>
</figure>


I wrote a simple Mac app for guetzli. I've released the source on GitHub, as well as pre-built binaries. I had fun writing it (it only took me a few hours), and it was nice to actually finish a Mac app in one day.

Enjoy: https://github.com/daviesgeek/guetzli-gui