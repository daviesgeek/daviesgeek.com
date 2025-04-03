---
title: "LVTS: Aligning Vision & Value in Engineering"
tags:
  - lvts
  - edge
  - engineering
date: 2025-04-01
---

This was my talk from my local meetup group slightly edited for blogging purposes.

| ![[edge book cover resize.jpg]] | All of these concepts (and much more) are laid out in this book: [EDGE: Value-Driven Digital Transformation](https://amzn.to/3DSJrD6) (Amazon affiliate link). If you are at all interested, I would highly recommend purchasing and reading this book. For me, it codifies everything I have learned over the last 15+ years in software engineering. |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |

![[tim-gouw-1K9T5YiZ2WU-unsplash resize 1.jpeg]]
Engineering teams often are disconnected or feel disconnected from strategic business goals. Oftentimes we can end up siloed off or in the corner, focused on tasks, but without clarity of how those tasks actually contribute to real value. Prioritization decisions can end up misaligned, leading to wasted effort, lack of meaningful impact, and unvalidated initiatives.

The Lean Value Tree (LVT) is a framework to bridge that gap between high-level strategy and day-to-day engineering work.

![[2025-03-11 LVT Diagrams.drawio.png]]

This is just a simple example of a remote working company, you can think of Slack, Zoom, etc.

"Tree" is a very important word here. It's obviously highlighting the fact that it has branches that stem from the trunk or vision, but also it's not meant to be a document that gathers dust on a shelf. To be an effective tool, an LVT needs to be a living and evolving document, one that all members of the organization can point to and understand which way they're going.

**Vision**: The overall vision at the top of the tree sets a guiding direction. Clearly articulating this vision is extremely important as it sets a guiding direction towards which everything below it should contribute.
**Goal**: describes how the organization intends to realize the vision. It should be a relatively stable view of the high-level business strategy and should always be expressed in terms of desired _outcomes_. These should be semi-long term goals; 1-3 years and should be just ambitious enough to encourage longer-term and forward thinking and forward looking.
**Bets**: A goal contains a portfolio of bets, in this case, for the effortless collaboration goal, we have a couple bets under there. Each bet is a hypothesis of value that is believed to drive the realization of a goal. It goes without saying that if bets don't support achieving the goal, they don't belong in the bet portfolio
**Initiatives**: an initiative describes what's necessary to build to prove out a bet. They typically are a series of smaller hypotheses or experiments that have a clear measure of success. Initiatives differ from projects in that projects typically spin up and down to execute a plan (we'll come back to "plans" in a second). Initiatives are a running backlog of hypotheses that are continually reprioritized, which is why i said earlier an LVT should be a living document, especially down at the lower initiative level. Completion should be defined as achieving the desired outcomes, not by completing all the activities in a plan.

Vision, goal, and initiative—you're probably already familiar with these terms and might use them regularly in this context, but I want to take a second to talk about "_bets_". Why "bets"? Why not "plan"? Plans are viewed as too deterministic: "if we plan it well enough, we should expect it to work out the way we planned". "Bet" or "speculate" force us to deal with the reality that the future brings changes we don't anticipate.

Each node (goal, bet, initiative) is described as a portfolio. Let's get more detailed into a single node:

![[2025-03-11 LVT Diagrams - Node Detail resize.jpg]]

Each node needs a few key pieces of information:

- Name
- Relationship
- Goal owner or team
- Description (needs to be expressed as a desired outcome)
- Potential challenges and opportunities
- 1-3 measures of success
- Identify potential subnodes

Developing appropriate measures of success or MoS is key to testing whether the people doing the work can determine whether they are on track or not. Without definitive measures of success, you're left with flowery statements for which success/failure is arbitrary.

Measures of success should represent customer value as much as possible. Delivery time or customer satisfaction are good measures of outcome. Business benefits such as revenue, profit, market share, or time to market are internal measures of benefit that are desirable to the organization, but not something that a customer values. These may be good measures of success when paired with other customer values to be guardrails. For instance, if you only cared about customer satisfaction, you would naturally decrease profitability as you spend to increase customer satisfaction.
Another key thing to stay away from when defining measures of success is "_activity_". Being on schedule, velocity, etc, are all measures of activity that don't directly drive customer value. They don't provide directional guidance to the outcome of the team delivering the work. A good rule of thumb: measurements of activity should never be used to evaluate a goal, bet, or initiative value.
Measures of success need to be measurable over the period of time work progresses, **not** at the end of an initiative.

The LVT needs to be regularly reviewed. Much like a physical tree, goals should be modified or removed as things change, whether that be market insights changing or new opportunities emerge. New goals that arise should be reviewed by a potential owner, then moved up the chain to review.

Hopefully you're able to see how this approach differs from more traditional ways of working. Tree structures have long since existed, but again, the major shift in thinking in EDGE is to move from approving specific pieces of work to solutions creating desired outcomes. Focusing on customer outcomes and customer value is more conducive to collaboration. Aligning on the desired outcome at the goal/bet/initiative level provides a line-of-sight to strategic intent and gives purpose to the work performed.
To re-iterate, using LVT correctly means focusing on customer-value outcomes over internal measures like ROI. ROI or other internal measure are very important, but they are not a goal, they are a constraint.
Lastly, LVTs require you to accept the reality that you can't predict the future. Focusing on short iterations and learning quickly allows you to adapt to the reality you find once you begin working. Setting measures of success that can be evaluated against incrementally is important, rather than large projects that take months to complete and even longer to determine the cost.

Putting it into Practice:

- Determine what to invest in. Articulate business vision & strategy as an LVT.
- Develop actionable, outcome-oriented MoS that clearly indicate progress _as the delivery process unfolds,_ **not** at the end.
- Use the relative value of those MoS to prioritize work on the LVT items.

Again, if any of these concepts resonate with you, I highly recommend reading [EDGE](https://amzn.to/3DSJrD6), it's well worth the read.
