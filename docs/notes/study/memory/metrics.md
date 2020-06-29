---
id: mem_metrics
title: Memory Metrics
sidebar_label: Memory Metrics
---

> Most common memory metric tools report usage are given in KiB because of `/proc/<pid>/smaps` reports stuff.

- ig pmap deals with /proc/maps
- `man top`
- I think smaps means shared maps

> Some Lingos: [Thrashing](<https://en.wikipedia.org/wiki/Thrashing_(computer_science)>), [Swappiness](https://en.wikipedia.org/wiki/Paging#Swappiness), [High Memory](https://en.wikipedia.org/wiki/High_memory)

--

### Three types of memory:

- Physical Memory
- Swap Memory (Dirty Physical Memory)
- Virtual Memory

### Another from Video:

Memory is devided into multiple types: anon, (cache, buffers: two sides of the same coin : unified page cache), sockets etc.

> One senario about OOMs, even if there are a lot of cache and buffers available, if the kernel decides that there are important things in these it will not evict them! - Reclaimable or unreclaimable is not guranteed!! Also some page types maybe totally unreclaimable like some kernel structures.

- When talking about reclaimable memory, we need to ask when is it reclaimable because it's not a binary option!
- Sometimes to use reclaimable memory we need to do something, eg. if we have a dirty page then we need to flush the content back to the disk before we can reclaim that space.

Because caches are so important, RSS measurement is kind of bs.

- Because of this variability in reclaimimnng stuff and because it's not so simple it's hard to predict when we be out of memory

---

### About Paging

> Read about Paging and Memory Mapping here. (wiki link)

It somewhat important to have some idea about paging but here are some important parts:

- In addition to this, paging introduces the benefit of page-level protection. In this system, user processes can only see and modify data which is paged in on their own address space, providing hardware-based isolation. System pages are also protected from user processes.
- Paging is possible due to the MMU which is a hardware thing

### About Swap

- It is not for emergency memory, to me it is how vm works in linux and all the memory hie. swap is not directly related to RAM, it has a certain usecases that cannot be done without swap.
- you can run a system without swap but it will not have the benifits that swap has to offer. People think if you don't use swap everything will happen in memory only, but it still has to to flush stuff to disk (filemapped io?) (DOUBT)
- SWAP is related to the memory types we discussed earlier and not directly related to RAM, and provides a backing store for them(anonymous memory doesn't have a place to go back to so goes to swap).
- You also cannot reclaim anonymous memory if there is no swap! (unsure)
- On SSDs, swapping out anonymous pages and reclaiming file pages are essentially equivalent in terms of performance/latency. On older spinning disks, swap reads are slower due to random reads, so a lower vm.swappiness setting makes sense there

Metrics for swap:

- Swap Activity (swap-ins and swap outs)
- Amount of swap space used

The kernel's aggressiveness in preemptively swapping-out pages is governed by a kernel parameter called swappiness. It can be set to a number from 0 to 100, where 0 means that more is kept in memory and 100 means that the kernel should try and swap-out as many pages as possible. The default value is 60.

## Other stuff

- **Virtual Memory Size**:

  - `VSZ` in `ps` = `VIRT` in `top`
  - Represents how much memory the program is able to access at the present moment, including ,mmapped files and swapped out pages, shared libraries, memory that's allocated but not used.
  - It includes all memory that the process can access, including memory that is swapped out, memory that is allocated, but not used, and memory that is from shared libraries.

- **Resident Set Size**:

  - `RSS` in `ps` = `RES` in `top`
  - An representation of how much actual physical memory a process is consuming, can be 0 for a process that's been sleeping.
  - Number of memory pages the process has in real memory multiplied by `pagesize`.
  - It excludes any swapped out memory pages.
  - Does RES include shared libraries??? Think yes. [QUESTION]
  - It does **not** include memory that is swapped out.
  - It does include all stack and heap memory. (?)
  - It does include memory from shared libraries as long as the pages from those libraries are actually in memory.

- **Shared Memory**

  - `SHR` column in Htop
  - Indicates how much of the `VIRT` size is actually sharable memory or libraries.
  - Whole library is mapped and counted in `VIRT` and `SHR`, but only parts of the **shared library** used are counted in `RES`

In 2009, [Matt Mackall](https://en.wikipedia.org/wiki/Mercurial) (Developer of Mercurial, 2005) began looking at the problem of accounting for shared pages in process memory measurement and added two new metrics called the unique set size or Uss, and the proportional set size or Pss

- PSS is in kilobytes, like all the other information you get in `/proc/<pid>/smaps`

* Uss: This is the amount of memory that is committed to physical memory and is unique to a process; it is not shared with any other. It is the amount of memory that would be freed if the process were to terminate.

* proportional set size
  - newer measure which tracks the shared memory as a proportion used by the current process.

- New metric: **memory pressure** : this can be used to kill the application before the oom kliller kills it, because memory can be full way before oom killer decides to kill it.

- Scan rate : how often cpu looking at page table

- there can be so many metrics related to memory

### Interesting Takeaways

- Since part of the memory is shared, many processes may use it, so if you add up all of the RSS values you can easily end up with more space than your system has.
- Processes that are forked have different address spaces but threads share the same address space. so the RSS, VSZ and PSS for each thread is identical to all of the other threads in the process.

See the "Linux Memory Types" section when you do `man top`

### Tools

htop, top, free, smem, vmstat

## Links

- https://chrisdown.name/2018/01/02/in-defence-of-swap.html
