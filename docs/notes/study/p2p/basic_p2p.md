---
id: basic_p2p
title: Basic Idea About P2P [WIP]
sidebar_label: Basic Idea About P2P
---

## Intro

Peer-to-peer (P2P) computing or networking is a distributed application architecture that partitions tasks or workloads between peers. Peers are equally privileged, equipotent participants in the application. They are said to form a [peer-to-peer network of nodes](https://en.wikipedia.org/wiki/Peer-to-peer). The idea was popularized to general public mostly by Napster. Tim Lee thought that each user of the web would be an active editor and contributor, creating and linking content to form an interlinked "web" of links. The architecture of peer-to-peer is designed around the notion of equal peer nodes simultaneously functioning as both "clients" and "servers" to the other nodes on the network.

## Distinction

- `client-server` : The most common model we see.
- `master-worker` : Mostly used in data centers and cloud computing, the workload is managed, replication etc.
- `peer-to-peer` : Fully decentralized, self organizing, no infrastructure to maintain. More and more applications are starting to show up, though the most popular ones were in file sharing.

## Bootstrapping

Bootstrapping is basically finding the first peer in a P2P network.

- Centralized server (Fixed IP, DNS)
- A node in the network will collect IPs of good nodes.

## Routing and Discovery

P2P networks generally implement some kind of overlay network on top of the physical network topology.

> The Internet was originally built as an overlay upon the telephone network, while today (through the advent of VoIP), the telephone network is increasingly turning into an overlay network [built on top of the Internet](https://en.wikipedia.org/wiki/Overlay_network).

Some techniques for search and discovery can be:

- Broadcasting for subnetting
- A node inserts itself in a DHT.
- Broadcast search (gnutella)
- SuperNodes (Nodes that collect info about other nodes)
- Search Filter
- Minigroups

## Network layouts

- 2D Grid
- Hypercube
- Random network/small world network(more leaned towards grographical position)

**Random Networks** suffer from two primary problems:

- **Network splits** can be resolved by node address announcement (GNUtella way), Random walkers can also be used.
- **Flooding Overload** can be resolved by round robin algorithm, throttling and randomized algorithms.

### Distributed Hash Tables

DHTs can be used to route messages to a node having a specific logical address, whose IP address is not known in advance. Nodes are organized in address order in a list/ring/hypercube.

DHTs aim at providing an efficient (in terms of lookup time and storage footprint) structure to divide data over a network, where immutability isn’t the main priority.

## Timeline and the Future

Proof-of-retrievability, proof-of-storage, proof-of-spacetime are hot research topics.
how to reward nodes for disk space and bandwidth natively, without much overhead regarding the proofs they should present, and in a trustless, effective manner?

If we were to classify peer to peer file sharing in “epochs”, 4 could be a good number:

1. We had Napster, which still relied on a central server to coordinate lookups within the network.
2. Query flooding came into place with Gnutella, overloading nodes in a given network but eliminating central indexers.
3. DHTs gained adoption with the BitTorrent protocol, distributing the indexes themselves.
4. DSNs bring the promise of off chain token-based markets for storage and distribution.

## Problems faced by P2P networks

- High churn of home users
- All nodes cannot reach other due to NAT.
- There a lot of other problems.

## Links

- [Video on P2P networks](https://www.youtube.com/watch?v=LXAW4HwFt58)
- [History of P2P networks](https://medium.com/paratii/a-brief-history-of-p2p-content-distribution-in-10-major-steps-6d6733d25122)
