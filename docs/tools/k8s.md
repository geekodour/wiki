---
id: k8s
title: Kubernetes
sidebar_label: Kubernetes
---

## First Impressions

![](/img/k8s_arch.png)

## Snippets

```shell
# show all the spec of the running k8s version for Node
$ kubectl explain node.spec
# show all the spec of the running k8s version for Node
# helpful when you can't lookup the online doc.
$ kubectl explain node --recursive
# getting pods
$ kubectl get pods --all-namespaces
$ kubectl get pods --namespace=<name>
# execing into a pod
$ kubectl exec -it <pod-name> -- /bin/bash
```

## CNI

![](/img/k8s_cni.png)

## Relevant Notes

- **Signal handling** is important because say if your program does not handle signals properly then the container will `kill` the program based on the timeout you set. If the timeout is set of `1min` and `100` machines need rolling update. It'll take `100mins` if done sequentially, if signals were handled properly container will shutdown as soon as it gets the signal to shut after doing any cleanup assigned.
- [**Blue/Green Deployment**](https://martinfowler.com/bliki/BlueGreenDeployment.html), you have two production environments, as identical as possible, as you prepare a new release of your software you do your final stage of testing in the green environment. Once the software is working in the green environment, you switch the router so that all incoming requests go to the green environment - the blue one is now idle.
- Out of many ways, two ways to be **highly available**: make individual components HA, another idea is to do something in a bigger scale, eg. switch entire VM if something is not working in one vm.

## Links

- [QCON'19](https://www.youtube.com/playlist?list=PLBAFXs0YjviJwCoxSUkUPhsSxDJzpZbJd)
