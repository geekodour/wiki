---
id: zookeeper
title: Zookeeper 🐒
sidebar_label: Zookeeper 🐒
---

## First Impressions

- It is fundamantally a distributed in memory hierarchical key value store, the data model looks like like a filesystem(znodes). More like a metadata/lock server that other applications can use for various use cases like leader election, distributed locks etc. uses paxos for it (?)
- It runs in leader-follower architecture but all the nodes(Ensemble) participate in decisions and a minimum of [3 nodes](https://stackoverflow.com/questions/25174622/difference-between-ensemble-and-quorum-in-zookeeper) are [recommended for production.](https://www.youtube.com/watch?v=gZj16chk0Ss)
- Eventually consistent system, there is possibility of stale reads.
- You can just use k8s replicas to create zookeeper quorum/ensemble.
- 1 k8s node can probably run multiple zk nodes even if the [official tutorial uses pod affinity](https://kubernetes.io/docs/tutorials/stateful-application/zookeeper/), so there's no 1-1 relation but then again you'll need to play with port numbers. (?, TODO:need to check)
- Has something called **watch**: Async, one time trigger that gives listners the ability to be notified when something changes in a znode, can be triggered on the value/status change of its children.

## Snippets

```shell
# ports
# :2181 client port, other applications connect to this port to use zk.
# :2888 follower port
# :3888 election port
# :8080 AdminServer port

# local docker run
$ docker run --name zuuu --rm -p 8080:8080 -p 2181:2181 -p 2888:2888 -p 3888:3888 zookeeper
```

## z-node

- A byte array, it has timestamps, value, ACLs, optional children among other things.
- Session: Connection between a client and node in the ensable, the client can talk to **any of the followers or the leader**, when a session happens an epheremal node can be created in the context of that session.
