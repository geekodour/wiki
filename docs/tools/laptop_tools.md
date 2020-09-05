---
id: laptop_tools
title: Laptop Tools
sidebar_label: Laptop Tools
---

## shell tricks

```shell
$ !$ # the last argument

```

## yadm

[yadm](https://yadm.io/docs/getting_started#) - [dotfiles](https://github.com/geekodour/dotfiles) manager.

```shell
$ yadm add <file_name>
$ yadm status
$ yadm commit
$ yadm push
```

## git

```shell
# some linux patch trick
$ git show --format=email HEAD | ./scripts/checkpatch.pl --strict --codespell
# delete remote branch
$ git push origin --delete a1
# open all files changed in a PR in vim
$ vim $(git diff master --name-only)
# Stash a singe file
$ git stash -- filename.ext
# Remove from added/staged
$ git reset filename.txt
# delete all untracked files
$ git clean -fdx
# show all untracked files
git ls-files --others --exclude-standard
```

## kitty

- Increase font size: <kbd>Ctrl</kbd>+<kbd>+</kbd>
- Decrease font size: <kbd>Ctrl</kbd>+<kbd>-</kbd>
- Input unicode: <kbd>Ctrl</kbd>+<kbd>U</kbd>

## tmux

- New session: <kbd>Ctrl</kbd>+<kbd>a</kbd> then `:new -s <session-name>`

## makefile

```makefile
# printing in a makefile
$(info ${VAR_NAME})
```

## weechat

- Switch channels: <kbd>Alt</kbd>+<kbd>1/2/3/../9</kbd>
- Set settings: `/fset`

## x window

```shell
# All keycodes
$ xmodmap -pke
# Keystrokes
$ xev
# Window class
$ xprop
# Disable trackpad
sudo xinput set-prop 12 "Device Enabled" 0 # after xinput
# projector
$ xrandr --output HDMI-1 --mode 1366x768
$ xrandr --output HDMI-1 --off
```

## Spelling

```shell
$ codespell .
$ hunspell filename.md
```

## USB

```shell
# formatting usb
$ dd if=/dev/zero of=/dev/sdX status=progress
$ fdisk /dev/sdb
$ mkfs.vfat /dev/sdb1
```

## rsync

```shell
$ rsync -avzhP -e "ssh -i path_to_key" /from/dir/ username@host:/to/dir/
```

## lshw

## lscpu

```shell
# shows individual cpu stats doe.
$ cat /proc/cpuinfo
# nice nice
$ lscpu
```

## lstopo

## docker

```shell
# Just get inside the container
$ docker run --rm -it --entrypoint="sh" <image>:master
```

## hexdump

```shell
# some pretty printing
$ hexdump -e '16/1 "%02x " "\n"' -v main.o
# show first n bytes
$ hexdump -e '16/1 "%02x " "\n"' -v -n 64 main.o
```

## systemd

```shell
# show systemd service file
systemctl cat dhcpcd.service
# systemd-analyze plot : units that take a long time to start
systemd-analyze plot > plot.svg
# get logs for a service, -b for current boot
sudo journalctl -u zookeeper.service -b
```

## gcc

The executable named `gcc` is just a compiler driver/compiler system that selects the "real" compiler and invokes the other components of `gcc` when needed. It does many things like [preprocessing(cpp)](https://linux.die.net/man/1/cpp), [compiling(`cc1`/`cc1plus`/`cc1obj`)](https://gcc.gnu.org/legacy-ml/gcc/2003-05/msg00484.html), [assembling(`as`)](https://linux.die.net/man/1/as) and [linking(`ld`)](https://linux.die.net/man/1/ld)

> Quick note about gcc frontends and backends
>
> - You can write your own frontend/backend for gcc
> - **frontend** is machine independent but language specific
> - **backend** is language independent but machine specific
> - [For example](https://superuser.com/questions/1198786/what-is-a-front-end-for-the-gcc-compiler), if you have a C++ front end and a Java front end, you can accept input in C++ and Java. If you have an x86 back end and a MIPS back end, you can produce executables for both x86 and MIPS CPUs.
> - The compilers such as `cc1`/`cc1plus` are both the frontend and the backends, they are linked into one executable.

```shell
# output
$ gcc main.c -o main
# optimization
# Defaults to -O0 if not specified.
# Sets to -O1 if flag is -O1 or simply -O
# Other optimizations include -O2, -O3, -Os, -Ofast
$ gcc -O main.c -o main
# Define macro in the fly for the preprocessor
$ gcc -D DEBUG main.c -o main
# Generate debug info for GDB, Levels: -g0(negates debug info),-g1,-g, -g3
# The ELF object file is added with the .debug and .line section if -g flag is used.
$ gcc -g main.c -o main
# Generate preprocessed file
$ cpp main.c main.i
# Compile but do not Link. Just generate the object file.
# All three will generate the same main.o file.
$ gcc -c main.c
$ gcc -c main.c -o main.o
$ gcc -c main.i -o main.o
# The --help flags takes in several classes (see man gcc)
$ gcc --help=warnings # Shows warning descriptions
$ gcc -Q --help=warnings # Shows whether the option is set
# All warnings (Actually not all! see --help=warnings)
$ gcc -Wall main.c -o main
# -Wextra prints additional warnings, -Wextra was previously -W
$ gcc -Wall -Wextra main.c -o main
# Passing options to the linker, Wl looks like a Warning flag but is not!
$ gcc -Wl,-Map main.c # passes -Map to the linker(ld).
# Specify directory for Include files/Header files
$ gcc -Iproj/src main.c -o main # eg. proj/src/myheader.h
```

> The gcc compiler driver takes flags that it can then pass to the corresponding components, eg. `-D` flag is passed to the preprocessor(`cpp`) which also has the `-D` flag, but there are few incompatibilities wrt flags aswell.

### Links

- [What Are Your GCC Flags ?](http://blog.httrack.com/blog/2014/03/09/what-are-your-gcc-flags/)
- [The -l and -L flags](https://www.rapidtables.com/code/linux/gcc/gcc-l.html)
- [GCC optimization](https://wiki.gentoo.org/wiki/GCC_optimization)

## objdump

```shell
$ objdump -d main #disassemble
$ objdump -t main #symbol table
```

## strace

```shell
# show syscalls related memory
$ strace -e trace=%memory ./main
# put strace output to file (straces outputs in stderr)
$ strace ./myprog 2> outfilename
# https://blog.packagecloud.io/eng/2015/11/15/strace-cheat-sheet/
```

## Random snippets

```shell
# grep and replace
$ grep -rl assets|xargs sed -i 's/assets/\/img\//g'
# git grep with file globs
$ git grep pattern_here -- '*.js'
$ grep -ri --include="*.js" pattern_here
```

## jq

```shell
# list duplicates
cat myson.json | jq '[.data[].url]| group_by(.) | map(select(length>1))'
```

## time

```shell
$ disable -r time
$ export TIME="\n%e real\n%U user\n%S sys"
# get the major and minor pagefaults with time for a program
$ time -v <exec>
```

## vim

```vim
:1?<term> t'search from bottom
```

## Future Tools

> Tools that I want to try out.

- [soveran/map](https://github.com/soveran/map)
- [ripgrep](https://github.com/BurntSushi/ripgrep)
- [oragono](https://github.com/oragono/oragono)
- [thoughts](https://lobste.rs/s/yabibk/thoughts_portable_posixy_pal_for_putting)
- [nethogs](https://linux.die.net/man/8/nethogs)
- [bc](#)
- ngrep
- vnstat
- https://en.wikipedia.org/wiki/Ethtool
- https://dougvitale.wordpress.com/2011/12/21/deprecated-linux-networking-commands-and-their-replacements/
- https://wiki.archlinux.org/index.php/Network_configuration#net-tools
- https://wiki.gentoo.org/wiki/Iproute2
- ar, nm, readelf, objdump
- systemd-nspawn
- dropwatch
- cgasm
- https://github.com/neutrinolabs/xrdp
- https://en.wikipedia.org/wiki/TightVNC
- https://rr-project.org/
- https://gchq.github.io/CyberChef/
- gtk-doc
- http://shadowsocks.org/en/index.html
- WirePlumber: https://www.collabora.com/news-and-blog/news-and-events/wireplumber-03-released-now-ready-for-the-desktop.html
- https://jsonnet.org/
- https://github.com/NerdyPepper/dijo
- https://sourceforge.net/projects/tceetree/
- https://news.ycombinator.com/item?id=24241485 (ventoy USB)
- Wireguard on Micriotik https://news.ycombinator.com/item?id=24240376
- https://sta.li/ : stali is a static linux distribution based on the original pre-2010 plans of the suckless.org project

### short tools blogposts

- https://blog.selectel.com/kernel-tracing-ftrace/
- https://blog.selectel.com/synchronizing-servers-ntp/
- https://blog.selectel.com/introduction-dpdk-architecture-principles/
- https://mtlynch.io/tinypilot/
- https://www.troyhunt.com/building-the-ultimate-home-office-again/
- https://blog.selectel.com/systemd-containers-introduction-systemd-nspawn/
- https://tyler.io/diy-video-hosting/
- https://linux.die.net/man/1/dstat
- https://valgrind.org/docs/manual/dh-manual.html
- https://valgrind.org/docs/manual/ms-manual.html
- https://github.com/BurntSushi/quickcheck
- https://news.ycombinator.com/item?id=24243521 (https://vtm.netxs.online/)