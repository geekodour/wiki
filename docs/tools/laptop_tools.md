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
# prepare list of commits for cherry picking
gl <commit_hash>..HEAD --reverse| awk '{print $1}' | paste -s -d ' '    
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
# map input dev into some output display (eg. stylus)
xinput map-to-output 420 HDMI-1
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

## Tools/Practices to adopt
### Blogposts to read before starting
- Do the IP addressing Video course
### Meta
- Understand gobject, gtk+, the diagram in this page: https://en.wikipedia.org/wiki/Accessibility_Toolkit
### Day to Day
- The pokemon background thing but with kitty because kitty now supports backgroud. make it in go/rust also allow plugins so that its not limited to pockemon but ppl can use anything any set of images etc. - https://twitter.com/archillect
- need a tool to list all show hn, github stars of some some person etc. a good way to discover new tools
- ipfs
### Programming
- I need some way to list all the possible tools i can use to look at a problem. might need to build this myself.
- [rr](https://rr-project.org/) : rr aspires to be your primary C/C++ debugging tool for Linux, replacing — well, enhancing — gdb. You record a failure once, then debug the recording, deterministically, as many times as you want. The same execution is replayed every time.
- Learn how to use debuggers and tracers effectively
- Learn journalctl properly
- Make a tool to query github stars of someone or some set of users using sql like sysntax, groupby more stars+recently updated etc. Have the ability to mark repositories and then open/export all of them in browser for proper introspection.
- see how we can use basic machine learning, learn a bit of basic machine learning
  - get familiar with openai tools.
- Regardless of whether password shadowing is in effect on a given system, the passwd file is readable by all users so that various system utilities (e.g., grep) can work (e.g., to ensure that user names existing on the system can be found inside the file), while only the root user can write to it. Without password shadowing, this means that an attacker with unprivileged access to the system can obtain the hashed form of every user's password. Those values can be used to mount a brute force attack offline, testing possible passwords against the hashed passwords relatively quickly without alerting system security arrangements designed to detect an abnormal number of failed login attempts. Especially when the hash is not salted it is also possible to look up these hashed passwords in rainbow tables, databases specially made for giving back a password for a unique hash.  :: https://en.wikipedia.org/wiki/Passwd can create a blogpost out of this
- need terminal shortcuts to snakecase, underscore, camelcase etc
- i want to be silent but at the same time i want to have a very clear voice, i want things to have intentions, i want to be able to express myself clearly if i am enjoying music i want to just express it, because expressing what i feel completes the feeling for me, i don't want my feelings to hurt anyone but i still want to express so that's one of the founding philosoply
- I am going for total minimalism, no extra monitors, just one laptop, a notebook and a pen and i should be able to do whatever the fuck i want to do.

### Network
- socat, netcat, ss, ip2unix and frens
    - [cc on socat](https://copyconstruct.medium.com/socat-29453e9fc8a6)
    - [What is the difference between netstat and netcat (nc)?](https://www.quora.com/What-is-the-difference-between-netstat-and-netcat-nc)
    - [What's the difference between socat and netcat?](https://serverfault.com/questions/246347/whats-the-difference-between-socat-and-netcat)
## voice
- https://github.com/jim-schwoebel/voice_datasets
- https://github.com/jim-schwoebel/voicebook
- https://github.com/jim-schwoebel/voiceome
- https://github.com/julius-speech/julius
- https://github.com/alphacep/vosk-api
- https://github.com/ideasman42/nerd-dictation
- https://github.com/babysor/MockingBird
