---
id: vm
title: Notes on Virtual Memory
sidebar_label: Virtual Memory
---

Contents of the computer memory can be transferred to secondary storage; a very common way of doing this is through a memory management technique called "virtual memory", other old ways of managing memory were the single contagious model and partition model.

It can be implemented using:

- **Segmentation**
- **Page Table/Paged Virtual Memory**

**Terms:**

- Process Virtual Memory: **Pages** (Usually 4-64 KB in size) often with the capability to use so called huge pages of 2 MB or 1 GB in size. Sometimes a page may not be backed by a page frame.
- RAM, physical memory: **Frames**, it is sometimes also called **Page Frame.** A page frame may back multiple pages. e.g. shared memory or memory-mapped files.
- **Blocks**: Process is split into blocks of equal size, pagesize = blocksize.

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

## Demand Paging

The operating system copies a disk page into physical memory only if an attempt is made to access it and that page is not already in memory.

### Virtual address space(VAS) of a process

> ```c
> printf("%p", &i);
> ```
>
> This will show the virtual address of `i`, not the physical address.

A process is represented by its vitual address space which is a contagious address space from `addr0` to `MAX_SIZE`. When compiling with `gcc`, the `a.out`(the executable) file contains information about how to create the virtual address space.

The virtual addresses(block addresses) consists of two parts, `table index` and the `offset`. The **physical address** is constructed from the `offset` of the virtual address and the page frame.

- [Why do x86-64 systems have only a 48 bit virtual address space?](https://stackoverflow.com/questions/6716946/why-do-x86-64-systems-have-only-a-48-bit-virtual-address-space)

## MMU Mapping

The operating system maintains **per process page table** which are stored in the RAM when a process starts to execute.

The `PTPR`(Page Table Pointer Register) holds the address to the base address of the page table which is stored in the primary memory.

> `CR3` register on x86 processors hold the physical base address of page directory (PTPR)

The **translation lookaside buffer (TLB)** is a memory cache in the `MMU`, It stores the recent translations of virtual memory to physical memory and can be called an address-translation cache. The majority of desktop, laptop, and server processors include one or more TLBs in the memory-management hardware.
