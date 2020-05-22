---
id: case_studies
title: Case Studies
sidebar_label: Case Studies
---

> Some lessons from the articles may end up in `Study` or `Tools` sections.

## Unread

Link to my [ever increasing unread case studies list.](/docs/notes/unread_case_studies)

---

## Technical

### On concurrency in Go HTTP servers

🔍 [Link to post](https://eli.thegreenplace.net/2019/on-concurrency-in-go-http-servers/)

- Exploring `net/http`, it employs concurrency; while this is great for high loads, uses ApacheBench to simulate many concurrent connections.
- The initial `inc` method allowed concurrent mutation of a `map` which leads to a race condition. Solved it by using `sync.Mutex` and using a pointer reciever on the `inc` method.
- The same can be done by using channels but is an overkill for simple cases.
  > **Question:** Won't this also lock on `get` and `set`, `set` is fine for locking but `get`?
- Rate limiting, Restricting the number of simultaneous connections or [restricting the number of connections per unit of time](https://gobyexample.com/rate-limiting). One way to do the first one is by using buffered channels to construct semaphores.
- `close(someChan)` indicates that no more values will be sent on `someChan`.

### So you want to expose Go on the Internet

🔍 [Link to post](https://blog.cloudflare.com/exposing-go-on-the-internet/)

- Earlier it was general wisdom to always put Go servers behind a reverse proxy like NGINX.
- Good idea to use _Timeouts_ when dealing with untrusted clients. `ReadTimeout`, `WriteTimeout` and `IdleTimeout` can be set in `http.Server`.
- `HTTP/2` is enabled automatically on any Go 1.6+ server if using TLS/HTTPS and it can also be set using various other ways.
- Avoid using `http.DefaultServeMux`; any package you import can have access to it, eg. if anything imports `net/http/pprof`, clients will be able to get CPU profiles. Instead instantiate an `http.ServeMux` yourself and set it as the `Server.Handler`.
- A metric you'll want to monitor is the number of open file descriptors when dealing with webservers. One can use `Server.ConnState` hook to get more detailed metrics of what stage the connections are in.

### Why do we use the Linux kernel's TCP stack?

🔍 This is a [combination](https://blog.cloudflare.com/why-we-use-the-linux-kernels-tcp-stack/) of [this](https://jvns.ca/blog/2016/06/30/why-do-we-use-the-linux-kernels-tcp-stack/) and [this](https://www.reddit.com/r/linuxadmin/comments/bnwcan/iptables_vs_nftables/).

We can run programs without having an OS/Kernel, we mostly tend to use an OS because it makes it easy to interact with the hardware using its APIs, also it adds a time sharing layer which allows multiple processes to run. _This is no different for the networking stack._ So it's possible to run a userspace program that'll directly access the network hardware but at the cost of losing the ability to run multiple network applications, that means a single application will be using the network hardware; common term for this is **kernel bypass.**

For **embedded systems**, some people either used [lwIP](https://savannah.nongnu.org/projects/lwip/) or write their own TCP stack to meet their requirements. Another reason to have userspace networking stack will be to add additional networking features when you can't control the underlying kernel version, like Google does with Android vendors. (unsure)

Another reason to use a custom stack would be for **latency and high performance**. Linux Network stack imo does pretty well here, roughly iptables can handle 1Mpps, but if an attack sends 3Mpps then the server will not be able to handle it. Kernel Bypass makes sense for switches or routers, dedicated loadbalancers, high throughput / low latency applications.

If [multiqueue is supported](https://lwn.net/Articles/289137/) instead of doing full kernel bypass we can do partial bypass in which kernel retains ownership of the network hardware and we do the bypass only on one `RX queue`.

> You can see if you have **multiqueue** using `ethtool -l <interface_name>`, if it shows non found or something similar, that means you either don't have multiqueue or the NIC driver is not correctly setup.

An example of a kernel bypass technology here would be [DPDK](https://en.wikipedia.org/wiki/Data_Plane_Development_Kit), It seems to be a network card driver and some libraries. It works based on polling instead of interrupts. [Seastar](http://seastar.io/) makes use of it. The fact that we are in need of DPDK, shows that the Linux Kernel is not fast enough for some needs, for special cases using userland stack is fine, but kernel should be fast enough for other tasks.

Applying the [end-to-end principle](/docs/notes/study/internet#end-to-end-principle) here, pushing as much work as possible out of the core kernel and toward the actual applications. It's faster if the data reaches the CPU running the application by facing minimum locking and shared data of the underlying network stack.

### Playing with the Linux Kernel Network Stack

- It can be agreed that 50kpps per core is probably the limit for any practical application. but what about the Linux Network stack?
- Measuring `pps` is more interesting than measureing `Bps`.
- for this experiment must ensure the traffic won't be interfered with by the iptables.
- it uses sendmmsg and recvmmsg instead of send and recv syscall because of efficiency. c programs were written for sender and reciver.
  https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/commit/?id=a2e2725541fad72416326798c2d7fa4dafb7d337
- uses the taskset command to Pinning the processes to CPUs so that kernel not shuffling our programs between cores. improved processor cache locality.
  MORE packets
- ethtool was used to determine where the packets went.
  rx_nodesc_drop_cnt shows how many packets are dropped by the NIC.

Example shows muliqueue, my laptop NIC does not support multique apparently.

- promblem with single RX queue was that impossible to deliver more packets than a single CPU could handle. To support multicore systems, NICs started supporting multiple RX queues.
- ethtool also allows choosing the multiqueue hashing algorithm
- NUMA performance with reciever program running on one CPU and the RX Queue recieving on other CPU, when run cross NUMA nodes, penalty is ~10% but variablity was bad.

RECIEVING in multiple IPS
two cores busy with handling RX queues, and third running the application, it's possible to get more speed.

if we keep on increasing this number of increasing the number of RX quque we are able to deliver through, we hit another limit that can be seen through netstat, the , this time we dont get rx_nodesc_drop_cnt but RcvbufErrors can be seen with netstat, (netstat no longer there!) this means This means that while the NIC is able to deliver the packets to the kernel, the kernel is not able to deliver the packets to the application.

> nstat is a tool to monitor kernel snmp counters and network interface statistics.

https://blog.cloudflare.com/how-to-achieve-low-latency/
https://blog.cloudflare.com/kernel-bypass/
https://blog.cloudflare.com/how-to-receive-a-million-packets/

### @bwploktas post on memory usage monitoring in Go1.12

🔍 [Link to post](https://www.bwplotka.dev/2019/golang-memory-monitoring/)

- Basically [Go1.12 started using `MADV_FREE`](https://github.com/golang/go/issues/23687#issuecomment-496705293) instead of `MADV_DONTNEED` with [`madvise`](http://man7.org/linux/man-pages/man2/madvise.2.html) which means that the running application will just mark the memory as **available for other to use** but will not release the memory immediately. This is useful and prevents wasted work releasing the memory for others to use in container environments where mostly there's only one process running in a container. But _does create some problem related to how monitoring applications should see memory now._
- Due to `MAD_FREE`, `container_memory_rss` and `container_memory_usage_bytes` show higher memory usage even if the program is not using that much memory.
- We could use `go_memstats_.*_inuse_.*`, `go_memstats_alloc_bytes` etc metrics to see **actual/accurate** allocations, but in-use memory does **NOT** include `mmap` files and memory allocated by CGO.
- The current recommendation is using `container_memory_working_set_bytes`(WSS) metric, which is just `total_inactive_file` subtracted from `container_memory_usage_bytes`
- If you want to know how much memory your Go program is really using, you need to carefully look at the various bits and pieces in `runtime.MemStats`, perhaps exported through `net/http/pprof`.

### Twitch Story: How I learnt to stop worrying and love the heap

🔍 [Link to post](https://blog.twitch.tv/en/2019/04/10/go-memory-ballast-how-i-learnt-to-stop-worrying-and-love-the-heap-26c2462549a2/)

- They were running a service called `visage` which was their API frontend, upon inspecting with [pprof](/docs/notes/study/go_lang/pprof) they found that, at steady state the app was triggering ~8–10 GC-cycles/s or ~600/m and 30% of CPU cycles were being spent in function calls related to GC!
- The Go pacer in their case was doing a superb job of keeping garbage on our heap to a minimum, but it was coming at the cost of unnecessary work, since we were only using ~0.6% of our system’s memory (The system had 64GiB memory and `visage` was only using like 400MiB).
- They could have fine tuned the `GOGC` variable to make the pacer trigger at slower pace but instead decided to use **"heap ballast"** to fix this problem, basically assigning a big allocation to the running application primarily because ballasts are easier to reason about.
- `ballast := make([]byte, 10<<30)`: Create a large heap allocation of 10 GiB; Using `byte` array enables the GC to mark the entire object in O(1) time.
  > Just in case `10<<30` means `10*2^30` since `2^30 ~= 1bn` and 1bn bytes = 1GB
  >
  > **Doubt**: Does this not mean `gc pause` will only occur when `VSZ` crosses `20GiB`, i.e the double. If the case is that 20GiB is never reached, `gc pause` is never run? (Maybe gc cycle a better word as Go GC is concurrent)
- Memory in ‘nix (and even Windows) systems is virtually addressed and mapped through _page tables_ by the OS. The array the ballast slice points to will be allocated in the program’s virtual address space(VAS). So, only if we attempt to read or write to the slice, will the page fault occur that causes the physical RAM backing the virtual addresses to be allocated. The post shows a nice example of this comparing `Resident Set Size(RSS)` and `Virtual SiZe (VSZ)` : This basically means, **just** allocating the `10GiB` ballast will **not** actually takeup `10GiB` in the physical RAM.
- They also saw **improvement** in _API latency_, as a result of the GC running less frequently; but this actually happened due to the fact that the Mutator(our application) now has to do no `MARK ASSIST` work when GC cycle is not running. So by simply reducing GC frequency, they saw close to a ~99% drop in mark assist work.
- Finally offers some nice thoughts on why `MARK ASSIST` is a good idea in a concurrent GC.
