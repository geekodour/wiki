---
id: ipc
title: Inter Process Communication
sidebar_label: Inter Process Communication
---

We can make two processes communicate with each other using IPC.

## Shared memory

One process creates an area in RAM which the other process can access, it's fast and no sys calls are involved but it does need some kind of synchronization.

## Message Passing

Shared memory created in Kernel, sys calls such as `send`,`recieve` etc are involved. Pipes make use of message passing.

## Signals

Signals are asynchronous, unidirectional communication between processes. When a process receives a signal, it processes the signal immediately, without finishing the current function or even the current line of code.
