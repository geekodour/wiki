---
id: qcon-london-k8s
title: K8s - QCON London
sidebar_label: K8s - QCON London
---

> I was quite familiar with k8s when I watched these videos, so I didn't take notes of redudant info. But nevertheless this is a great intro to k8s for anyone.

## Random Notes

- **Signal handling** is important because say if your program does not handle signals properly then the container will `kill` the program based on the timeout you set. If the timeout is set of `1min` and `100` machines need rolling update. It'll take `100mins` if done sequentially, if signals were handled properly container will shutdown as soon as it gets the signal to shut after doing any cleanup assigned.
- [**Blue/Green Deployment**](https://martinfowler.com/bliki/BlueGreenDeployment.html), you have two production environments, as identical as possible, as you prepare a new release of your software you do your final stage of testing in the green environment. Once the software is working in the green environment, you switch the router so that all incoming requests go to the green environment - the blue one is now idle.

https://www.youtube.com/playlist?list=PLBAFXs0YjviJwCoxSUkUPhsSxDJzpZbJd
