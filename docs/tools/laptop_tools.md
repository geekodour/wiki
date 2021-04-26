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
- https://github.com/narwhalacademy/zebra-crossing
- have a section in your blog where people can ask you about your laptop setup. If i know the answer i'll simply answer it, if don't then you get the answer + some amount of bitcoin!
- https://en.wikipedia.org/wiki/Literate_programming
- I need to be able to answer questions like, what to do if i get logged out my system how can i log back in quickly, how i nuke my laptop, if there is data corruption how do i detect, how can i check health of my laptop etc.
- I need to build a system like https://getpolarized.io/ where all my notes from papers, pocket articles highlights, kidle highlights, dates, org mode notes, book summaries etc automatically create Anki cards and I can review them whenever I want. I have bad memory so this will be super useful for me. https://github.com/burtonator/polar-bookshelf
- https://github.com/kernc/logkeys
#### System
- [Booting On Unix](https://venam.nixers.net/blog/unix/2017/06/04/booting-on-unix.html)
- https://unixsheikh.com/articles/the-real-motivation-behind-systemd.html
- https://venam.nixers.net/blog/unix/2020/05/02/time-on-unix.html
#### Display
- [Loading of xinitrc,xserverrc,xresources,xdefaults,xprofile,xsession,xmodmap](https://venam.nixers.net/blog/unix/2020/01/27/xconfig.html)
- [Adding Glue To a Desktop Environment](https://venam.nixers.net/blog/unix/2019/01/07/win-automation.html)
- [Xcb, X11, Xlib, Wayland?](https://venam.nixers.net/blog/unix/2016/10/25/x11-blah-blah.html)
- [Terminals](https://venam.nixers.net/blog/unix/2017/06/04/terminals.html)
- [Shells](https://venam.nixers.net/blog/unix/2017/06/04/unix-shells.html)
- [Zombies](https://venam.nixers.net/blog/unix/2017/06/04/zombies.html)
- [Fonts on Unix](https://venam.nixers.net/blog/unix/2017/06/04/fonts-on-unix.html)
- https://wayland-book.com/
- XDG stands for X Development Group, which was the old name of FreeDesktop.org
- https://venam.nixers.net/blog/programming/2021/01/26/future-of-distros.html
- XFT and XCB
- [The Linux graphics stack from X to Wayland](https://arstechnica.com/information-technology/2011/03/the-linux-graphics-stack-from-x-to-wayland/)
- https://en.wikipedia.org/wiki/GTK#History
- [Linux Graphics Essay](https://wiki.linuxfoundation.org/tab/linux-graphics-essay)
- https://www.reddit.com/r/linuxquestions/comments/8nzb51/eli5_the_linux_graphics_stack/
- https://blog.mecheye.net/2013/12/xplain/
- https://bootlin.com/doc/training/graphics/graphics-slides.pdf : lol
- [A brief introduction to the Linux graphics stack](https://blogs.igalia.com/itoral/2014/07/29/a-brief-introduction-to-the-linux-graphics-stack/)
- [Why do game developers prefer Windows?](https://softwareengineering.stackexchange.com/questions/60544/why-do-game-developers-prefer-windows)
- [WM & DE](https://venam.nixers.net/blog/unix/2017/06/04/wm-de.html)
#### Storage
- [Data Storage on Unix](https://venam.nixers.net/blog/unix/2017/11/05/unix-filesystem.html)
- [Key And Trust Store on Unix-like OS](https://venam.nixers.net/blog/unix/2020/01/27/keystore.html)
- [Command Line Trash](https://venam.nixers.net/blog/unix/2020/02/05/trash.html)
- [File hierarchy](https://venam.nixers.net/blog/unix/2017/06/04/filesystem.html)
- [Special Files](https://venam.nixers.net/blog/unix/2017/06/04/special-files.html)
- [Bits and words](https://venam.nixers.net/blog/unix/2017/06/04/bits-and-words.html)
#### Process
- [Processes On Unix](https://venam.nixers.net/blog/unix/2017/07/27/processes-on-unix.html)
- [Unix philosophy](https://venam.nixers.net/blog/unix/2017/06/04/unix-philosophy.html)
- https://venam.nixers.net/blog/unix/2018/03/03/tools-glus-scripts-automation.html
- [Environment Variables](https://venam.nixers.net/blog/unix/2017/06/04/environment-vars.html)
- [D-Bus and Polkit, No More Mysticism and Confusion](https://venam.nixers.net/blog/unix/2020/07/06/dbus-polkit.html)
- [Unix executables](https://venam.nixers.net/blog/unix/2017/06/04/executables.html)
- [Daemons on Unix](https://venam.nixers.net/blog/unix/2017/06/04/daemons.html)
- [Unix Signals](https://venam.nixers.net/blog/unix/2016/10/21/unix-signals.html)
### Meta
- [Mystery Knowledge and Useful Tools](https://nikhilism.com/post/2020/mystery-knowledge-useful-tools/)
- [Linux productivity tools](/pdf/lisa19_maheshwari.pdf)
- [Browsers](https://venam.nixers.net/blog/unix/2017/06/04/browsers-on-unix.html)
- [Licenses](https://venam.nixers.net/blog/unix/2017/06/04/licenses.html)
- [Linux Hardening Guide](https://madaidans-insecurities.github.io/guides/linux-hardening.html)
- https://github.com/imthenachoman/How-To-Secure-A-Linux-Server
- [Basic Git Setup](https://batsov.com/articles/2020/11/22/basic-git-setup/)
- https://jwiegley.github.io/git-from-the-bottom-up/1-Repository/1-directory-content-tracking.html
- Along with thoughts clone, i also need a rant site where simply want to vent. It will have a message that i can literally vent on anything this may protray myself as a bad person but i am doing all of this just to reflect on my thoughts not to hurt someone else, well sometimes i might be slightly evil too
- We can use this: https://github.com/knadh/tg-archive instead of making thoughts clone if I make a group in telegram where i simply shitpost then i can shitpost from phone aswell as the cli. Then this will automatically generate a website with correct timestamps.
- When installing doom the next time check what are the base files emacs has first of all and then check the changes that doom makes
- LEARN PACMAN FOR REAL PLEASE: eg. Understand what the flags and other related flags mean. please.
```shell
sudo pacman --needed --noconfirm -S ripgrep
```
- [Create Pacman Metapackage](https://disconnected.systems/blog/archlinux-meta-packages/#organising-our-meta-packages)
  - https://github.com/stoicaviator/arch_metapackage_guide
- https://tech.channable.com/posts/2021-04-09-nix-is-the-ultimate-devops-toolkit.html
- https://github.blog/2020-12-17-commits-are-snapshots-not-diffs/
- Get browser setup right, become a power firefox/brave user.
  - ctrl-shift-t (chrome) undoes the most recent tab
- new blog should also fetch latest tweets in it
- https://www.google.com/search?q=christine.website+nix
- https://blog.gwlab.page/vpn-over-ssh-the-socks-proxy-8a8d7bdc7028
- get better at remembering shortcuts
- be more attentive at life
- learn how to use marking in ranger, emacs and in vim
- https://uglyduck.ca/blog-anonymously/
- make telegram bots for things
- take photo, remind me to take a photo everyday.
- sway i3 replacement
  - https://www.youtube.com/watch?v=8E0SOWo-Gsg
  - https://wayland.app/protocols/
- https://wayland.emersion.fr/grim/
- https://github.com/JaCzekanski/Avocado
- https://github.com/any1/wayvnc
- https://github.com/Igglybuff/awesome-piracy
- https://github.com/skatiyar/pacman
- https://github.com/jarun/nnn
- Understand gobject, gtk+, the diagram in this page: https://en.wikipedia.org/wiki/Accessibility_Toolkit
- fish/oil shell
- https://github.com/Alexays/Waybar
- https://github.com/natpen/awesome-wayland
- twitter list automation, tweet deletion, other automation, backup etc.
- might check: https://lineageos.org/engineering/HowTo-SELinux/ (lineseos)
- orgmode: My files are 'logbook', 'life', 'project-1', 'project-2', etc. At any time I can hit a key and capture an idea/meeting to any of those places, and as I'm taking notes I can mark anything as a todo and schedule/deadline them. In the 'agenda' I can see a single overview of all my todo items, and my schedule, from all my notes.
- https://github.com/akshat46/FlyingFox
- https://beepb00p.xyz/promnesia.html
- Fraidycat is a desktop app or browser extension for Firefox or Chrome. I use it to follow people (hundreds) on whatever platform they choose - Twitter, a blog, YouTube, even on a public TiddlyWiki.
- https://omglord.com/maps (love the city map idea)
- trading bots
- https://arewewaylandyet.com/
### Day to Day
- [soveran/map](https://github.com/soveran/map) : nice xargs replacement in some cases
- [tabfs](https://omar.website/tabfs/) - https://github.com/jhlyeung/rumin-web-clipper (use tabfs to simulate what rumin web clibber does to take notes into org mode)
- [ripgrep tips](https://learnbyexample.github.io/substitution-with-ripgrep/)
    - [ripgrep is faster than {grep, ag, git grep, ucg, pt, sift}](https://blog.burntsushi.net/ripgrep/)
- sd : sed replacement
- [systemd-nspawn](https://blog.selectel.com/systemd-containers-introduction-systemd-nspawn/)
- https://obsproject.com/
- https://github.com/peco/peco
- https://github.com/jarun/buku See how buku can fit my flow
- https://github.com/Genymobile/scrcpy
- Some of the tools i make i want to make like this: `curl cht.sh` curl but comes up with nice things, also the ssh chat thing was interesting we can do that.
- https://github.com/fatedier/frp
- https://github.com/thesephist/histools
- https://github.com/iovisor/bcc
- https://github.com/jesseduffield/lazydocker
- https://github.com/msoap/shell2http : remote control laptop from phone
- https://github.com/jhspetersson/fselect
- https://github.com/linuxserver/Heimdall : I need a way to list all applications web, cli, mobile etc i am using at one place and have notes(multiple) about them. Have a way to debug them easily from there. For any problem at hand i should be able to see what are the tools i can use only after thinking what are the tools that i need. Hamidall still fills a different usecase.
- https://github.com/debauchee/barrier
- https://github.com/pavlobu/deskreen
- https://github.com/direnv/direnv (i can use this for adwyze/adyze)
- https://github.com/tmuxinator/tmuxinator (my personal projects can have this file, as well adwyze)
- https://github.com/client9/misspell (Also get done with spell checker and dict, setup emacs to do that)
- https://github.com/facebook/watchman
- https://github.com/kickscondor/fraidycat
- https://github.com/iorate/uBlacklist geek4geek hitlist
- https://github.com/o2sh/onefetch
- [dog](https://dns.lookup.dog/) the command-line DNS client
- [wcp](https://wheybags.com/blog/wcp.html): wcp is an experiment in re-implementing something like the standard cp file copy tool.
- https://github.com/ivandokov/phockup
- https://github.com/jmathai/elodie
- https://github.com/tfeldmann/organize
- https://github.com/so-fancy/diff-so-fancy
- https://unix4lyfe.org/darkhttpd/
- https://github.com/iamadamdev/bypass-paywalls-chrome
- [xyproto/fstabfmt](https://github.com/xyproto/fstabfmt): Format /etc/fstab 
- https://github.com/Swordfish90/cool-retro-term (sometimes for fun)
- Video Downloader: https://github.com/iawia002/annie
- [flameshot](https://github.com/flameshot-org/flameshot)
- [pet](https://github.com/knqyf263/pet) : CLI Snippet Manager
- https://github.com/federico-terzi/espanso : See how these compare to clipboard managers
- https://github.com/hluk/CopyQ
- https://github.com/yory8/clipman
- [transfer.sh](https://github.com/dutchcoders/transfer.sh)
- [croc](https://github.com/schollz/croc)
- [magic-wormhole](https://github.com/magic-wormhole/magic-wormhole): get things from one computer to another, safely 
- https://github.com/akavel/up : interactive pipes
- script to generate wallpaper and new tab content, like interesting quotes, puzzles, tweets, pictures from https://github.com/corkami/pics etc.
- https://github.com/Dr-Noob/cpufetch
- [wave-share](https://github.com/ggerganov/wave-share)
- https://github.com/birchb1024/frangipanni
- https://code.p1k3.com/gitea/brennen/bpb-kit/src/branch/main/home/.sh_common#L156-L179
    - https://lobste.rs/s/nsfdaw/improving_shell_workflows_with_fzf
- https://james.darpinian.com/satellites/
- A set of onelines from sed/awk/tr/col to do basic things like snakecase, downcase etc
- https://github.com/ahmetb/kubectx
- WormholeApp by ferros
- https://github.com/timothycrosley/concentration :: this is super nice, i can write my own replacement of leechblock this way
- https://github.com/sbstp/kubie
- https://archlinux.org/packages/community/any/lolcat/
- The pokemon background thing but with kitty because kitty now supports backgroud. make it in go/rust also allow plugins so that its not limited to pockemon but ppl can use anything any set of images etc. - https://twitter.com/archillect
- Have me automatically urge to read one aosa book article a day
- need a tool to list all show hn, github stars of some some person etc. a good way to discover new tools
- https://github.com/kamranahmedse/pennywise
- https://pushover.net/ and custom telegram bots to automate things
- https://people.kernel.org/monsieuricon/what-does-a-pgp-signature-on-a-git-commit-prove
- ngrok proper use
- https://github.com/starship/starship nice shell prompt
- mkcert
- https://github.com/lettier/gifcurry
- [tz](https://github.com/oz/tz)
- https://github.com/dandavison/delta
- [httpstat](https://github.com/reorx/httpstat): curl statistics made simple 
- [graphtage](https://github.com/trailofbits/graphtage): A semantic diff utility and library for tree-like files such as JSON, JSON5, XML, HTML, YAML, and CSV. 
- https://github.com/twpayne/chezmoi : dotfile management
- [Czkawka](https://github.com/qarmin/czkawka): Czkawka is a simple, fast and easy to use app to remove unnecessary files from your computer.
- https://github.com/sqshq/sampler there are other similar tool, see what works
- https://github.com/git-tips/tips#everyday-git-in-twenty-commands-or-so
- tor
- [dstat](https://linux.die.net/man/1/dstat): Dstat is a versatile replacement for vmstat, iostat and ifstat. Dstat overcomes some of the limitations and adds some extra features. 
- https://github.com/GoogleChromeLabs/squoosh/tree/dev/cli
- https://github.com/pomber/git-history
- https://github.com/MontFerret/ferret
- [peek](https://github.com/phw/peek) GIF maker
- https://github.com/bcicen/ctop
- https://github.com/wtfutil/wtf : prolly not going to use it but can take inspiration. + https://github.com/charmbracelet/bubbletea + https://github.com/slok/grafterm
- https://github.com/madler/pigz
- https://github.com/imsnif/bandwhich
- ipfs
- https://github.com/ogham/exa https://github.com/Peltoche/lsd
- jq https://sr.ht/~gpanders/ijq/
- https://sr.ht/~halzy/waitforit/
### Programming
- https://github.com/nico2sh/semtag (use this in my projects)
- I need some way to list all the possible tools i can use to look at a problem. might need to build this myself.
- [rr](https://rr-project.org/) : rr aspires to be your primary C/C++ debugging tool for Linux, replacing — well, enhancing — gdb. You record a failure once, then debug the recording, deterministically, as many times as you want. The same execution is replayed every time.
- Learn https://graphviz.org/ Why: https://twitter.com/thingskatedid/status/1386077306381242371
- https://www.flycheck.org/en/latest/index.html see supported languages and enable on ones that's needed
- https://github.com/traefik/yaegi Go interpreter
- Learn how to use debuggers and tracers effectively
- https://github.com/mvdan/sh
- https://github.com/contribsys/faktory for all the background automation in the laptop
- https://lnav.org/ : For looking at logfiles of my local services
- Learn journalctl properly
- https://github.com/ventoy/Ventoy
- Make a tool to query github stars of someone or some set of users using sql like sysntax, groupby more stars+recently updated etc. Have the ability to mark repositories and then open/export all of them in browser for proper introspection.
- https://github.com/mholt/archiver (Archiving, no mess of these differnt things)
- https://github.com/tylertreat/comcast
- https://github.com/yudai/gotty
- [Korny's Polyglot Code Tools](https://polyglot.korny.info/)
- [Postgres Obs](https://pgstats.dev/)
- https://github.com/pnpm/pnpm
- [rhit](https://github.com/Canop/rhit): A nginx log explorer 
- [grex](https://github.com/pemistahl/grex): A command-line tool and library for generating regular expressions from user-provided test cases 
- https://insomnia.rest/ and curl
- https://github.com/wagoodman/dive
- https://hashcat.net/hashcat/
- https://github.com/esimov/caire
- https://github.com/koalaman/shellcheck
- https://www.explainshell.com/
- [lfs](https://github.com/Canop/lfs): A thing to get information on your mounted disks.
- https://github.com/pyenv/pyenv
- [z3](https://github.com/presslabs/z3) : Backup your ZFS snapshots to S3. Decide on which filesystem to use.
### Random
- [trashhalo/imgcat](https://github.com/trashhalo/imgcat): a tool to output images as RGB ANSI graphics on the terminal 
- https://github.com/muesli/smartcrop
- https://github.com/deepfakes/faceswap
- https://tosdr.org/
- https://github.com/CorentinJ/Real-Time-Voice-Cloning
- webtorrent
- https://github.com/rbenv/rbenv
- https://github.com/deezer/spleeter
- https://github.com/lengstrom/fast-style-transfer
- https://github.com/lucidrains/deep-daze
- https://github.com/nuno-faria/tiler
- https://github.com/tzutalin/labelImg
- https://github.com/emilwallner/Screenshot-to-code
- [cbonsai](https://gitlab.com/jallbrit/cbonsai): grow bonsai trees in your terminal
- [Literally listen to your network](https://github.com/vvilhonen/nethoscope)
### Information org
- [flimzy/anki](https://github.com/flimzy/anki) Go library to read Anki *.apkg files 
- https://github.com/adri/memex
### Binary data
- ar, nm, readelf, objdump
- cgasm, [rappel](https://github.com/yrp604/rappel)
- [GNU Poke](https://www.youtube.com/watch?v=Nwb_8VJ5ZeQ)
- [ImHex](https://github.com/WerWolv/ImHex)
### Network
- [nethogs](https://linux.die.net/man/8/nethogs): Net top tool grouping bandwidth per process 
- [ngrep](https://en.wikipedia.org/wiki/Ngrep) (network grep) is a network packet analyzer 
- [vnstat](https://humdi.net/vnstat/)
- [Deprecated Linux networking commands and their replacements](https://dougvitale.wordpress.com/2011/12/21/deprecated-linux-networking-commands-and-their-replacements/)
- https://github.com/apenwarr/netselect
- https://github.com/benjojo/sping
- https://github.com/ntop/ntopng
- [iproute2](https://wiki.gentoo.org/wiki/Iproute2)
- socat, netcat, ss, ip2unix and frens
    - [cc on socat](https://copyconstruct.medium.com/socat-29453e9fc8a6)
    - [What is the difference between netstat and netcat (nc)?](https://www.quora.com/What-is-the-difference-between-netstat-and-netcat-nc)
    - [What's the difference between socat and netcat?](https://serverfault.com/questions/246347/whats-the-difference-between-socat-and-netcat)
### Security
- [sbctl](https://github.com/Foxboron/sbctl): Secure Boot key manager 
- [KasperskyLab/TinyCheck](https://github.com/KasperskyLab/TinyCheck): TinyCheck allows you to easily capture network communications from a smartphone or any device which can be associated to a Wi-Fi access point in order to quickly analyze them.
- [Photon](https://github.com/s0md3v/Photon): Incredibly fast crawler designed for OSINT.
- [feroxbuster](https://github.com/epi052/feroxbuster): A fast, simple, recursive content discovery tool written in Rust. 
- https://github.com/martijnvanbrummelen/nwipe
- [rust nmap alternative](https://github.com/RustScan/RustScan)
- [Ciphey](https://github.com/Ciphey/Ciphey): Automatically decrypt encryptions without knowing the key or cipher, decode encodings, and crack hashes
- [age](https://github.com/FiloSottile/age)
### Streaming
- [Lightspeed](https://github.com/GRVYDEV/Project-Lightspeed)
- https://github.com/gen2brain/cam2ip (I can use this to keep an eye on who is checking on my laptop)
- [OwnCast](https://github.com/owncast/owncast): Take control over your content and stream it yourself. 
### Crypto
- https://github.com/nayafia/lemonade-stand
- Metamask
- https://www.wslyvh.com/ethereum-guide/
- have a crypto setup to do this: https://twitter.com/radicle/status/1364980998530879498 (lbp.radicle.network )
- https://github.com/AleoHQ/wagyu
### Online tools
Make some app where i can keep track of online tools that i use.
- [cool backgrounds](https://coolbackgrounds.io/)
- https://jpeg.rocks/
- https://squoosh.app/
- https://toonify.photos/
- https://artvee.com/
- https://excalidraw.com/ very good drawing playground for tech
- https://humanclock.com/ : Make a tool to make scale analogy
    - When we say 10mn, what does that mean you can buy 1 honda city
    - When you say 30mts that's the length of some popular statue
    - When you say 400kg, that's the weight of a maruti suzuki etc etc.
    - Inputs can be multiple SI units  and the analoges can be infinite ;)
- https://tosdr.org/
- https://github.com/iv-org/invidious
- https://lofi.cafe/ firefox-ssb
- https://github.com/zedeus/nitter
- https://removebackground.app/
- https://github.com/soypat/gitaligned
- https://github.com/eloquence/freeyourstuff.cc
### Projects that i just want to keep an eye on
- https://github.com/tmrts/boilr