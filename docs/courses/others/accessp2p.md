---
id: accessp2p
title: AccessP2P
sidebar_label: AccessP2P
---

🔍 [Link to Course](https://accessp2p.xyz/)

## Summary

Super informative but some of these lectures probably were not meant to be watched online, as they involved offline activities etc. and the audio was pretty bad. But overall super nice content. I really liked the lecture on NAT. 🥊

## Intro to P2P

🎥 [Link to Video](https://www.youtube.com/watch?v=ZcmyE8cUQRI)

This talk was actually pretty boring and repetitive, could have been a twitter thread. It talks about the social prospects of P2P, It might be interesting for someone who's totally new to P2P but there were few nice things Stacco points out:

> _The ideal state of the web would be peer to peer. This would eliminate use of large data centers, censorships, algorithmic timelines and manipulation of the minds of people and many other evils caused by corporate control of the internet. In the ideal case, all data would be content addressable, replicated and seeded (a la bittorrent, ipfs, tahoe-lafs). Each peer would make their own decisions about what data to share and who it wants to share it to._

- Considering facts like _"84% of English Wikipedia editors were male in 2013"_, are we really decentralizing if we're not examining who's creating the technology or the content? Who's value systems are we putting into these technologies?
- Internet by itself is P2P and centralized systems are built on top of it.
- Shared economies: Take Airbnb for an example, It looks like you're practicing P2P transactions with each other but in reality you're just transacting what the platform allows you to do.

### Links

- [The commons](https://primer.commonstransition.org/) : Who, What and How of P2P systems, the social prospects.
- [The P2P Lab](http://www.p2plab.gr/en/) : An interdisciplinary research collective focused on the commons.
- [P2P Foundation](https://p2pfoundation.net/) : Since 2006, this organization has been researching, cataloging and advocating for the potential of P2P and commons-based approaches to societal and consciousness change. This org. also maintains [the P2P wiki](https://wiki.p2pfoundation.net/Main_Page).

## Mechanism Design

An Introduction to auction and mechanism design as well as a survey of the most relevant topics at the intersection of computer science and economics. This lecture again has very bad audio.

- **Game Theory**: How to play a game? What is the outcome of strategic interaction between actors in a given game?
- **Mechanism Design**: - How do we design the game? How do we create rules within the game to obtain a certain outcome?

## Network Address Translation

🎥 [Link to Video](https://www.youtube.com/watch?v=JhNSC_McKJo)

In case of GoogleCloud or DropBox, they can probably look into your files since they are encrypted when they are stored. This creates a need of encrypted storage, Tahoe-LAFS is one of the many projects which support client side encryption.

### Topology

- **Centralized internet**, The idea of the internet for many young people is completely around centralized services like gmail, google, facebook etc. They live inside a walled garden.
- **Decentralized internet**, this is still at use but mostly by technical people because the UX is not very convenient, but there are new improvements which is enabling more and more people to use it. There are really nice ideas that can be implemented in the decentralized internet but the UX is really lacking at this point. Examples are IRC, Usenet, email etc. Email is inherently decentralized, but gmail centralized it because you see, gmail/centralized services give a better UX for the general public. _Not all users need to be in one centralized service._ **The original Internet was decentralized.**
- **Distributed internet**, Individual nodes talk to eachother and anybody can talk to each other. Eg. Bitcoin, Bittorrent. One could say Bitcoin and Bittorrent networks are decentralized aswell but the line is very thin and sometimes does cross.

### IPv4 Exhaustion

- When we realized IPv4 exhaustion, we broadly came up with two solutions IPv6(128bit addresses) and NAT
- IPv6 adoption is mostly blocked by ISPs, most modern operating systems support IPv6, bigger companies like Cisco, Google, Facebook etc all use IPv6 internally. IPv6 needs some infrastructure upgrades and some ISPs do have them updated but consumers need to tell the ISPs to enable it for them, they'll probably give you a IPv6 block. Bottomline is, adoption is happening but it is very slow. **An IPv4 address cannot talk to an IPv6 address.**

### NAT

![](/img/nat-arch.png)

_Fig1: Your ISP gives you another private IP to your router, and your router again gives you a private IP to your phone and so on. The more layers in this, the more problamatic because each of these layers can behave differently. So getting closer to the public IP is always(?) nice_

- **Edge Computing**: Whenever we're talking about edge computing we're simply talking about processing at the edges of the network, like your laptop/phone is an edge.

#### Inward and Outward

- **Outward Connection**: When a connection just goes to some public ip on the internet. Eg. visiting google.com.
- **Inward Connection**: When a connection goes to some private ip, and needs to go through NATs again in the inward direction this time. Eg. P2P connections. Inward connections are simply not allowed/possible accross NATs, routers will simply drop packets with private destination IP addresses **unless the NAT identifies them as being a part of a session initiated from the private network**, for this we need an external(outward) relay server.

When using P2P protocols, we want to minimize the involvement of the external relay server. P2P protocols don't have to do anything with NAT, but NAT creates problems for P2P protocols to work because _how would a peer establish an inward connection to another peer in another NAT otherwise?_

### NAT Variations

Router keeps a mapping of the session data (i.e. `src (ip, port)` -> `dst (ip, port)`, the source port really doesn't matter), When there's a request outward, the router rewrites the private src ip and/or port with its own (public) ip and possibly remaps the ports in each packet and creates a mapping. But **no standardization on how ports are allocated and how these mappings are done within the router.**

- **Session Data**: `src (ip, port)` -> `dst (ip, port)`

Due to the fact that there is no standardization of NAT, there are a couple of variants:

The wikipedia [page for NAT has nice diagrams](https://en.wikipedia.org/wiki/Network_address_translation#Methods_of_translation) the video portion starts at [1:03:13](https://youtu.be/JhNSC_McKJo?t=3793)

- **Full Cone**
- **Address Restricted Cone**
- **Port Restricted Cone** (Most Home routers use this)
- **Symmetric NAT** This is the most complicated one, mostly used in corporate networks and punching a hole through these networks is very hard. Number 1 enemy of P2P applications! 😆

NATs in the wild use combination of these!

### NAT Traversal techniques for P2P

These techniques assumes that both of the peers are behind different NATs. Otherwise we don't need any kind of specialized NAT traversal techniques.

- **Hole Punching**: This relies on a rendezvous server (or an introducer) that knows both the parties and has a session with each of them and hence know their public and private (ip, port) pairs. Simple Hole Punching **does not work** with Symmetric NATs because a random port number gets assigned for each session in it. The rendezvous server/introducer is called the [STUN](https://en.wikipedia.org/wiki/STUN)
- [**TURN(Traversal Using Relays around NAT)**](https://en.wikipedia.org/wiki/Traversal_Using_Relays_around_NAT): This is just a standardization of the messages sent across the peers for P2P for discovery of other peers. This is used to do P2P in Symmetric NATs.
- When [WebRTC](https://en.wikipedia.org/wiki/WebRTC) came out, the big browser companies wanted to bake these standardizations into the browser so that one browser can talk to another brower. They standardized how TURN(Relay) server should talk to STUN server etc and named it [Interactive Connectivity Establishment (ICE)](https://en.wikipedia.org/wiki/Interactive_Connectivity_Establishment), ICE sort of enhances the STUN and TURN protocols with some additional messages.
- [UPnP](https://en.wikipedia.org/wiki/Universal_Plug_and_Play) : Not a lot of routers support this has some security issues but is useful.
- [NAT Port Mapping Protocol(PMP)](https://en.wikipedia.org/wiki/NAT_Port_Mapping_Protocol) : Proprietary, made by Apple.
- [Port Control Protocol](https://en.wikipedia.org/wiki/Port_Control_Protocol): Successor to NAT PMP.
- There are more!

There are a lot of problems establinshing this connection even before you start sending data. One could try one or more of these traveral techniques in parallel and use the socket which is achieved first and do rest of the networking on that socket.

### Links

- [Tahoe-LAFS](https://en.wikipedia.org/wiki/Tahoe-LAFS): It is a free and open, secure, decentralized, fault-tolerant, distributed data store and distributed file system. It is designed around [principle of least authority](https://en.wikipedia.org/wiki/Principle_of_least_privilege). Designed by [Zooko Wilcox-O'Hearn](https://en.wikipedia.org/wiki/Zooko_Wilcox-O'Hearn) who leads [zcash](https://en.wikipedia.org/wiki/Zcash) and co-creator of [BLAKE3](<https://en.wikipedia.org/wiki/BLAKE_(hash_function)#BLAKE3>).
- [Zooko's triangle](https://en.wikipedia.org/wiki/Zooko%27s_triangle): Zooko described this trilemma. Several platforms implement refutations of this, eg. Blockstack, Namecoin, Monero etc. but still worth looking at it.
- [Object-capability model](https://en.wikipedia.org/wiki/Object-capability_model) : For example the `ls` command is used to list things, but it has the capability to access the network, the camera and whatnot. We can use the Object-capability model to scope this down.
- [magic-wormhole](https://www.youtube.com/watch?v=YhoYq6wQEto) / [github](https://github.com/warner/magic-wormhole) : It gets things from one computer to another, safely. Warner, the creator of magic-wormhole was also one of the developers of Tahoe-LAFS. It uses [PAKE](https://blog.cryptographyengineering.com/2018/10/19/lets-talk-about-pake/) for [establishing](https://lwn.net/Articles/692061/) a secure [connection](https://github.com/warner/magic-wormhole/issues/348).
- [Usenet](https://en.wikipedia.org/wiki/Usenet)
