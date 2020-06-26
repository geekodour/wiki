---
id: gc_essentials_udemy
title: Garbage Collection Essentials
sidebar_label: Garbage Collection
---

🔍 [Link to Course](https://www.udemy.com/course/essentials-of-garbage-collectors/)

Within each virtual address space, a process has to keep track of what is at which addresses, and that process is called memory allocation.

## Allocation Types

Two broad types, Static and Dynamic. (Stack and Heap are Dynamic allocations)

### Static

- The layout is known at compile time
- Early 1950s (Fortran)
- No runtime allocation
- Fixed Size and variables bound to initial memory locations
- No Recursion

### Stack

- Was introduced to support recursive calls with ALGOL
- Grows downwards ⬇️
- Stack pointer and base [pointer are manually worked on **in Assembly**](https://en.wikipedia.org/wiki/Function_prologue)
- Stack allocation is automatically managed **in languages like C**

### Heap

- Any memory chunk can pass around
- We can consume memory when needed
- Grows upwards ⬆️
- 🐉 Issues: Dangling Pointers and Memory Leak, which can be solved by GC.
- **Dangling Pointers**: When a pointer is pointing to a memory location that's been freed! (Free objects too early)
- **Memory Leak**: More memory on the heap than needed. A chunk is just there in the memory taking space and nothing is pointing to it. (Forget to free needed object)
- **Usage:** C: `malloc` and `free`, C++: `new` and `delete`, Go: `escape analysis` and `GC`

## Object Header

A datastructure used to maintain the state of each object for the allocator/collector purpose. It can contain things like markbit, ref count, freeblock flag etc.

> ![](/img/objheader.png) > _On x86_32, W=4bytes, so 5 bytes of `malloc(5)` needs 3 bytes of padding, the object header then will take another +N bytes on top of that. So were're actually adding some overhead to whatever memory we request_

## Memory Layout

The VAS of a process consist of stack, heap, code, data, arguments etc.

### Stack

![](/img/stackframe1.png) credit: eli's [blog](https://eli.thegreenplace.net/2011/02/04/where-the-top-of-the-stack-is-on-x86/#id4).

[`ebp` is the](https://stackoverflow.com/questions/1395591/what-is-exactly-the-base-pointer-and-stack-pointer-to-what-do-they-point) frame pointer/base pointer and `esp` is the stack pointer. When we say "top of the stack" on x86, we actually mean the lowest address in the memory area, hence the negative offset. `esp` points to the top of the stack.

> `rbp` and `rsp` are just the 64-bit equivalents to the 32-bit [`ebp`](https://practicalmalwareanalysis.com/2012/04/03/all-about-ebp/) and `esp` variables.

### Heap

Similar to the stack pointer(`esp`) the top of the heap is called the **program break**.
Moving the **program break** `up` allocates memory and moving it `down` deallocates memory.

> Writing to higher addresses than the program break will result in segfaults for ovious reasons.

We have a syscall to do this, `brk` and `sbrk`(wrapper around `brk` that allows a increment rather than direct address unlike `brk`), when we are using `brk` it gives us new memory based on the page size(see obj header diagram above)

Another syscall relevant here is `mmap`, it allows your program to allocate more memeory aswell but gives you more options than just to bump up/down the **program break**.

#### The C standard Library

- `malloc()`: This library functions gives us access to the memory allocator, it uses `brk()` and `mmap()` behind the scenes based on the implementation.
- `free()` might put the block into an internal pool for recycling by malloc(), or it can be given back to the kernel (which can then free up the underlying physical pages).

## Mechanisms for Memory Allocation

### Sequential(Bump)

Does not try reuse any of the existing free blocks of memory, just keep bumping the allocation pointer whenever new memory is requested. It's fast but not every system supports it as it involves relocating objects of the GC cycle.

- **Example Allocators**: Pool Allocator.
- **Example Collectors**: Mark Compact, Copying GC, Generational GC

### Free list

Maintains list like data structuire of data structures of free blocks it reuses the freed blocks of memory. There are several ways the search mechanism for free blocks can be done: FirstFit, NextFit, BestFit, Segregate Fit(probably the best so far)

- **Example Collectors**: Mark Sweep, Manual Memory Management, Ref. Count GC

## Garbage Collector

Terms that comeup often when talking about GC, mutator, collector, allocator. The Allocator and the collector need to kind of agree on how both will handle things Eg. For Marksweep collector to be at use, we need to be using freelist allocation.

![](/img/mca_cycle.png)

- **Mutator**: Shows how and where things should be allocated by the allocator.
- **Allocator**: `memalloc`, handles dynamic memory alloc, returns pouinter
- **Collector**: GC, reclaims memory and preserves mutator view.

### Approaches to GC

> The primary reason of having different approaches is to minimize GC pause, such as running the collector concurrently.

- Stop the World (STW) : All the threads in the mutator are blocked
- Concurrent
- Incremental

### Garbage Types

We know that our objects aswell as the garbage live in the Heap area.

- **Semantic Garbage**: Alive but unused objects. Eg. non-invalidated cache, bugs in the program such as a variable that is in the program but is unused.
- **Syntactic Garbage**: Data that cannot be reached by our code. GC **only** works on these kind of garbages.

### Collector Types

- **Tracing**: Scans the heap to search for live objects and treat everything else as garbage. It starts its analysis from the `root`, in a `STW` collector, trace happens during GC pause.
- **Direct**: No explicit GC pause is there, it is deeply integrated with the mutator such as maintaing a list of references to an object to directly collect when needed.

## GC Algorithms

- **Tracing Collectors**: MarkSweep, MarkCompact, CopyingGC
- **Direct Collectors**: Ref Count

### MarkSweep

Two phases, **Mark** traces the live objects and **Sweep** reclaims the garbage. It uses the object header to store a `mark-bit`; if object is alive, this flag will be set.

The mark phase marks the live objects and traverses the entire heap to find unmarked objects and adds them into the freelist. It's a **non-moving**(live objects are not relocated) collection algorithm, which is nice for languages exposing pointer semantics.

Main Issue: Fragmentation, fixed by Mark compact and CopyingGC

### MarkCompact

Has better cache locality and faster memory allocation and has two phases, **Marking Phase**, similar to Mark phase in MarkSweep but this store additional info in the object header for relocation.

The **Compacting Phase** has again a lot of algorithms like 2 fingers, The lisp2(most used),Threaded and Onepass.

### Copying Collector/Sem-Space Collector

This trades storage for speed and requires half of the heap to be reserved for the collector! It's sometimes referred to as the CopyingGC

### Ref.Count GC

It is a direct collector which is able to identify the garbage directly.
