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

## Network

> 100% chances of everything in this section being wrong

- Our cluster(nodes, pods) is one big flat IP network, no NAT etc in between, namespaces are not a security feature.
- K8s does not mandate any particular implementations, currently lists about [15 different implementations.](https://kubernetes.io/docs/concepts/cluster-administration/networking/#how-to-implement-the-kubernetes-networking-model)
- A _service_(L4) is a stable address for a pod/bunch of pods(L3). You can do L2 networks in K8s but many cloud providers don't allow it.
- By default everything can reach everything, we can add network policies to address this.

### Links (Unread)

Reading this list will probably take an entire week lol.

- [A Hacker’s Guide to Kubernetes Networking](https://thenewstack.io/hackers-guide-kubernetes-networking/)
- [Flannel Networking Demystify](https://msazure.club/flannel-networking-demystify/)
- [Kubernetes with Flannel — Understanding the Networking — Part 1 (Setup the demo).](https://medium.com/@anilkreddyr/kubernetes-with-flannel-understanding-the-networking-part-1-7e1fe51820e4)
- [How to Find a Needle in a Virtualized Network](https://www.praqma.com/stories/debugging-kubernetes-networking/)
- [An illustrated guide to Kubernetes Networking [Part 1]](https://itnext.io/an-illustrated-guide-to-kubernetes-networking-part-1-d1ede3322727)
- [Docs](https://kubernetes.io/docs/concepts/cluster-administration/networking/)
- [How Kubernetes Networking Works – Under the Hood](https://neuvector.com/network-security/advanced-kubernetes-networking/)
- [Kubernetes Networking: Behind the scenes](https://itnext.io/kubernetes-networking-behind-the-scenes-39a1ab1792bb)
- [/r/k8s: Need an explanation in Networking in Kubernetes](https://www.reddit.com/r/kubernetes/comments/9ytvme/need_an_explanation_in_networking_in_kubernetes/)
- [How to Understand and Set Up Kubernetes Networking](https://dzone.com/articles/how-to-understand-and-setup-kubernetes-networking)
- [Linux bridge: Provider networks](https://docs.openstack.org/neutron/pike/admin/deploy-lb-provider.html#architecture)
- [Linux bridge: Self-service networks](https://docs.openstack.org/neutron/pike/admin/deploy-lb-selfservice.html#architecture)
- Kubernetes NodePort vs LoadBalancer vs Ingress? When should I use what? - the popular ugly ui site article

## CNI

![](/img/k8s_cni.png)

- Well defined spec for writing K8s network plugins, it is not tied to k8s and was created as an interface that could talk to any **runtime** and any **network**
- The plugins are simple executables that take simple commands like ADD, DEL etc.
- It's responsible for setting up the network interface for the pods, configuring routes, [allocating ips](https://en.wikipedia.org/wiki/IP_address_management) etc.

## Relevant Notes

- **Signal handling** is important because say if your program does not handle signals properly then the container will `kill` the program based on the timeout you set. If the timeout is set of `1min` and `100` machines need rolling update. It'll take `100mins` if done sequentially, if signals were handled properly container will shutdown as soon as it gets the signal to shut after doing any cleanup assigned.
- [**Blue/Green Deployment**](https://martinfowler.com/bliki/BlueGreenDeployment.html), you have two production environments, as identical as possible, as you prepare a new release of your software you do your final stage of testing in the green environment. Once the software is working in the green environment, you switch the router so that all incoming requests go to the green environment - the blue one is now idle.
- Out of many ways, two ways to be **highly available**: make individual components HA, another idea is to do something in a bigger scale, eg. switch entire VM if something is not working in one vm.

## Links

- [QCON'19](https://www.youtube.com/playlist?list=PLBAFXs0YjviJwCoxSUkUPhsSxDJzpZbJd)
