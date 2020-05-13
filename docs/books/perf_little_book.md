---
id: perf_little_book
title: Linux perf little book
sidebar_label: Linux perf little book
---

Link to [online version of this book.](https://nanxiao.gitbooks.io/perf-little-book/) 😄

## Summary
`perf` sometimes refers to the `perf_event` subsystem which was introduced with Linux 2.6.31(2009) but otherwise can also point to the comprehensive user-space tool, which leverages `perf_events` subsystem to do performance analysis. This book is mostly about the user-space `perf` utility.

Most commonly, **profiling information** serves to aid program optimization. Profiling is achieved by instrumenting either the program source code or its binary executable form using a tool called a profiler. *Profilers* may use a number of different techniques, such as event-based, statistical, instrumented, and simulation methods.

`perf` is a profiler, and it offers two techniques:
- `perf record`: **Sampling** is checking running system periodically to show the hotspot of the application. (**continuous data?**)
- `perf stat` **Counting** is just a statistic of some events (mostly need support from underlying hardware). (**discrete data?**)
---
> Following are the chapterwise summary.
## Example
This chapter demonstrates how to profile a program by running `perf record` on a cpp program and use `-g` with `gcc` to map the assembly code to source code and with `perf record -g`, which records function call stack information. This stack information can be accessed by using <kbd>+</kbd> in the record.

## Targets
`perf` can profile other targets than just the executable/program, other targets include; Process, Thread, User, CPU, System-wide.

When using sampling, `-F` can be used to denote sampling frequency(Hertz), it is usually set to an odd number to avoid lockstep sampling.

> [Lockstep systems](https://en.wikipedia.org/wiki/Lockstep_(computing)) are fault-tolerant computer systems that run the same set of operations at the same time in parallel. [Lockstep sampling](https://stackoverflow.com/questions/45470758/what-is-lockstep-sampling) is when the profiling samples occur at the same frequency as a loop in the application. As for the odd number, it seems to be based on an assumption that there are natural frequencies for program operations, and these are even.

## Events
Along with various targets, `perf` can also monitor various events(hw/sw etc), lists various ways to specify events to `perf`. User can run `perf list` to view all events. `-e`(events) can be specified to `perf record`, `perf stat`, `perf top` and `perf trace` commands.

`skid` is the distance between events which trigger the issue and the events which are actually caught by `perf`. In short it happens because of the delay between performance monitoring interrupt issued and capture of instruction pointer (IP). Intel(PEBS) and AMD(IBS) decided to improve sampling accuracy differently.
```md
; load1 
; load2
; load3 <-- here profile shows you lots of L1D-cache misses
```
In reality `load1` is the instruction that causes L1D-cache misses! `skid` is the distance between `load1` and `load3` then.

### Counting events
`perf stat` is used to count interested events, `-I` flag can be used to set the count delta (unit is ms) when the output is presented.

## Memory Profile
`perf mem` command can be used to profile memory access. The same `record` and `report` constructs work with `perf mem` eg. `perf mem record`. User can specify one of load and store operation with the `-t` flag, by default counts both.

## False sharing
> [**False sharing**](https://www.youtube.com/watch?v=FygXDrRsaU8) is a performance-degrading usage pattern that can arise in systems with distributed, coherent caches at the size of the smallest resource block managed by the caching mechanism.
>
> Simply put, when some particular data is stored in a *cache block/cache line* of one processor and that data is now required by another processor, it'll invalidate the entire line to get the data which could possibly have other data in it aswell forcing memory stalls in addition to wasting system bandwidth.

`perf c2c` command is used to debug this issue.

## Tracing
`perf trace` works like `strace`, which show system calls of command.

## Scheduler
Scheduling latency is the time that the system is inproductive because of scheduling tasks. It is system latency incurred because it has to spend time scheduling. It primarily consists of two things; context switch, time taken to make the scheduling decision.

`perf sched` can be used to measue scheduling latency.

## ftrace
A ftrace-enabled Linux kernel is built by enabling the `CONFIG_FUNCTION_TRACER` kernel configuration option. It gives users the ability to see what is happening inside the kernel. It is commonly used as a debugging tool. It does not have a frontend, but `trace-cmd` is generally used as the frontend to ftrace.

`perf ftrace` is a simple wrapper for kernel's ftrace functionality.

## Comparision
`perf diff` command is used to displays the performance difference amongst two or more `perf.data` files.