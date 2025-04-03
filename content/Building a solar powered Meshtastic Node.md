---
date: 2024-04-25
tags:
  - meshtastic
  - radio
---

## Overview

[Meshtastic](https://meshtastic.org/) is "an open source, off-grid, decentralized, mesh network built to run on affordable, low-power devices. I don't actually recall how I heard about it, but I think it was via [The Comms Channel](https://www.youtube.com/@The_Comms_Channel), so thanks to that channel for getting me started. I was extremely interested in both the cost as well as operation of such a mesh network. It's end to end encrypted and the cost of hardware is low (as previously mentioned). While it's not proven to be the most reliable in low coverage areas, it seems like it would do very well to cover a small area should other forms of communication go down.

I started off by just using [a Lilygo device](https://www.lilygo.cc/products/lora3) with a stock antenna, but it was obvious that wasn't going to cut it. So I ordered [a 4dbi antenna](https://store.rokland.com/products/4-dbi-helium-hotspot-fiberglass-outdoor-antenna-bracket-mount-for-rak-bobcat-nebra-sensecap) and threw it up in my attic. This might have actually worked if the pigtail I ordered was the correct one (I ordered an RP-SMA connector and needed a standard SMA connector, don't mix up the two!), but I figured I needed some height and needed to not be under my roof's insulation. So I set out to build a solar battery powered node on a 10 foot mast.

My attic setup:

![[Pasted image 20250403120846.png]]
## Parts list
A Meshtastic compatible device, such as [this LilyGo LoRa32 v2.1_1.6](https://www.lilygo.cc/products/lora3)
If you order this, make sure you select the right version for your region. I'm in the US, so I chose the 915MHz. Either the Paxcounter or the Disaster Radio version work, that's just what's pre-installed.

The electronics (note: these are all Amazon affiliate links, I'd appreciate the support if you found this useful!)
Waterproof box (I ordered the smallest one at 5.9x3.9x2.8) - https://amzn.to/4a27hGM
90º USB connector - https://amzn.to/3w9sEb2
DFRobot Solar Power Manager 5v - https://amzn.to/3QliPxx, see also [their direct link](https://www.dfrobot.com/product-1712.html)
SMA male to N female bulkhead connector 6" - https://amzn.to/3UjpzNN
2x18650 batteries - https://amzn.to/4aXzr76
7W solar panel - https://amzn.to/4aHFkVH
Silicone tape - https://amzn.to/3WbDE2k
2 slot 18650 battery holders - https://amzn.to/3UeFFrS
20 foot micro USB cable - https://amzn.to/4aTpWpi
[4dbi antenna from Rokland](https://store.rokland.com/collections/802-11ah-wi-fi-halow/products/4-dbi-helium-hotspot-fiberglass-outdoor-antenna-bracket-mount-for-rak-bobcat-nebra-sensecap) - i have this, not on my node at the moment, but depending on height / use case, this might be a good option
[8dbi antenna from Rokland](https://store.rokland.com/collections/802-11ah-wi-fi-halow/products/8-dbi-omni-outdoor-915mhz-fiberglass-antenna-for-lora-halow-application) - this is what's currently on my node on loan from a local guy

All the mounting & enclosure supplies:
10' 3/4" EMT conduit - [Home Depot link, item 786692020020](https://www.homedepot.com/p/3-4-in-x-10-ft-Electrical-Metallic-Tubing-EMT-Conduit-0550110000/202068040)
3/4" conduit offset - I can’t find a link for this but it’s just a piece of 3/4” conduit that one end goes into the t body and one end is threaded
3/4" T conduit body - [Home Depot link, item 088700066021](https://www.homedepot.com/p/Cantex-3-4-in-Type-T-Conduit-Body-R5133564/202043484)
3/4" 2-hole straps - [Home Depot link, item 051411961626](https://www.homedepot.com/p/Halex-3-4-in-Standard-Fitting-Electrical-Metallic-Tube-EMT-2-Hole-Straps-4-Pack-96162/100148542)
3/4" EMT rain tight connector - [Home Depot link, item 051411262525](https://www.homedepot.com/p/3-4-in-Electrical-Metallic-Tube-EMT-Rain-Tight-Connector-26252/100572360)
3/4" PVC plug - [Home Depot link](https://www.homedepot.com/p/DURA-3-4-in-Schedule-40-PVC-Plug-C449-007/100347456)
3/4" female conduit adapter - [Home Depot link](https://www.homedepot.com/p/Cantex-3-4-in-Female-Conduit-Adapter-R5140044/202043515)

## The Build
I started off by putting everything into the T conduit body. It's an extremely tight fit but I made it work out alright:

![[Pasted image 20250403120903.png]]
One thing to note in this picture: you'll notice that it's connected via the U.FL/IPEX connector on the board and not the SMA connector on top. This was a huge mistake, as that connector isn't actually operable. I spent a couple weeks trying to figure why I could connect when I was very close to the node, but not any further away than about 5-10 ft. I thought it was an issue with the antenna on my transmitting node, but turns out, actually attaching an antenna gets you range! The SMA connector linked above is the correct one for the board. I'll update with a picture if I take the node down anytime soon.

One other thing not pictured here is using silicone tape on all the connections except the white plugs at the ends. I used sealant/glue there instead since I knew I didn’t need to take those plugs out.

I ran the 20 foot USB cable through the EMT conduit, since I'm not putting any batteries or chargers in the actual node at the top of the mast. I wanted to reduce weight and heat by putting the charger + batteries under the eaves of my house.

Next, I put a mounting plate on the side of my house with some scrap wood and used the 3/4" straps to attach the 10' mast. It's pretty solid and I'm not super concerned with it falling over even in high winds or anything like that.
The solar panel is mounted right next to the base of the mast for ease of use. 

![[Pasted image 20250403120924.png]]
Testing out the solar power manager board after trying a few different iterations of hardware, this seemed to be it!

![[Pasted image 20250403120914.png]]

I don't have a picture of it, but the 2 slot 18650 board linked above needs one of the wires moved so the batteries are in parallel. If you don't do this, you risk blowing your board, so make sure everything is correct before connecting it up. I just used a multimeter to make sure the voltage was no more than 4.1v (it would be 8+ if the batteries were connected in series).

Hopefully you enjoyed this very hastily put together build post. I'll be adding some more information and links as time goes on.