---
date: 2026-06-17
---

We bought some nightstands off Amazon that included some LED strips controlled by a seemingly random iPhone app via BLE. I prefer not to download random apps on the App Store; who knows what's in them, so I was curious whether I could build my own iPhone app controller. 
Typically, this would be an all-weekend reverse-engineering project. I didn't know whether the lights used a standard BLE service, whether the protocol was clear and documented somewhere, or whether I needed some special sauce to get that protocol working on iOS.

All I had was a QR code to a web page to download "Lotus Lantern":
![[attachments/how-fast-can-you-fail/01-lotus-lantern-download-page.png|Lotus Lantern web page screenshot]]

It looked a little sketchier than I really wanted to use, so I pointed ChatGPT (mind you, this is *just* chatgpt.com, I'm not using any harness, just the website) at the website and asked it to build a controller app:
![[attachments/how-fast-can-you-fail/02-chatgpt-first-controller-attempt.png|chatgpt screenshot showing initial build]]

I didn't try out this Python web app project; I was specifically asking for an iPhone app, so I asked:

![[attachments/how-fast-can-you-fail/03-chatgpt-iphone-app-rebuild.png|chatgpt screenshot showing iPhone app rebuild]]

In less than five minutes, I had a working prototype that connected to the lights and let me control them without installing the vendor app.
![[attachments/how-fast-can-you-fail/04-iphone-led-controller-nightstand-photo.jpeg|iPhone app controlling the nightstand LED strip]]

There's a big gap between "this works on my phone" and "this is a polished app I'd ship." It needs a real UI, better error handling, proper device discovery, fewer debug logs, and some actual thought around edge cases. But none of that mattered yet. The first question was whether this was possible at all. Even if the answer had been “no,” it still would have been useful. I would have found out in minutes instead of after spending a weekend chasing BLE packets.

The value here wasn't that AI replaced the engineering work. The value was that it made a meaningful experiment cheap enough to try. 
At least for me, this is one of the best uses of AI today: validating whether an idea is worth more time. Then, once you know there's something there, the actual engineering still matters.
