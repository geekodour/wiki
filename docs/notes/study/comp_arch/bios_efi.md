---
id: bios_efi
title: BIOS and EFI
sidebar_label: BIOS and EFI
---

> I am writing this in 2020, so you'll probably never need to understand this sidenote. IDK why I am writing this.

The motherboard has some type of ROM chip that holds the firmware. This is the software that the CPU first starts executing at power on. This firmware(`BIOS`/`UEFI`) is supposed to do initialization of the hardware, typically provides some diagnostic output, and provides a way for the user to configure the hardware, then locates and loads the `boot loader`(grub etc.) into the RAM, which in turn locates and loads the OS.

- **Partitioning** is typically the first step of preparing a newly installed disk, before any file system is created. The disk stores the information about the partitions' locations and sizes in an area known as the partition table.
- There are two worlds here; `(BIOS+MBR)` and `(UEFI+GPT)`, let's try to understand them.

## BIOS

`BIOS` simply loads and executes the **first sector** from the secondary storage, called the `MBR`. `BIOS` let's you choose which disk/secondary storage if you wish to change it. (this is what you do when you want to format you computer etc.) `MBR` describes the partitions on the disk in a particular format, and contains a ‘boot loader’ or the start of the `boot loader`.

- `MBR` also only supports up to **four** primary partitions.
- Limited size of 32 bits for block addresses.
- Only upto 2TiB HDD etc.

## UEFI

`GPT` on the other hand is part of `UEFI` specification but can support `BIOS` as mentioned [below.](#support) How UEFI works is completely different from how BIOS works. UEFI does **not** look for something in the **first sector** of the bootable storage device. Hecc, UEFI [can boot remotely](https://en.wikipedia.org/wiki/Preboot_Execution_Environment). What it does is make use of [EFI system partition](https://en.wikipedia.org/wiki/EFI_system_partition)(ESP).

UEFI Firmwares by specification should be capable of reading the `FAT12`, `FAT16` and `FAT32` variants of the FAT format maintained as part of the UEFI specification. An ESP is really just any partition formatted with one of the UEFI spec-defined variants of FAT and given a specific GPT partition type to help the firmware find it. When you write a bootloader for native UEFI, you write in this executable format defined by UEFI spec.

With a BIOS firmware, your firmware level ‘boot menu’ is necessarily, the disks connected to the system at boot time – no more, no less. This is not true with a UEFI firmware. For handling boooting multiple targets, UEFI has the _UEFI boot manager_(`efibootmgr` command can be used to manipulate the UEFI bootmanager), NVRAM is non-volatile RAM that is used in EFI to store variables that need to persist between boots.

- 64 bits for block addresses in `GTP`.

## Support

Supporting MBR or GPT is task of the Operating System. UEFI Firmwares can also implement BIOS compatibility mode, where UEFI would go look for MBR on a disk.

- BIOS+MBR ✔️
- EFI+GPT ✔️ (the one you're probably using rn)
- BIOS+GPT ✔️ (Linux&FreeBSD only)
- EFI+MBR ✔️ (BIOS compatibility mode)

Source: [This blogpost](https://www.happyassassin.net/2014/01/25/uefi-boot-how-does-that-actually-work-then/), Wikipedia and few more blogposts.
