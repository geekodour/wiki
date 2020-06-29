---
id: vm
title: Notes on Virtual Memory
sidebar_label: Virtual Memory
---

Contents of the computer memory can be transferred to secondary storage; a very common way of doing this is through a memory management technique called "virtual memory", other old ways of managing memory were the single contagious model and partition model. As modern computers typically are running multiple tasks, reading and writing directly from/to physical memory is a bad idea.

It can be implemented using:

- **Segmentation**
- **Page Table/Paged Virtual Memory**

**Terms/Jargons:**

- Process Virtual Memory: **Pages** (Usually 4-64 KB in size) often with the capability to use so called huge pages of 2 MB or 1 GB in size. Sometimes(all zeroes) a page may not be backed by a page frame.
- RAM, physical memory: **Frames**, it is sometimes also called **Page Frame.** A page frame may back multiple pages. e.g. shared memory or memory-mapped files.
- **Blocks**: The Virtual memory of a process is split into blocks of equal size, pagesize = blocksize. Sometime `Page` can simply refer to the `Block`
- **Demand Paging** : The operating system copies a disk page into physical memory only if an attempt is made to access it and that page is not already in memory.

## Paging

> Run `getconf PAGESIZE` to view the pagesize in your computer in bytes.
>
> ```shell
> λ getconf PAGESIZE
> 4096
> ```

The operating system maintains **per process page table** which are stored in the RAM, due to **page tables**, we no longer need to store blocks in contagious manner and everytime the processor tries to access a memory location, it looks into the page table to find the **page frame number.**

| block | page frame |
| ----- | ---------- |
| 1     | 13         |
| 2     | 76         |
| 3     | 55         |

An **access memory location** can be:

- An intruction
- Load/Store to some data.

When this memory location access happens for `block 3`, the memory management unit(MMU) in the processor would intercept the access and lookup the **page table** to find the corresponding **page frame** and will generate a **physical address** which will point to `55th page frame` in the RAM.

### Virtual address space(VAS)

> ```c
> printf("%p", &i);
> ```
>
> This will show the virtual address of `i`, not the physical address. Virtual addresses are the size of a CPU register.

A process is represented by its vitual address space which is a contagious address space from `addr0` to `MAX_SIZE`. When compiling with `gcc`, the `a.out`(the executable) file contains information about how to create the virtual address space.

The virtual addresses(block addresses) consists of two parts, `table index` and the `offset`. The **physical address** is constructed from the `offset` of the virtual address and the page frame.

> Even [when we have 512 physical](https://landley.net/writing/memory-faq.txt) memory on a 32bit processor, the process will believe that it has 4GB of memory. Thanks to memory mapping.

### Locking Pages

When a page fault occurs and kernel needs to do I/O for paging in, the execution time of an instruction that would normally be a few nanoseconds is suddenly much, much, longer. We can Lock pages for programs that are sensitive to that.

### Page Types

This is not really documented but these are actually usage of pages that I just thought can also be termed "types"

- Pages that are responsible for holding the code for each process being run on your computer.
- Pages responsible for caching data and metadata related to files accessed by those programs in order to speed up future access.
- Pages which are responsible for the memory allocations made inside that code, for example, when new memory that has been allocated with `malloc` is written to, or when using mmap's `MAP_ANONYMOUS` flag. These are "anonymous" pages.

---

- shared memory, slab memory, kernel stack memory, buffers,
- Memory is devided into multiple types: anon, (cache, buffers: two sides of the same coin : unified page cache), sockets etc.

## MMU Mapping

In order to implement Paged Virtual Memory, there is a chip called Memory Management Unit (MMU). MMU sits between CPU and memory but in practice, it's right there in the CPU chip itself. The MMU maps memory through a [series of tables](https://wiki.osdev.org/Paging), two to be exact. They are the paging directory (PD), and the paging table (PT).

The operating system maintains **per process page table** which are **stored in the RAM** when a process starts to execute. The page table is where the operating system stores its mappings of virtual addresses to physical addresses, with each mapping also known as a **page table entry (PTE)** (So each page table entry us a page????).

The `PTBR`(Page Table Base Register) holds the address to the base address of the **page table**.

> `CR3` register on x86 processors hold the physical base address of page directory (PTBR)

The **translation lookaside buffer (TLB)** is a memory cache in the `MMU`, It stores the recent translations of virtual memory to physical memory and can be called an address-translation cache. The majority of desktop, laptop, and server processors include one or more TLBs in the memory-management hardware.

## Links

- [libc manual memory concepts](https://www.gnu.org/software/libc/manual/html_node/Memory-Concepts.html#Memory-Concepts)
- [Kerverl Virtual Memory vs User Vertual Memory](https://stackoverflow.com/questions/8708463/difference-between-kernel-virtual-address-and-kernel-logical-address)
