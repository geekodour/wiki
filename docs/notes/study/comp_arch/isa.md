---
id: isa
title: Instruction set architecture
sidebar_label: Instruction set architecture (ISAs)
---

ISAs are one of the most fundamental abstractions in computing. An instruction set architecture (ISA) is an abstract model of a computer. A realization of an ISA, such as a central processing unit (CPU), is called an implementation.

In general, an ISA defines the supported data types, the registers, the hardware support for managing main memory fundamental features (such as the memory consistency, addressing modes, virtual memory), and the input/output model of a family of implementations of the ISA.

One ISA can have multiple implementations that differ in performance, physical size, and monetary cost (among other things). i.e, There is binary-code compatibility.

## Classification

> Section needs more work

A common classification for ISAs is by architectural complexity:

- Classical single-processor von Neumann systems.
- **RISC**: Efficiently implementing only the instructions that are frequently used, less common operations are implemented as subroutines, having their resulting additional processor execution time offset by infrequent use.
- **CISC**: Has many specialized instructions, some of which may only be rarely used in practical programs.
- There are few other types aswell.
