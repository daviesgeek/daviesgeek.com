---
layout: "post"
date: 2014-11-13 21:59:51
---

I recently switched this blog over from my old Blogger blog. I have been on Blogger for many years, but I never really *loved* it. Several months ago, I discovered [Jekyll](http://jekyllrb.com/) and [GitHub Pages](https://pages.github.com/). Jekyll is a static blogging blogging/website engine that has all the convenience of a dynamic website, but with the speed of a static HTML website. I started using Jekyll and quickly realized that I **had** to move my blog over to Jekyll.  

I first started by just creating a GitHub pages repository (hosted as a subdomain on [github.io](http://github.io)). A couple days ago I bought this domain name and officially moved everything over to my very own domain name!  

Now for some more technical stuff. This blog is all run off GitHub Pages; no server involved (or necessary). I'm using [CloudFlare](https://www.cloudflare.com/) as a CDN to serve the static content and to point the DNS to the GitHub domain. I pointed the DNS to the CloudFlare servers at [Namecheap](https://www.namecheap.com/). Cloudflare is free for basic use, so the only cost to me is the cost of registering the domain name. The result is that I have a website that is all my own, and that has speeds that are roughly 15x faster than my old Blogger website.