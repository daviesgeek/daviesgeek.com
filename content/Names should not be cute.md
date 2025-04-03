---
date: 2023-01-10
tags:
  - hackernews
  - thoughts
---

## A rebuttal to ["Names should be cute, not descriptive"](https://ntietz.com/blog/name-your-projects-cutesy-things/) [(HN link)](https://news.ycombinator.com/item?id=34320517)
I couldn’t disagree more for service and infrastructure names.

> And I think this applies more broadly to projects and companies, too.

Customer facing names are fine, they should contain a bit of whimsy and cuteness. Obviously if you ship “payment-processor-gateway-v2” to the customer, that’s not a great name for a company, product, or feature. Projects also make sense (mostly), though they suffer from some of the same issues I’m about to outline.

However, for internal names like for services, adding cuteness is a horrible idea. 

> A well-factored service will generally have a tight set of responsibilities which make sense together, and this makes a descriptive name very appealing.

Descriptive names should help box in the scope of the service. If the payment processing service is also doing AI processing on user avatars, you might want to think about breaking that out into a separate service. With cute names, scope can grow infinitely because there’s no inherent description attached to the name. You may have “Athena” doing one thing but as things progress and the company/software grows, it’ll be taking on 17 other responsibilities. Instead if it’s named “backend” or “payment processor”, it’s clear in the name what it is and the scope of the project or service.

Then there’s the problem of an engineer’s mental overhead. Newcomers have to learn what all the cute whimsical names mean. You have to keep an internal dictionary and someone has to make sure it stays up to date. (Spoiler: It won’t ever be up to date.) I could have filled at least two pages with all the acronyms and whimsical names from one of my old jobs and it was always an ever changing landscape. If a service is named succinctly and clearly, the engineer doesn’t ever have to think about what that particular service is or does. I understand there’s going to be some edge cases where the name doesn’t cover everything, but that’s certainly better than the case where the name doesn’t cover any of the description of the service.

> It's impossible to predict with certainty how your software's requirements will evolve over time.

Then within the scope of the new requirements, changing the service’s name should be inherent in the discussion. IMO, this is a sign of some bad engineering processes. One shouldn’t be worrying about names in the future if you’ve named something correctly for the current scope. If it changes, address it then. Most modern languages will let you easily refactor a name. By those standards, you shouldn’t build the software, since it might change over time and we don’t want to make assumptions about whether we’ll still be using Mongo or if MYSQL makes a comeback. We can’t make those decisions because we can’t predict with certainty…you see the trap you can easily so easily fall into?

One thing that’s also a huge challenge is pronunciation. Someone will pronounce one of those cute names in a way that no one else has heard, it’ll take a minute to sort out, and, while it did get sorted, it took some time. Multiply that out over weeks, months, and years for every engineer and it can get costly. I understand that descriptive names can also be mispronounced, but since they’re common (to our industry), it’s easier to sort out.

I definitely do understand the sentiment behind adding some fun. I’m not here to kill the fun atmosphere of a new startup who wants to be cute about their names, but I’ve seen it play out very poorly over a long time when the company/projects/services/team grows and it’s not pretty.

Stick with descriptive names. You and everyone else will remember them easier and you’ll save time, giving you the time to go have some fun and grab a couple drinks with coworkers.