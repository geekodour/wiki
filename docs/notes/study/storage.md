---
id: storage
title: Storage
sidebar_label: Storage[WIP]
---

- [Don't Be Afraid of RAID](https://louwrentius.com/dont-be-afraid-of-raid.html)

![](/img/2020-07/ssd-interface-types-comparison.png)

### Meta

- What is `/proc`?
  - `procfs` is the virtual filesystem... /proc is where it is mounted
  - regarded as a control and information centre for the kernel.
  - `sysctl` : it is a tool for examining and changing kernel parameters at runtime. it is implemented in procfs.
  - The most distinctive thing about files in this directory is the fact that all of them have a **file size of 0**, with the exception of kcore, mtrr and self.
  - More [info](https://www.tldp.org/LDP/Linux-Filesystem-Hierarchy/html/proc.html)
  - `man 5 proc`

### Storage Partitions

**Showing partition**

- `cat /proc/partitions` : List partitions
- `fdisk -l` does almost the same

**Creating partition**

- `fdisk` and `parted` are most popular
- new partitions use unpartioned disk space
- you can set types

**Formatting partition**

- Putting a filesystem on a partition == "Making a filesystem"
- Filesystems are what gets mounted
- `mkfs -t <type> <partition>` eg. `mkfs -t ext4 /dev/sdb1`
- Ordinary files can also be formatted and mounted (???)

**Mounting a FS**

- `mount` lists all the mounted file systems
- Associating a directory with a FS
- `mount /dev/sdb1 ~/poop`
- The type of FS is automatically detected by the `mount` command, so specifying a type is not necessary

**Special FS (Non disk file systems)**

- procfs, sysfs, debugfs, NFS etc : These are also mounted by the `mount` command
- But here we have to specify types:

  - `mount -t <type> <device_file> <directory>`
  - `mount -t proc proc /proc`
  - `mount -t sysfs sysfs /sys`

- **Loop devices**

  - loop devices are not loobpack devices, some ppl wrongly call loop devices loopback devices
  - it is a `pseudo device` that makes a `file` accessible as a `block device`
  - `file` containig a filesystem: eg. `.img` files.
  - Eg. `.img` files can use `loop devices` to become `block device` which are accessible by the user after mounting that `block device` to a mount point.

  ```shell
  $ losetup /dev/loop0 example.img
  $ mount /dev/loop0 /home/you/dir
  ```

- **Device file or Special Files**
  - **Device Driver**: a program that controls some type of device attached to the computer, sw if to hw devices.
  - Functions that device drivers play as part of the kernel
    - device discovery
    - detecting device state changes
    - similar low-level hardware functions.
    - After loading a device driver into memory from the kernel, detected events are sent out to the userspace daemon udevd.
  - a device file or special file is an interface to a device driver that appears in a file system as if it were an ordinary file.
  - device files also used for:
    - accessing system resources eg. data sinks, random number gen
  - **Types:**
    - character special files - unbuffered
    - block special files - buffered
  - most `device files` are part of a Virtual FS mounted at `/dev`, `device files` may be associated to a controling daemon
  - **IMP:** Linux only uses block devices, it does give option to simulate character file opens
  - `pseudo device`: `/dev/null` , `/dev/zero`, `/dev/full`, `/dev/random/`
  - realated system call : `mknode()`
  - Hardware can be accessed through system calls or over their device nodes.

**Identifying Storage**

- `cd /dev/disk/`
- `lsblk`
- `blkid`
- sysfs: has general info about hw decives/drivers
  - `/sys/block` : lists block devices that the kernel knows about, including parttions

#### udev

### File system types

- the kernel has lots of filesystems built into it
  - **Disk based FS** can be based on:
    - Journaling (writing what you are going to do, and writing again after you did)
    - Speed, small files, large files, what data structures they use etc
      - Some fs are faster if you're using small files, some are faster if you're using large files
    - Capacity
    - copy on write(CoW)
    - Extended attributes
    - Compression
    - Encryption
- Types
  - ext4
  - btrfs
  - xfs
  - FUSE(File System in Userspace) : i.e not as part of the kernel
    - usually a convinient interface for other data in form of a FS
    - might not have to be root to use it
    - eg. snapchhatfs, gmailfs, sshfs etc
  - Encrypted file systems
    - Using LUKS (Linux Unified Key Setup) disk encryption
      - Encrypt partitions
      - Encrypt swap devices etc

> **Quick Tip:** Creating a file of arbirary bytes
> `dd` : data dump
> `$ dd if=/dev/zero of=./mytempimage.img bs=1MB count=500`
> The above command generates a file mytempimage.img whose size is 500M

### LVM (Logical Volume Manager) [idk about this much]

- A layer above physical partitions that allows multiple partitions to appear as one.
- Grow a filesystem by adding physical space
- Physical disk like as disk or partition to be used with lvm

### Skipping hella info here

### NFS

- The filesystem resides in a server
- Client mounts the fs into their system tree
- Issues
  - Security
  - Perf.
  - Locking
  - Scalability
- Ways:

  - single server
  - Distributed
  - Cluster

- NFS is the unix way of doing network fs
  - Common for home directories
- Distributed FS resides on multiple servers but appears as a single FS to clients
  - OpenAFS
  - GlusterFS

## RAID

- with raid you store in a way that if a drive fails, you lose no data. (in perticular types of raids)
- raid no substiutes for data.

## Links

- https://bsdimp.blogspot.com/2020/07/old-school-disk-partitioning.html
