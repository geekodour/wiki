---
id: filesystems
title: Filesystems
sidebar_label: Filesystems
---

## Common Terms

### inodes

- Everything in unix are files, hard drives, pipes, network devices, `stdin/stdout` etc. but what we actually deal with are inodes, they are a data structure to represent a file, specifically a file's metadata.
- inodes are stored on disk, and they contain the actual location(not the path!) of the file. For bigger files, it will store the addresses of disk blocks.

### file desc vs inodes

### Types

There are various types of filesystems, Log structured fs (not widely used), Journaling file system (ext family, NTFS etc), overlay filesystems, union filesystems etc. Linux supports a large number of file systems, from journaling to clustering to cryptographic.

## VFS

Basically the idea is to have multiple fs on the disk but they appear to be one filesystem layer to the user.

Key idea is to build a separate abstract layer that calls the underlying concrete FS and exposes a common interface for the userspace. This means, all sys calls related to files are directed to the VFS.

This also means that, To create a new fs you must supply all the methods that the VFS requires.

![](/img/2020-07/vfs.gif)

For eg. the `read` syscall is unaware of the underlying file system types(ext3/NFS). It is also unaware of the particular storage medium upon which the file system is mounted(ATAPI/SCSI (SAS) disk/SATA). It is also unware of the physical medium (ssd/hdd)

### Booting

We tell the kernel where to find the root filesystem using the following kernel boot parameter:

```
root=/dev/hda1
```

- root fs is booted with vfs
- other fs register to the vfs by providing all the methods that vfs requires for that fs

### Syscall mechanism

`open('/usr/myfile.txt')`

- vfs sees that the fs is mounted at `/usr`
- then looks for the superblock
- find the root directory and the path
- VFS created a `v-node` and makes a call to the actual fs to fetch all the info in the file's `inode`
- `vnode` lives in ram with other info about the file like calls like read, write, close etc
- make an entry in the FD table and point it to the new `vnode`
- return the FD to the caller where the syscall was made

## Container Filesystem

- https://unix.stackexchange.com/questions/399717/does-docker-still-have-bootfs
- no such thing as bootfs
- There is a reference of `rootfs` when discussing containers, which is completely different from the rootfs that is related to the booting of an OS.

## Binding, Mounting, Volumes

### Binding

Classically, mounting creates a view of **a storage device** as a directory tree.

```shell
~/Practice/binn
λ tree
.
├── A
│   └── abc
├── B
│   └── xyz
└── C
~/Practice/binn
λ sudo mount A C
mount: /home/geekodour/Practice/binn/C: /home/geekodour/Practice/binn/A is not a block device.
~/Practice/binn
λ sudo mount --bind A C
~/Practice/binn
λ ls C
abc
~/Practice/binn
λ sudo umount C
~/Practice/binn
λ ls C
```

A bind mount instead takes an **existing directory tree** and replicates it under a different point. The directories and files in the bind mount are the same as the original. Any modification on one side is immediately reflected on the other side, since the two views show the same data.

> [**Bind Mounts and Symbolic Links**](https://unix.stackexchange.com/questions/198590/what-is-a-bind-mount)
>
> Bind mounts and symlinks both serve similar purposes: Making the same file (or directory) appear in more than one location. If a process follows a symbolic link, the file/directory it refers to will be resolved in the context of that process. This is not what we want if we want to access say `/dev` in a chrooted env. That's where bind mount come into play.
>
> However, there is one important scenario where bind mounts are used routinely rather than symlinks: chroot environments (e.g. for containers).

### Mount related files

- `/etc/fstab` is a list of filesystems to be mounted at boot time.
- `/etc/mtab` is a list of currently mounted filesystems. (It's symlinked to `/proc/self/mounts`)

````
λ ls -la /etc/mtab
lrwxrwxrwx 1 root root 19 May 20 04:12 /etc/mtab -> ../proc/self/mounts

## Pseudo Filesystems

Source: [jhonsofteng](https://johnsofteng.wordpress.com/2013/11/20/sysfs-procfs-sysctl-debugfs-and-other-similar-kernel-interfaces/)

In order to exchange data between user space and kernel space the Linux kernel provides a couple of RAM based file systems. These interfaces are, themselves, based on files. VFS FTW! These are “virtual (pseudo) filesystems” (not existing on Disk, but only in RAM).

```shell
cat /proc/filesystems
# doctored output
sysfs tmpfs bdev proc cgroup cgroup2 cpuset devtmpfs binfmt_misc configfs
debugfs tracefs securityfs sockfs bpf pipefs ramfs hugetlbfs devpts autofs
efivarfs mqueue pstore ext3 ext2 ext4 vfat overlay
````

There are other fs that are not listed here, such as: fusectl, procfs, rpc_pipefs, [nsfs](https://unix.stackexchange.com/questions/465669/what-is-the-nsfs-filesystem), [devpts](https://en.wikipedia.org/wiki/Devpts) etc.

### procfs

```shell
mount -t proc proc /proc
# Location: /proc
```

Originally designed to export all kind of process information such as the current status of the process, or all open file descriptors to the user space. Since kernel 2.5/2.6 the kernel-interface was moved to `/sys`, because `/proc` got cluttered with lots of non-process related information.

> **About `/proc/sys`**
>
> `/proc` has a special directory: `/proc/sys`, It allows to configure a lot of parameters of the running system. Usually each file consists of a single value. All directories and files below /proc/sys/ are not implemented with the procfs interface. Instead they use a mechanism [called sysctl](https://en.wikipedia.org/wiki/Sysctl). So when we are using `sysctl` it is doing stuff with `/proc/sys`.
>
> If a value is set by the `sysctl` command it only persists as long as the kernel is running, but gets lost as soon as the machine is rebooted. In order to change the values permanently they have to be written to the file `/etc/sysctl.d/*`.

### sysfs

```shell
# Location: /sys
mount -t sysfs sysfs /sys
mount -t debugfs none /sys/kernel/debug
mount -t configfs none /sys/kernel/config
```

Basically contains non-process info(such as device info etc.) that was previosly in `/proc`. It provides functionality similar to the `sysctl` mechanism. `/sys` mirrors the internal kernel data structures that manage the system's resources, designed to represent the whole device model as seen from the Linux kernel.

> `procfs` allows arbitrary [file_operations, `sysfs` is more restricted](https://unix.stackexchange.com/a/382315/147246) in that way. `sysfs` has sort of a strict one-value-per-file rules.

There are various directories inside `/sys`, One such is `/sys/kernel` which holds directories (mount points) for other filesystems such as [debugfs](https://en.wikipedia.org/wiki/Debugfs), securityfs. This also holds [configfs](https://en.wikipedia.org/wiki/Configfs).

> ### `configfs` vs `sysfs`
>
> - `configfs`: **creating, managing and destroying** `kernel objects` from `user-space`. `configfs` is a kernel manager in the form of a filesystem.
> - `sysfs`: **viewing** `kernel objects` from `user-space` which are created and destroyed by the kernel.

> DOUBT: sysfs uses `store` and `show`, so we can create in sysfs?

### tempfs

Yet another fs. The `/dev` is usually a `devtmpfs` mount that is managed by udev. In general, **block devices** are devices that store or hold data, **character devices** can be thought of as devices that transmit or transfer data. There are other types of devices.

The `/dev` tree contains device nodes, which gives user space access to the device drivers in your OS’s running kernel.

## Other Filesystems

## Links

- https://en.wikipedia.org/wiki/Virtual_file_system
- https://www.kernel.org/doc/html/latest/filesystems/vfs.html
- https://www.usenix.org/legacy/publications/library/proceedings/usenix01/full_papers/kroeger/kroeger_html/node8.html
- https://kernelnewbies.org/RootFileSystem
  > [Rules on accessing `sysfs`](https://www.kernel.org/doc/html/latest/admin-guide/sysfs-rules.html)

## Things people say

> It's worth learning both how FAT32 works and how a simple inode-based filesystem works. They're quite different styles, and inode-based systems support things like hardlinks.
