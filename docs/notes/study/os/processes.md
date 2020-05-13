---
id: processes
title: Processes
sidebar_label: Processes
---

## Program v/s Processes

Program is the code you write, Process is the running instance of your program. That is, your program gets loaded into memory, registers from the processor are assigned to complete the execution of the process(your program).

### Ways to create process

Windows API provides the `spawn` family, Linux does not provide in one step.
Instead it gives `fork()` and the `exec()` family of functions. PIDs in linux are 16-bit numbers.

- `fork()` returns twice, once in the parent and once in the child. It basically clones p1 to p2, p2 runs the program.
- `exec()` [exec functions](https://geekodour.xyz/post/exec-family/) replace the program running in a process with another program.

## Context switch

Switching between different processes, the registers in the processor gets reassigned. Context switch can happen between `Kernel Mode` and `User Mode`, the process context information is stored in the Process Control Block*(PCB, a data structure used by the OS)*.

When switching modes from KernelMode to UserMode, state of p1 is saved and switched to p2. There are state changes among **Running**, **Ready** and **Blocked**, a **blocked** process cannot immediately become **running**, it has to be **ready** first.

An user process running means the dispacher isnt because cpu only run one thing at a time, the ways the OS gains control are as follows:

- **Exceptions** : sys calls, page faults, seg faults etc.
- **Hardware intrrrupts** : keyboard, network, ISR(Interrupt service routine).
