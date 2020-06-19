---
id: elf
title: ELF
sidebar_label: ELF
---

```
man elf
```

http://www.muppetlabs.com/~breadbox/software/tiny/teensy.html
https://www.reddit.com/r/linux/comments/3ulwok/the_dissection_of_a_simple_hello_world_elf_file/

ELF (Executable and Linking Format) is the preferred format since it is flexible and extensible by design, and it is not bound to any particular processor or architecture

In computing, the Executable and Linkable Format (ELF, formerly named Extensible Linking Format), is a common standard file format for executable files, object code, shared libraries, and core dumps.

There is ELF32, and ELF64 etc. This is set in the elf header.

Not all sections in the ELF are necessary, there are some ELF section which are exec obj specific, some are debugging specific etc.

It differentiates between relocatable obj files and exec obj files type EXEC and REL

![](/img/elf_vm.png)

- ELF Header
- File Data, which may contain:
  - Program header table (a list of segment headers, require for executables)
  - Section header table (a list of section headers)
  - Data pointed to by the above two headers

Only the ELF header has a fixed position in the file. The flexibility of the ELF format requires no specified order for header tables, sections or segments. However, this figure is typical of the layout used in Solaris.

Sections represent the smallest indivisible units that can be processed within an ELF file. Segments are a collection of sections that represent the smallest individual units that can be mapped to a memory image by exec(2) or by the runtime linker.

- Sections hold the bulk of object file information for the linking view: instructions, data, symbol table, relocation information, and so on. Descriptions of sections appear in the first part of this chapter. The second part of this chapter discusses segments and the program execution view of the file.
- A program header table, if present, tells the system how to create a process image. Files used to generate a process image, executables and shared objects, must have a program header table; relocatable objects do not need such a table.
- A section header table contains information describing the file's sections. Every section has an entry in the table. Each entry gives information such as the section name, the section size, and so forth. Files used in link-editing must have a section header table; other object files might or might not have one.

I will not mention ELF sections on purpose. They are not relevant in executables and shared libraries. put the diagram here.

- The distinction between "executable" and "shared object" is largely artificial. What the file command is showing you is whether the ELF e_type header is ET_EXEC or ET_DYN. This is a rather technical distinction and has to do with how the loader treats them.

## Tools

- `nm`: We can see the symbols in a object file using `nm`
- `size`
- `file`
- `execstack`
- `readelf`
- `ldd`
- `hexdump`
- `objdump` : look at symbol table entries , readelf can also be used.
- objdump -r -d -t main.o
- readelf -s main.o
- elfedit
- readelf -l a.out | grep INTERP ==> to differentiate btwn pie and shared objs.
- size– print section sizes in bytes of object files
- https://www.gnu.org/software/binutils/

### Commands that do the same thing

- readelf from GNU binutils
- eu-readelf from elfutils
- The tools from elfutils were written to be smaller, faster, and more featureful than those in binutils.

* nm by default only dumps symbols in the .symtab section.
* nm is old thing, so it looks in the .symtab by default, objdump -t shows the symbol table aswell.
* Alternatively, you can use eu-readelf --symbols=.dynsym or objdump -Tw. (readelf -sDW does not include symbol versioning information.)

```
nm -g /usr/lib/libm.so | grep cos
nm -g /usr/lib/libm.a | grep cos
ar -t /usr/lib/libm.a | grep cos
```

```c
typedef struct {
	Elf32_Word	st_name;
	Elf32_Addr	st_value;
	Elf32_Word	st_size;
	unsigned char	st_info;
	unsigned char	st_other;
	Elf32_Half	st_shndx;
} Elf32_Sym;

typedef struct {
	Elf64_Word	st_name;
	unsigned char	st_info;
	unsigned char	st_other;
	Elf64_Half	st_shndx;
	Elf64_Addr	st_value;
	Elf64_Xword	st_size;
} Elf64_Sym;
```

> The `ELf64_Sym` struct has many fields, but few are:
>
> - `st_shndx`/`section` field which contains the index number from `section header table` where the symbol exists.
> - `st_name` which is a byte offset into the string table(`.strtab`) that points to the null-terminated string name of the symbol.
> - `st_value` which is symbol's address, or for relocatable modules the offset from the begining of the section pointed by `st_shndx`

- @progbits (marked LOAD in objdump)

## How the file command works

- A stripped ELF will lack a .symtab entry. The file command traverses through all the ELF section headers until a symbol table section is found. If one cannot be found, the binary is considered stripped.

- https://docs.oracle.com/cd/E19120-01/open.solaris/819-0690/chapter6-79797/index.html
- https://www.intezer.com/blog/research/executable-linkable-format-101-part1-sections-segments/

## Section and Segments

> We're talking about ELF Object files.

The fact that "segments contain information needed at runtime" and "sections contain information needed during linking" seems a moot point when one considers that sections are contained with segments.

We can create our own sections in [the assembly file](https://gist.github.com/geekodour/8b5eea3aa26c3ce6c9ef293a8a8ffe28)

- sections live in object files (.o extension) : sections for linking
- segments live in executable files (usually no extension)
- Executables can also contain sections, but that information is only useful for debugging: it can be stripped and it will still run just fine.
- When you link multiple objects together to make an executable, sections get put into segments.

### Section

A section is an area in an object file that contains information which is useful for linking such as the program's code and data, relocation information, and more.

sections exists only in relocatable obj files.

ELF binary files consist of an ELF header followed by a few segments.

### Segments

Each segment, in turn, includes one or more sections. The length of each segment and of each section is specified in the ELF header.

The following happens in the executable or when its loaded?

The operating system copies the segment (if it is loadable, i.e., if p_type is PT_LOAD) into memory according to the location and size information. rogram headers are only important in executable and shared object files. The program header table is an array of entries where each entry is a structure describing a segment in the object file or other information needed to create an executable process image.

A segment can contain 0 or more sections.

![](/img/elf_link_vs_exec_view.jpg)

linker maps sections to segments

segments which have absolute addresses cannot be defined in a relocatable file

- The .text section contains executable code and is packed into a segment which has the read and execute access rights.
- The .data and .bss sections contain initialized and uninitialized data respectively, and are packed into a segment which has the read and write access rights.

## allocable and a non-allocable ELF sections

- Also segments and sections in ELF, these are diff than allocatable and non-alloc for sure.
- ELF files contain some sections (e.g. code and data) needed at runtime by the process that uses them. These sections are marked as being allocable.

-
