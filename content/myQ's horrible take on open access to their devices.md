---
date: 2023-10-26
tags:
  - iot
  - smarthome
---

Over the last few weeks, myQ has been making changes to break Home Assistant and Scrypted's support of their devices.

This is their disappointingly bad take of why they're breaking the API:

> myQ is compatible with several authorized smart home partners to ensure the best and safest customer experience. To check compatibility or find a trusted partner, please visit https://myq.com/works-with-myq.
> We cannot allow unauthorized usage of our myQ technology; instead we encourage you to check out one of our several authorized smart home partners to ensure an optimal user experience. Please visit: https://www.myq.com/works-with-myq

[Twitter link 1](https://twitter.com/myQConnect/status/1714685297865424933) [Twitter link 2](https://twitter.com/daviesgeek/status/1714688367647223954)

You can read more in the above links, but here are my original tweet(s) to them and some other people's replies as well:

> @daviesgeek - Thousands, if not millions of companies offer safe APIs for their customers that are power users. If you’re confused about how or why APIs can be safe, you should probably consider exiting the cloud / web space.
> I can guarantee you’re going to lose a lot of customers over this
> If you need more info, my DMs and replies are open and I’m willing to give input. Big(ger) smart home companies like yours will grow in market share by flexibility & community support, not by platform lock in & going after legitimate power users who just want to use your products

[Twitter link 1](https://twitter.com/daviesgeek/status/1714688367647223954) [Twitter link 2](https://twitter.com/daviesgeek/status/1714688367647223954)

> @JasonDeFuria - This is an awful take. The API should be open. Or, is this a bait and switch...the original claim on the packaging of mine says "Monitor and control your garage door opener from your Smartphone or computer from anywhere." However, I can't access over computer without 3rd party
> So what's the better option...an open API, or 1000s of us banding together over this issue and organizing a class action for changing how the product works?

[Twitter link 1](https://x.com/JasonDeFuria/status/1715503385418313971) [Twitter link 2](https://x.com/JasonDeFuria/status/1715503126650708033)

> @howie475381 - This is laughable. It’s not about safety. It’s about restricting consumers and users to your walled garden.

[Twitter link](https://twitter.com/howie475381/status/1717510645485359108)

> @k8s_mad_science - No one wants to use your software, it's just awful compared to other options out there like HomeBridge/Homekit and Home Assistant. Please stop blocking third party controllers and adopt open standards.
> Happy to collaborate with and enable you to write 21st century software. Third party consumers of your API wouldn't be a thing if your software wasn't so inflexible and stayed in its lane.

[Twitter link 1](https://twitter.com/k8s_mad_science/status/1716984002450526487) [Twitter link 2](https://twitter.com/k8s_mad_science/status/1716984885007491234)

> @jongreen_uk - This control-freakery chimes discordantly in the modern cloud age, where open and supported APIs are the norm.
> Whoever within your org is promoting API restriction needs to be sidelined before they do your business any more damage: financial or reputational.

[Twitter link](https://twitter.com/jongreen_uk/status/1717092137441923160?s=20)

You can read a ton more replies [here](https://twitter.com/myQConnect/status/1715400238364565827), sorry I couldn't include them all in this post.

I mainly posted this (and subsequently [cross posted on Hacker News](https://news.ycombinator.com/item?id=38028877)) to bring awareness to a huge smart home/IOT company who has joined the likes of [Mazda](https://www.home-assistant.io/blog/2023/10/13/removal-of-mazda-connected-services-integration/) and other companies who only want to lock-in customers to their software, platform, and ecosystem. As I mentioned in one of my tweets, I don't think these big companies understand the importance of offering open and flexible APIs for their end users to consume. Most of us (home automation enthusiasts) don't want to build our own hardware solutions, so we turn to companies like myQ for the hardware and use software like Home Assistant, Scrypted, or Homebridge to enable better automation and control than the hardware company can and will ever be able to offer.

Most of the IoT industry understands why this is important, that's why [Thread](https://en.wikipedia.org/wiki/Thread_%28network_protocol%29) and [Matter](https://en.wikipedia.org/wiki/Matter_%28standard%29) were created and have gained so much traction. It's a shame to see myQ doesn't understand this. Hopefully they'll reverse their position on this, but there are tons of other garage door opener companies who do and will take over this market segment.

### Update as of Nov 6th, 2023

Home Assistant has officially posted that they’re removing myQ: https://www.home-assistant.io/blog/2023/11/06/removal-of-myq-integration/

I missed this but apparently the Chamberlain group posted [a press release on Oct 25th](https://chamberlaingroup.com/press/a-message-about-our-decision-to-prevent-unauthorized-usage-of-myq):

> This decision was made so that we can continue to provide the best possible experience for our 10 million+ users, as well as our authorized partners who put their trust in us. We understand that this impacts a small percentage of users, but ultimately this will improve the performance and reliability of myQ, benefiting all of our users.
