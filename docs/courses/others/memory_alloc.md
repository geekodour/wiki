---
id: memory_alloc_udemy
title: Memory Allocation - Dmitry
sidebar_label: Memory Allocation - Dmitry
---

- dmitrysoshnikov.com/compilers/writing-a-memory-allocator/ and the udemy course.

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

A datastructure used to maintain the state of each object for the allocator/collector purpose.
