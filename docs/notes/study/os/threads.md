---
id: threads
title: Threads
sidebar_label: Threads
---

Each thread executes a thread function

## pthreads - POSIX threads.

`pthread_create` creates a new thread, this function returns immediately and Linux schedules both threads asynchronously, and your program must not rely on the relative order in which instructions are executed in the two threads. `pthread_exit` exits a process and takes in retval. `pthread_join` is like the wait family.

A `pthread` can be either be created as a **joinable thread** (the default) or as a **detached thread**, a detached thread is cleaned up automatically when it terminates.

Thread cancellation are of three types(`pthread_setcanceltype`), **sync**, **async** and **uncancellable**. When a thread requests that another thread should terminate (`pthread_cancel`)

**Async cancellation** happens immediately, **sync/deferred cancellation** happen only after the thread decides that it can be cancelled at this point, requests are queued. This is done by using "cancellation points", this is also the default type. **Uncancellable** threads implement **critical sections**

> A critical section is a sequence of code that must be executed either in its entirety or not at all

### Thread specific data

Each thread has its own call stack. Sometimes it is desirable to duplicate a certain variable so that each thread has a separate copy, it can use implemented using "thread specific data area". Variables stored in this area are duplicated for each thread.

## Synchronization and Critical Sections

Three main synchronization device in GNU/Linux: **Mutex, Semaphores** and **Condition Variables**

### Race conditions

The threads are racing one another to manipulate the same data. It can exist on both single core and multicore systems. Solution can be synchronization, **Mutexes\***(MUTual EXclusion locks, a mutex is a special lock that only one thread may lock at a time.)\* GNU/Linux guarantees that race conditions do not occur among threads attempting to lock a mutex. We can use `pthered_mutexes` inside thread functions.

Moreover, any solution to the race condition should satisfy the following:

- **Mutual Exclusion**: No more than 1 process dealing with critical section at a given time.
- **Progress**: When no process is dealing with critical section, any process that requests entry should be given access.
- **No Stravation/Bounded wait**: Upper bound on the time a process enters the critical section while other processes wait.

> Single instructions like `add`,`%eax`,`%ebx` are themselves atomic, multiple instructions need to be explitcitly made atomic.

### Deadlocks

A deadlock occurs when one or more threads are stuck waiting for something that never will occur. This can happen due to **mutex**.

### Semaphores

A semaphore is a counter(+ve) that can be used to synchronize multiple threads. As with a mutex, GNU/Linux guarantees that checking or modifying the value of a semaphore can be done safely, without creating a race condition. There are various types; Kernel semaphore, POSIX semaphore, SystemV/Process semaphore.

### Condition Variables

With it, you can implement more complex conditions under which threads execute. A condition variable is generally used to avoid busy waiting (looping repeatedly while checking a condition) while waiting for a resource to become available. It enables you to implement a condition under which a thread executes and, inversely, the condition under which the thread is blocked.

Semaphores and condition variable can be used together, condition variables has no counter or memory unlike semaphores. Each condition variable should be accompanied by a mutex, `pthread_cond_t`.

Unblocking can be done with`pthread_cond_signal(pthread_cond_t)`, blocking a thread can be done with `pthread_cond_wait(pthread_cond_t, pthread_mutex_t)`: signals blocking of a thread

## Links
- https://nullprogram.com/blog/2015/05/15/
