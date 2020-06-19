---
id: memory_design
title: Memory Design
sidebar_label: Memory Design
---

> - **IA-32/x86_32/x86/i386** : $2^{32}$ ~= 4GB (32 bit address size) [32 bit machines can still support more ram.(PAE)](https://en.wikipedia.org/wiki/Physical_Address_Extension)
> - **x86_64/amd64** : $2^{64}$ ~= 16EB (48 bit addresses) [Why do x86-64 systems have only a 48 bit virtual address space?](https://stackoverflow.com/questions/6716946/why-do-x86-64-systems-have-only-a-48-bit-virtual-address-space)
>
> The computer will perform faster (the computer has the ability to calculate 2+2+2=6 instead of having to do 2+2=4+2=6 in an example) - Try this out. x86 vs x86_64

In early times CPU generally ran slower than its own memory, in the 1960s this changed to the opposite. This means CPUs now will wait for data to arrive from memory, so we focused on high speed memory access. This meant adding caches near the CPU, but caches get overwhelmed. With multiprocessors, this problem became more apparent as only one processor can access the computer's memory at a time that made other processors wait.

## NUMA

Non-uniform memory access (NUMA) is a computer memory design used in multiprocessing, where the memory access time depends on the memory location relative to the processor.
Under NUMA, a processor can access its own local memory faster than non-local memory (memory local to another processor or memory shared between processors).

To handle these(?) cases, NUMA systems include additional hardware or software to move data between memory banks.

## UMA

Uniform memory access (UMA) is a shared memory architecture used in parallel computers. All the processors in the UMA model share the physical memory uniformly.

## Multi-channel memory

Addressing the latency problem for non-numa systems can use multi-channel memory, in which a linear increase in the number of memory channels increases the memory access concurrency linearly

is a technology that increases the data transfer rate between the DRAM memory and the memory controller by adding more channels of communication between them.

> More Info
>
> - https://en.wikipedia.org/wiki/Intel_QuickPath_Interconnect
> - https://en.wikichip.org/wiki/amd/infinity_fabric
> - https://docs.openstack.org/nova/pike/admin/cpu-topologies.html
