---
id: filesystems
title: Filesystems
sidebar_label: Filesystems[WIP]
---

## inodes

- Everything in unix are files, hard drives, pipes, network devices, `stdin/stdout` etc.
- But what we actually deal with are inodes, they are a data structure to represent a file, specifically a file's metadata.
- inodes are stored on disk,and they store the actual location(not the path!) of the file. For bigger files, it will store the addresses of disk blocks.

https://en.wikipedia.org/wiki/Virtual_file_system

It's worth learning both how FAT32 works and how a simple inode-based filesystem works. They're quite different styles, and inode-based systems support things like hardlinks.

Linux VFS interface

## Types

- Log structured fs (not widely used)
- Journaling file system (ext family, NTFS etc)
- Virtual file system (VFS)
  - In linux, or Windows you can have multiple fs on the disk but they appear to be one FS to the user : VFS
  - all sys calls related to files are directed to the vfs
  - Key idea is to build a separate abstract layer that calls the underlying concrete FS and exposes a common interface for the userspace
  - This also means that, To create a new fs you must supply all the methods that the VFS requires.
  - FS under the VFS can be: local on the disk, NFS
  - Unlike traditional file systems that essentially work with data on mass storage, virtual filesystems don't actually store data themselves.

## Understanding VFS

- system is booted
  - root fs is booted with vfs
  - other fs register to the vfs by providing all the methods that vfs requires for that fs
- when a file is required by a sys call
  - eg. `open('/use/myfile.txt')`
  - vfs sees that the fs is mounted at `/usr`
  - then looks for the superblock
  - find the root directory and the path
  - VFS created a `v-node` and makes a call to the actual fs to fetch all the info in the file's `inode`
  - `vnode` lives in ram with other info about the file like calls like read, write, close etc
  - make an entry in the FD table and point it to the new `vnode`
  - return the FD to the caller where the syscall was made
