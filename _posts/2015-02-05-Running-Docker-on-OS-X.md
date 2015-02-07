---
layout: post
date: 2015-02-05 19:09:08
title: Running Docker on OS X
categories: Docker
---

Recently I started using [Docker](https://www.docker.com/) for my side projects and for the [Valley Hackathon](http://valleyhackathon.com/) a couple weeks ago. I really like the flexiblity and encapsulation that it offers, in contrast to tools like [Vagrant](https://www.vagrantup.com/).  
However, on a Mac, Docker runs on [boot2docker](http://boot2docker.io/), a tiny image built just to run Docker containers within VirtualBox. This can cause some problems with features such as shared folders, since the Docker container loads volumes from within the boot2docker machine, not your OS X machine.  
Fortunately there's a build of boot2docker that enables shared folders (via the Guest Additions). To install it:

{% highlight bash %}
# First stop all running containers
# Then stop the boot2docker machine
$ boot2docker down

# Download the custom image
$ curl http://static.dockerfiles.io/boot2docker-v1.2.0-virtualbox-guest-additions-v4.3.14.iso > ~/.boot2docker/boot2docker.iso

# Share the /Users directory with VirtualBox
$ VBoxManage sharedfolder add boot2docker-vm -name home -hostpath /Users

# And start up the boot2docker image
$ boot2docker up
{% endhighlight %}

If that worked and didn't throw any errors, you're ready to go! On my machine, it complained about the client and server running different versions. If this happens, just upgrade boot2docker:

{% highlight bash %}

$ boot2docker upgrade

{% endhighlight %}

Now you can share folders with the `-v` flag like so:

{% highlight bash %}

$ docker run -v /Users/<username>/folder-to-share:/usr/share/nginx/www -d docker-image

{% endhighlight %}