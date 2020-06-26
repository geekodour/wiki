---
id: mem_metrics
title: Memory Metrics
sidebar_label: Memory Metrics
---

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

In 2009, Matt Mackall began looking at the problem of accounting for shared pages in process memory measurement and added two new metrics called the unique set size or Uss, and the proportional set size or Pss

- Uss: This is the amount of memory that is committed to physical memory and is unique to a process; it is not shared with any other. It is the amount of memory that would be freed if the process were to terminate.

- proportional set size
  - newer measure which tracks the shared memory as a proportion used by the current process.

### Interesting Takeaways

- Since part of the memory is shared, many processes may use it, so if you add up all of the RSS values you can easily end up with more space than your system has.
- Processes that are forked have different address spaces but threads share the same address space. so the RSS, VSZ and PSS for each thread is identical to all of the other threads in the process.

See the "Linux Memory Types" section when you do `man top`

### Tools

htop, top, free, smem
