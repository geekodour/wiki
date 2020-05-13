---
id: data_traversal
title: Data Traversal
sidebar_label: Data Traversal
---

## How does data flow in a network?

The answer to this ambigious question is ambigious aswell, there are some abstract concepts that explain how data is transmitted in a network such as **unicast, multicast, broadcast, anycast**. Different networks get to choose how they want to implement these concepts in their network, a network can also decide not to support one or more of these. The most interesting one of them is **multicast**.

> **About IPv4 and IPv6 addressing**
>
> - IPv4 supports unicast, multicast, broadcast and anycast addresses.
> - IPv6 supports unicast, multicast and anycast addresses.
>
> IP also has `link-local addresses`, `private network addressing`/`unique-local addresses`, but these do not depend on how data is transmitted, so out of the scope of this section but [good to be aware of.](/img//ipv6_reference_card.pdf)

> **About about MAC addressing**
>
> The official format is called `EUI-48`(previously `MAC-48`). The IEEE encourages adoption of the more plentiful EUI-64 for non-Ethernet applications. `bytes` and `octets` can be used interchangeably here; When we say MAC address in this document, it probably means destination MAC address.
>
> **Different notations of `EUI-48`**
>
> - **Transmission Order**: Each byte is transmitted with the LSB of each byte transmitted first, and since `EUI-48` is multi-byte/multi-octet, the `most-significant-octet` is transmitted first; examples include, `IEEE 802.3 (Ethernet)` and `IEEE 802.4 (Token Bus)`.
> - **Human friendly/Canonical**: Just like the transmission order; there are various ways to [separate the characters in the address](https://en.wikipedia.org/wiki/MAC_address#Notational_conventions); examples include, `Wireshark`, `ip addr`.
> - **Computers/Applications**: Little-endian computers may store a MAC address in memory in their native `least-significant-octet-first` format when using some internal representation.
> - **bit-reversed**: Compared to the `transmission order`, Each bytes is transmitted with the MSB of each byte transmitted first, more [information here](https://tools.ietf.org/html/rfc2469) and [here](https://tools.ietf.org/html/rfc7042). Examples include, `IEEE 802.5 (Token Ring)` and `IEEE 802.6 (FDDI)`.
>
> ![](/img//mac-address.jpg)
>
> As shown in the diagram, MAC address types can be classified into `group` and `individual` addresses based on the `I/G` bit and `U/L` bit:
>
> - `Group addresses`(multicast, broadcast, anycast) - LSB of first octet set to `1`
> - `Individual addresses`(unicast) - LSB of first octet set to `0`
> - `Universally administered addresses(UAA)` - Second LSB of first octet set to `0`
> - `Locally administered addresses(LAA)` - Second LSB of first octet set to `1`

## Unicast

This is the most common form of information transfer on networks(e.g. http, smtp, ftp and telnet). It basically describes communication from one point to exactly one other point(`one-to-one`). One device/host may have more than one unicast address.

### Support

- Supported by both `IPv4` and `IPv6`.
- `TCP` and `UDP` both have the capability to unicasts.

### Example

If 10 hosts of `Type A` connects to 1 `Type B` host and they require streaming 100Kbps to each, the `Type B` host will need a bandwidth of 1000Kbps total. i.e more number of hosts connecting to `Type B`, more the bandwidth requirement.

### Layer 3

The general use of source and destination IP.

### Layer 2

The general use of source and destination MAC address. Additionally, The IEEE has specified that the LSB of the most-significant-octet of the MAC address be set to `0` for unicast.

> - Unicast does not necessarily mean [point to point](<https://en.wikipedia.org/wiki/Point-to-point_(telecommunications)>).
> - If a host runs two IP addresses, `192.168.1.1` and `10.1.2.1`, and a server running on the host is configured to listen on `0.0.0.0`, it will be reachable at both of those IP addresses. (`0.0.0.0`/`zero network` is a non-routable address, it has specific meanings based on contexts such as operating system, running program etc.)

## Broadcast

This is pretty self explanatory(`one-to-all`). In theory it's a communication type where a piece of information is sent from one point to all other points. In practice, the scope of the broadcast is limited to a broadcast domain, mostly LANs.

### Support

- `X.25`/frame relay/`IPv6` do **not** have broadcast capability. `IPv6` uses multicast to replace broadcast.
- `IPv4`,Token Ring, AppleTalk, Ethernet, IPX does have broadcast capability. _(more info below)_
- Only `UDP` have the capability to broadcasts in an `IPv4` network.

### Layer 3

- **Directed broadcast**: `192.168.1.255`, Only the host portion of the IP address is `all-ones`. These are accepted by routers and are passed across subnets; In the real-world, usage of this feature is often restricted due to its possible abuse.
- **Limited broadcast**: `255.255.255.255`, Both the network portion and the host portion are `all-ones`, these addresses will be dropped by routers, so LANs only. Ethernet frames that contain IP broadcast packages are usually sent to the `FF:FF:FF:FF:FF:FF` address.

IP broadcasts are used by `BOOTP` and `DHCP` clients to find and send requests to their respective servers. Another use of directed broadcasts can be `WOL(WakeOnLan)`, when the destination PC will not have a IP address because it'll be switched off and you cannot unicast to it!

### Layer 2

- Frames can also reach every computer on a given LAN if they are addressed to MAC address `FF:FF:FF:FF:FF:FF`

Ethernet broadcasts are used by `Address Resolution Protocol(ARP)`

> - Token Ring uses a special value in the IEEE 802.2 control field to specify that it's a broadcast.
> - With AppleTalk when node ID set to `255`, a packet is sent to all networks available.
> - A packet with network number of `FFFFFFFF` is sent to all networks available in IPX.

## Multicast

Data transmission addressed to a group of destination hosts simultaneously. It works for both `one-to-many` and `many-to-many` cases, the difference with broadcast is apparent. One or many senders and any number of recievers is valid. The sender sends once and demultiplexing is done by the network. Multicast is much more tricky to implement than unicast or broadcast; _one of the many_ reasons that Multicast currently doesnt work for clients over the Internet. It's a [huge](/img//ip_multicasting.pdf) topic, I still don't understand it completely but I'll put down whatever I know here:

> As of April 2020, one can use multicast locally; some popular usage include video streaming. IPTV uses multicast but within a single ISP, not across them; most ISPs do not route multicast traffic, many cloud providers do not support multicast within their networks. Streaming videos (Netflix/YouTube) from the Internet is unicast only. Few recent news related to multicast that I could find:
>
> - [AMT - Automatic Multicast Tunneling](https://tools.ietf.org/html/rfc7450)
> - [QUIC Multicast](https://groups.google.com/a/chromium.org/d/msg/proto-quic/pAQzbXhks5s/HPI-iv5nBQAJ)
>
> Some older attempts at Multicasting on the Internet
>
> - [Mbone](https://en.wikipedia.org/wiki/Mbone): An experimental backbone and virtual network built on top of the Internet for carrying IP multicast traffic. It used tunneling to encapsulate multicast packets in unicast packets.

### Overview

The main challenge in multicast is that it needs _involvement_ from sender, the network and the reciever. Out of the many things multicast requires, some of the primary components(considering IP network and according to me) are as follows:

- **A destination IP address range**: The destination IP address in multicast is a `multicast group address` and not simply any valid IP address like unicast. `IPv4` and `IPv6` have multicast address ranges. **Sources** use this address as the destination address. **Receivers** use this address to inform the network that they are interested in receiving packets sent to that address.
- **A mechanism for hosts to register for multicast packets**: Applications and routers can make use of this mechanism to handle multicast traffic. Examples: [IGMP](https://en.wikipedia.org/wiki/Internet_Group_Management_Protocol)(for `IPv4`) and [MLD](https://en.wikipedia.org/wiki/Multicast_Listener_Discovery)(for `IPv6`), with this, clients receive a stream of packets only if they have previously registed to do so by asking to be part of the multicast group.
- **Applications that understand multicast(sender and reciever)**: VLC Media Player understands multicast! In multicast we let our NICs accept/discard packets based on criteria other than just matching of destication MAC address: for example, based on a configurable list of accepted `multicast MAC addresses`. _(??)_
- **A router that allows multicast and a routing protocol to handle multicasts**: The routers in a multicast network learn which sub-networks have active clients for each multicast group and attempt to minimise the transmission of packets across parts of the network for which there are no active clients. IP multicast is always available within the local subnet, achieving IP multicast service over a wider area requires multicast routing. Examples of Multicast routing protocols: [DVMRP](https://en.wikipedia.org/wiki/Distance_Vector_Multicast_Routing_Protocol), [MOSPF](https://en.wikipedia.org/wiki/Open_Shortest_Path_First#Multicast_Open_Shortest_Path_First), [PIM](https://en.wikipedia.org/wiki/Protocol_Independent_Multicast) and for inter-domain multicast routing, [Multiprotocol BGP](https://en.wikipedia.org/wiki/Multiprotocol_BGP).

![](/img//unicast_multicast.png)

### Support

- Supported by both `IPv4` and `IPv6`. It does so by reserving special address blocks called multicast IP addresses.
- Ethernet(L2) has the ability to distinguish between `grouped` and `individual` in the `EUI-48` address like mentioned above. It also has a reserved MAC address range for multicast mac addresses.
- `802.11 wireless network` also takes in the same L2 MAC address range.
- Only `UDP` have the capability to multicast in an `IPv4/IPv6` network.

### Layer 7

Application layer multicast overlay services are not always based on `IP multicast(L3)` or `data link layer(L2)` multicast. Instead they use multiple unicast transmissions to simulate a multicast. These services are designed for application-level group communication. Internet Relay Chat (IRC) implements a single spanning tree across its overlay network for all conference groups.

### Layer 3

- **IPv4** : `224.0.0.0/4` address range for multicast IP addresses.
- **IPv6** : `ff00::/8` IPv6 prefix for multicast IP addresses.

### Layer 2

The LSB of the most-significant-octet of the MAC address be set to `1` for multicast. Ethernet generally does not distinguish between multicast and broadcast frames. When it recieves a multicast frame, it just floods the traffic to all the ports in the broadcast domain. This is why we need to do [IGMP snooping](https://en.wikipedia.org/wiki/IGMP_snooping), a L2 optimization that takes place internally on the switch for the L3 IGMP.

- **IPv4** : `01-00-5E-00-00-00 through 01-00-5E-7F-FF-FF` range for multicast mac addresses.
- **IPv6** : `33-33-00-00-00-00 through 33-33-FF-FF-FF-FF` range for multicast mac addresses.

[NDP](https://en.wikipedia.org/wiki/Neighbor_Discovery_Protocol)(IPv6 alternative of ARP) makes use of multicast addresses to translate IP addresses to MAC addresses.

> More information about multicast:
>
> - RFCs: [5771](https://tools.ietf.org/html/rfc5771), [1112](https://tools.ietf.org/html/rfc1112), [5110](https://tools.ietf.org/html/rfc5110), [2464](https://tools.ietf.org/html/rfc2464)
> - Wikipedia: [Multicast](https://en.wikipedia.org/wiki/Multicast), [IP Multicast](https://en.wikipedia.org/wiki/IP_multicast), [Multicast Addresses](https://en.wikipedia.org/wiki/Multicast_address), [Multicast Routing](https://en.wikipedia.org/wiki/Multicast_routing), [Any-source multicast](https://en.wikipedia.org/wiki/Any-source_multicast), [Source-specific multicast](https://en.wikipedia.org/wiki/Source-specific_multicast), [Peercasting](https://en.wikipedia.org/wiki/Peercasting), [Xcast](https://en.wikipedia.org/wiki/Xcast), [MRP](https://en.wikipedia.org/wiki/Multiple_Registration_Protocol), [Multicast Lightpath](https://en.wikipedia.org/wiki/Multicast_lightpaths), [Scalable video multicast](https://en.wikipedia.org/wiki/Scalable_video_multicast), [Reverse-path forwarding](https://en.wikipedia.org/wiki/Reverse-path_forwarding), [Core Based Trees](https://en.wikipedia.org/wiki/Core-based_trees)

## Anycast

Anycast addressing is used when a message must be sent to any member of a group, but does not need to be sent to all of them. Usually the routing algorithm selects the single receiver from the group based on least-expensive routing metric. The address don't have a specific range, as they are exactly the same as regular unicast addresses. This means that a hosts has no way to distinguish a unicast from an anycast address when it sends a packet.

Anycasts removes the idea of strict unique IPs on the internet and assigns same unicast IP address to multiple hosts and announces the different routes to the addresses through BGP. Routers consider these to be alternative routes to the same destination. DNS uses anycast, the root nameservers use anycast address announcements to provide a decentralized service. CDNs use anycast for HTTP connection etc.

> More info on Anycast
>
> - Wikipedia: [Anycast](https://en.wikipedia.org/wiki/Anycast)
> - RFCs: [1546](https://tools.ietf.org/html/rfc1546), [4786](https://tools.ietf.org/html/rfc4786)
