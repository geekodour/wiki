---
id: alloc
title: Memory Allocation
sidebar_label: Memory Allocation
---

## writing malloc

- https://danluu.com/malloc-tutorial/
- https://sites.cs.ucsb.edu/~rich/class/cs170/labs/lab1.malloc/
- https://arjunsreedharan.org/post/148675821737/memory-allocators-101-write-a-simple-memory
- http://www.cs.cmu.edu/afs/cs/academic/class/15213-f10/www/lectures/17-allocation-basic.pdf

Nowadays, the heap, where malloc() goes, is backed by mmap() calls which obtain chunks of memory at whatever address the kernel sees fit.
