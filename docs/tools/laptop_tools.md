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
- https://github.com/Delapouite/dot-in-the-sky
- https://github.com/nanotee/nvim-lua-guide
- There's some politics here
  - https://github.com/containers
  - https://github.com/opencontainers
  - understand containers, the current landscape and also the politics
- https://github.com/opsdisk/the_cyber_plumbers_handbook
- https://github.com/mhinz/vim-galore
- https://www.youtube.com/watch?v=rCMh7srOqvw&list=PLhXZp00uXBk4np17N39WvB80zgxlZfVwj
- https://github.com/narwhalacademy/zebra-crossing
- have a section in your blog where people can ask you about your laptop setup. If i know the answer i'll simply answer it, if don't then you get the answer + some amount of bitcoin!
- https://en.wikipedia.org/wiki/Literate_programming
- I need to be able to answer questions like, what to do if i get logged out my system how can i log back in quickly, how i nuke my laptop, if there is data corruption how do i detect, how can i check health of my laptop etc.
- https://utcc.utoronto.ca/~cks/space/blog/unix/FindWithoutXargsToday
- I need to build a system like https://getpolarized.io/ where all my notes from papers, pocket articles highlights, kidle highlights, dates, org mode notes, book summaries etc automatically create Anki cards and I can review them whenever I want. I have bad memory so this will be super useful for me. https://github.com/burtonator/polar-bookshelf
- https://github.com/kernc/logkeys
#### System
- https://unixsheikh.com/articles/the-real-motivation-behind-systemd.html
- https://venam.nixers.net/blog/unix/2020/05/02/time-on-unix.html
#### Display
- [Adding Glue To a Desktop Environment](https://venam.nixers.net/blog/unix/2019/01/07/win-automation.html)
- [Terminals](https://venam.nixers.net/blog/unix/2017/06/04/terminals.html)
- [Shells](https://venam.nixers.net/blog/unix/2017/06/04/unix-shells.html)
- [Zombies](https://venam.nixers.net/blog/unix/2017/06/04/zombies.html)
- https://github.com/returntocorp/semgrep
- https://wayland-book.com/
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
- https://lobste.rs/s/w5ssrg/ssh_agent_forwarding_considered_harmful
- get better at remembering shortcuts
- be more attentive at life
- learn how to use marking in ranger, emacs and in vim
- https://uglyduck.ca/blog-anonymously/
- make telegram bots for things
- take photo, remind me to take a photo everyday.
- sway i3 replacement
  - https://www.youtube.com/watch?v=8E0SOWo-Gsg
  - https://wayland.app/protocols/
  - https://github.com/nwg-piotr/nwg-panel
- https://wayland.emersion.fr/grim/
- https://github.com/JaCzekanski/Avocado
- https://github.com/Nukesor/pueue seems like will be useful when downloading shit
- https://christine.website/talks/systemd-the-good-parts-2021-05-16
- https://github.com/jhchen/ansize nice this is simlar to imcat?
- https://huffduffer.com/
- https://github.com/muesli/duf df alternative
- https://github.com/Sangarshanan/jazzit crypto scripts
- https://github.com/runrin/tt
- ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIEU5PQB14dvrOXCnUud2f8czFeSd1wy94CVrU261OXy0 public key
- need to have a donations page, donations to orgs and open source projects
- https://github.com/any1/wayvnc
- https://github.com/LuRsT/hr : have man page for all your tools
- https://github.com/mozilla/ssh_scan
- Need a til page aswell, maybe this can go into the main thoughs app and then can use tags from there. this is somewhat tricky, need to decide what constitutes a tag etc. Maybe following the telegram parser would do good only. 
- https://github.com/Igglybuff/awesome-piracy
- https://github.com/skatiyar/pacman
- https://github.com/jarun/nnn
- Understand gobject, gtk+, the diagram in this page: https://en.wikipedia.org/wiki/Accessibility_Toolkit
- fish/oil shell
- https://github.com/justinmayer/virtualfish
- https://github.com/jorgebucaran/awsm.fish
- https://github.com/pirate/fish-utils#fish-utility-functions
- https://github.com/Alexays/Waybar
- https://github.com/danielmiessler/SecLists
- https://github.com/nelhage/reptyr (this will be useful inside tmux sessions too)
- https://github.com/casey/just
  - https://github.com/go-task/task
- https://github.com/libfuse/sshfs
- https://github.com/lfit/itpol IT  policies
- https://github.com/nayafia/microgrants
  -  https://github.com/mezod/awesome-indie
- https://github.com/cooperhammond/irs need to merge this with the assmese music metadata servicGe
- https://github.com/mylxsw/redis-tui will be useful when learning redis
- https://github.com/schollz/find3
- https://github.com/ruslashev/elfcat
- https://github.com/jedisct1/piknik
- Need some extension or something to show if i've visited this website before
  - also i need to know where did i note that link. in the wiki, in notion, in some codebase of some repo etc.
- https://github.com/lptstr/chmap
- https://github.com/cbbrowne/autodoc
- https://github.com/fogleman/nes
- https://github.com/shazow/ssh-chat
  - https://github.com/lunatic-solutions/chat
- https://github.com/FiloSottile/whoami.filippo.io
- https://shadowsocks.org/en/index.html
- https://github.com/jtesta/ssh-audit
- https://github.com/natpen/awesome-wayland
- twitter list automation, tweet deletion, other automation, backup etc.
- might check: https://lineageos.org/engineering/HowTo-SELinux/ (lineseos)
- orgmode: My files are 'logbook', 'life', 'project-1', 'project-2', etc. At any time I can hit a key and capture an idea/meeting to any of those places, and as I'm taking notes I can mark anything as a todo and schedule/deadline them. In the 'agenda' I can see a single overview of all my todo items, and my schedule, from all my notes.
- https://github.com/akshat46/FlyingFox
- https://beepb00p.xyz/promnesia.html
- Fraidycat is a desktop app or browser extension for Firefox or Chrome. I use it to follow people (hundreds) on whatever platform they choose - Twitter, a blog, YouTube, even on a public TiddlyWiki.
- https://omglord.com/maps (love the city map idea)
- https://github.com/xraymemory/bookstory-en
- trading bots
- https://arewewaylandyet.com/
### Day to Day
- [soveran/map](https://github.com/soveran/map) : nice xargs replacement in some cases
- https://github.com/leahneukirchen/xe
- https://github.com/nushell/nushell its a replacement for fish but i am gon use
  fish so will need to see when i want to use it.
- https://github.com/alt-romes/programmer-calculator
- https://github.com/orhun/kmon
- https://github.com/ujjwal96/xwinwrap
- https://github.com/mpv-player/mpv
- https://github.com/mdp/qrterminal
- https://github.com/chriskempson/base16
- https://github.com/bbatsov/crux
- https://github.com/integral-dw/org-superstar-mode
- https://github.com/AmaiKinono/puni
- https://github.com/minad/corfu
- https://github.com/tmux-plugins/tmux-sensible
- https://github.com/rust-lang/discord-mods-bot
- https://github.com/manateelazycat/snails
- https://github.com/nobiot/org-remark
- https://github.com/joostkremers/writeroom-mode
- https://github.com/cantino/mcfly
- https://github.com/quenhus/uBlock-Origin-dev-filter
- https://github.com/mattreduce/oblique-fortunes
- https://github.com/bcye/Hello-Goodbye
- https://github.com/ClementTsang/bottom
- https://github.com/twitter/rezolus
- https://github.com/seanbreckenridge/browserexport
- https://github.com/bugaevc/wl-clipboard
- https://github.com/Hummer12007/brightnessctl
- https://github.com/ErikReider/SwayNotificationCenter
- https://github.com/phiresky/ripgrep-all
  - https://github.com/tmbinc/bgrep
- https://github.com/betterlockscreen/betterlockscreen
- https://github.com/nwg-piotr/nwg-launchers
- https://github.com/tvrzna/emptty
- https://github.com/VSCodium/vscodium
- https://github.com/soywod/himalaya
- https://github.com/robpike/ivy
- https://github.com/direnv/direnv
- https://github.com/atanunq/viu
- https://github.com/vilhalmer/oguri
- https://github.com/altdesktop/playerctl
- https://github.com/Syncplay/syncplay
- https://github.com/MaxKellermann/ferm
- https://github.com/joelshepherd/tabliss
- https://github.com/shutter-project/shutter
- https://github.com/holman/spark
- https://github.com/ziberna/i3-py
- https://github.com/ahrm/sioyek
- https://github.com/lfos/calcurse
- https://github.com/jenv/jenv
- https://github.com/inducer/pudb
- https://github.com/bup/bup
- https://github.com/soimort/you-get
- https://github.com/graysky2/lostfiles
- https://github.com/firecat53/networkmanager-dmenu
- https://github.com/facebook/PathPicker
- https://github.com/cenkalti/rain
- https://github.com/sassman/t-rec-rs
- https://gitlab.com/screenkey/screenkey
- https://github.com/pavlobu/deskreen
- https://github.com/streamlink/streamlink
- https://github.com/harmonoid/harmonoid
- https://github.com/anordal/shellharden
- https://github.com/dalance/procs
- https://github.com/Schniz/fnm
- https://github.com/themattrix/bash-concurrent
- https://github.com/TaKO8Ki/frum
- https://github.com/koraa/huniq
- https://github.com/dbrgn/tealdeer
- https://github.com/kiennq/emacs-mini-modeline
- https://github.com/aaronpenne/generative_art
- https://github.com/nvim-telescope/telescope.nvim
- https://github.com/tpope/vim-abolish
- https://github.com/wfxr/minimap.vim
- https://github.com/folke/which-key.nvim
- https://github.com/SirVer/ultisnips
- https://github.com/b4b4r07/gomi
- https://github.com/tusharsadhwani/zxpy
- https://github.com/hrkfdn/ncspot
- https://github.com/skywind3000/asyncrun.vim
- https://github.com/shinpei0208/gdev
- https://github.com/lambdalisue/guise.vim
- https://github.com/lawl/NoiseTorch
- https://github.com/eramdam/BetterTweetDeck
- https://github.com/jhspetersson/fselect
- https://github.com/rebelot/kanagawa.nvim
- https://github.com/numToStr/Comment.nvim
- https://github.com/MitMaro/git-interactive-rebase-tool
- https://github.com/andymass/vim-matchup
- https://github.com/chmln/handlr
- https://no-color.org/ : good list of tools
- https://github.com/afroisalreadyinu/miniboss
- https://github.com/brocode/fw
- https://github.com/skywind3000/z.lua
- https://github.com/ajeetdsouza/zoxide
- https://github.com/sharkdp/insect
- https://github.com/fupdec/mediaChips
- https://github.com/rustdesk/rustdesk
- https://github.com/pystardust/ytfzf
- some way to read bret vctor daily
- https://github.com/mikf/gallery-dl
- [tabfs](https://omar.website/tabfs/) - https://github.com/jhlyeung/rumin-web-clipper (use tabfs to simulate what rumin web clibber does to take notes into org mode)
- [ripgrep tips](https://learnbyexample.github.io/substitution-with-ripgrep/)
    - [ripgrep is faster than {grep, ag, git grep, ucg, pt, sift}](https://blog.burntsushi.net/ripgrep/)
- sd : sed replacement
- [systemd-nspawn](https://blog.selectel.com/systemd-containers-introduction-systemd-nspawn/)
- https://obsproject.com/
- https://github.com/peco/peco
- https://github.com/clibs/clib
- Have a public blog and a private blog, write extreme takes on the private blog. Have a secret key to it, write where to find it in the public and keep that unplished. add a watchdog timer to publish the steps to get the key. i.e Once I die it'll automatically publish that.
- build corpora of assamese data
- https://github.com/jarun/buku See how buku can fit my flow
- https://github.com/jpochyla/psst
- https://github.com/Morganamilo/paru
- https://github.com/karlicoss/cloudmacs
- https://github.com/progrium/topframe
- https://github.com/folke/tokyonight.nvim
  - https://github.com/samrath2007/kyoto.nvim
- https://github.com/Genymobile/scrcpy
- Some of the tools i make i want to make like this: `curl cht.sh` curl but comes up with nice things, also the ssh chat thing was interesting we can do that.
- https://github.com/fatedier/frp
- https://github.com/SimonBrazell/privacy-redirect
- https://github.com/thesephist/histools
- https://github.com/iovisor/bcc
- ArchiveTeam Warriors.
- https://github.com/jesseduffield/lazydocker
- https://github.com/msoap/shell2http : remote control laptop from phone
- https://github.com/jhspetersson/fselect
- https://github.com/linuxserver/Heimdall : I need a way to list all applications web, cli, mobile etc i am using at one place and have notes(multiple) about them. Have a way to debug them easily from there. For any problem at hand i should be able to see what are the tools i can use only after thinking what are the tools that i need. Hamidall still fills a different usecase.
  - https://github.com/jeroenpardon/sui this is for listing all my self hosted public applications. for local ones i can keep using hamidall
- https://github.com/debauchee/barrier
- https://github.com/pavlobu/deskreen
- https://github.com/direnv/direnv (i can use this for adwyze/adyze)
- https://github.com/tmuxinator/tmuxinator (my personal projects can have this file, as well adwyze)
- https://github.com/client9/misspell (Also get done with spell checker and dict, setup emacs to do that)
- https://github.com/checkly/headless-recorder
- https://github.com/facebook/watchman
  - https://github.com/cespare/reflex
  - https://github.com/watchexec/watchexec
- https://github.com/sweis/crypto-might-not-suck
- mosh
- https://github.com/callum-oakley/gotta-go-fast
- https://github.com/kickscondor/fraidycat
- https://github.com/ehazlett/stellar
- https://github.com/dbohdan/structured-text-tools nice
- https://github.com/sherlock-project/sherlock
- https://github.com/joewalnes/websocketd
- need something to keep track of my finances, investments and donations
- https://github.com/defunkt/gist should be a emacs version
- https://github.com/iipc/awesome-web-archiving
- https://github.com/iorate/uBlacklist geek4geek hitlist
- https://github.com/o2sh/onefetch
- [dog](https://dns.lookup.dog/) the command-line DNS client
- [wcp](https://wheybags.com/blog/wcp.html): wcp is an experiment in re-implementing something like the standard cp file copy tool.
- https://github.com/ivandokov/phockup
- https://github.com/jmathai/elodie
- https://github.com/tfeldmann/organize
- https://github.com/tycrek/degoogle
- https://github.com/antifuchs/gmail-britta there's another similar thing
  - https://github.com/mbrt/gmailctl
- https://github.com/evanw/esbuild for webapps, try elm and slevetle or whatever that is
- https://github.com/jacobian/notamazon maintain similar list for indian sites
  - actually the gift site is not a bad idea ppl post on twitter
- https://github.com/cloudhead/rx new hobbby pixxel art
  - https://github.com/asciimoo/drawille also making these animations
-  https://github.com/2mol/pboy pdf manager
- https://github.com/Y2Z/monolith
- https://github.com/veltman/clmystery game
- https://github.com/Katee/quietnet
- https://github.com/rgburke/grv nice tool to have an overview of what's going on
- https://github.com/so-fancy/diff-so-fancy
- https://github.com/weihanglo/sfz
- read books faster https://github.com/nemanjan00/uniread
- https://github.com/kdabir/has very nice tool to check versions for deps
- https://github.com/ashlinchak/mdanki
- https://github.com/Canop/broot : this is nice than nn for viewing things quickly
- https://github.com/jifunks/botany
- https://datasette.io/ super useful for me
- https://github.com/Biont/sway-launcher-desktop this will help with man69 aswell i guess
- https://github.com/emersion/kanshi
- https://github.com/maximbaz/dotfiles
- https://github.com/eoli3n/dotfiles
- https://github.com/Kharacternyk/pacwall
- https://github.com/xyproto/wallutils
- https://github.com/bettercap/bettercap
- https://commons.wikimedia.org/wiki/File:The_Linux_Graphics_Stack_and_glamor.svg
- https://github.com/swaywm/swayidle
- https://hakibenita.com/sql-for-data-analysis
  - https://muhammadraza.me/2021/Oneliners/
- https://unix4lyfe.org/darkhttpd/
- https://github.com/iamadamdev/bypass-paywalls-chrome
- [xyproto/fstabfmt](https://github.com/xyproto/fstabfmt): Format /etc/fstab 
- https://github.com/Swordfish90/cool-retro-term (sometimes for fun)
- Video Downloader: https://github.com/iawia002/annie
- https://github.com/open-pomodoro/openpomodoro-cli
- https://github.com/antoniomika/sish
- https://github.com/smxi/inxi
- https://github.com/qarmin/szyszka
- https://github.com/Unrud/remote-touchpad
- https://github.com/ES-Community/nsecure
- https://people.kernel.org/kuba/common-interface-for-nic-statistics
- [flameshot](https://github.com/flameshot-org/flameshot)
- [pet](https://github.com/knqyf263/pet) : CLI Snippet Manager
  - https://github.com/gleicon/pipecamp : super unstructured
  - with man69 i also need this: https://til.simonwillison.net/ not to manage but a link to it.
- https://github.com/teenyicons/teenyicons (sway)
- https://github.com/facebookincubator/oomd
  - Have a buffer disk and buffer memory where things stop: use `tune2fs`
- https://github.com/ksnip/ksnip
- https://github.com/Granulate/gprofiler
- I want sort of a image board service
  - to post memes, screenshots of various things, i should be able to tag things, write a short desc etc.
  - maybe make it offline first, run ocr on it locally and maintain an index to be searched later.
  - don't need a phone app, wpa will do
  - basically i need pinterest here, but the existing open source solutions suck balls
  - also want to run some anti duplicating software
  - maybe telegram bot will be a good idea, we have access to telegram from anywhere i can simply paste the link and server will process the link and then do whatever the fuck it wants with it.
  - I think the best bet will be to create an anonymous twitter account and use hashtags
  - but then again i also want the feature where i simply throw it reddit/instagram/twitter urls and it downloads the video on its own etc
  - https://github.com/funmaker/hybooru
    - i want to write my thoughts on the image there anonmously
    - https://hydrusnetwork.github.io/hydrus/
  - https://github.com/kennell/imageboards
  - If your initial instinct is to delete...listen to it! Any contribution they have made to your art has already been made, your brain has logged it, so have some faith in your own ability and let them go.
- https://github.com/federico-terzi/espanso : See how these compare to clipboard managers
- https://github.com/LibrePhotos/librephotos 8gb ram
- https://k3tan.com/starting-a-new-digital-identity
  - https://calyxos.org/get/
- https://simonwillison.net/2021/May/2/one-year-of-tils/
- The indieweb is what got me back in to blogging and RSS again. Being able to be social on the net without FB/Twitter has made being on the 'net fun again. Adding your feed to micro.blog even gives you a full-social modern social-experience, except it's completely powered by blogs and RSS. - HN comment,
  - https://news.ycombinator.com/item?id=26950009
  - I want to express things socially without being on social media
  - another thing is i want to do hard things daily so that hard things become simple to me
  - I want to interact with complex tools so that i become familiar with them and can use things more effectively
    - build them into my workflow so that they don't sit there and wait to be used and i forget, make use of them somehow
    - https://blog.nindalf.com/posts/how-to-learn-unix-tools/
- https://github.com/hluk/CopyQ
- https://github.com/yory8/clipman
- https://web.archive.org/web/19970711071555/http://www.cooltool.com/apr96.html have a newslettter like cronweekly and this combined
- [transfer.sh](https://github.com/dutchcoders/transfer.sh)
- [croc](https://github.com/schollz/croc)
  - https://github.com/Antonito/gfile
- https://github.com/ZinoKader/portal
- [magic-wormhole](https://github.com/magic-wormhole/magic-wormhole): get things from one computer to another, safely 
  - https://lobste.rs/s/fhpswy/global_socket_connect_like_there_is_no read discussion
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
- https://github.com/anatol/booster (maybe just to test)
- WormholeApp by ferros
- https://github.com/timothycrosley/concentration :: this is super nice, i can write my own replacement of leechblock this way
- https://github.com/sbstp/kubie
- https://archlinux.org/packages/community/any/lolcat/
- The pokemon background thing but with kitty because kitty now supports backgroud. make it in go/rust also allow plugins so that its not limited to pockemon but ppl can use anything any set of images etc. - https://twitter.com/archillect
- Have me automatically urge to read one aosa book article a day
- Update github readme
- Need a website for personal food recipies too, photography also
  - https://github.com/balevine/cocktails
  - org mode export or something should do
- need a tool to list all show hn, github stars of some some person etc. a good way to discover new tools
- https://github.com/kamranahmedse/pennywise
- https://pushover.net/ and custom telegram bots to automate things
- https://github.com/angt/glorytun
- https://github.com/jedisct1/dsvpn
- https://people.kernel.org/monsieuricon/what-does-a-pgp-signature-on-a-git-commit-prove
- ngrok proper use
- https://github.com/starship/starship nice shell prompt
- https://github.com/sdushantha/tmpmail
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
- Learn discord
- https://github.com/MontFerret/ferret
- https://github.com/EnergizedProtection/block
- A beatiful lyrics app(with transparency) so that i can read the lyrics when listening to some song
- https://github.com/client9/shlib
- https://github.com/sahib/brig
- https://github.com/schollz/hostyoself probably need to maek a fork
- https://github.com/tj/histo
- https://github.com/ngosang/trackerslist
- The blog/webpage needs to be able to host single page long form articles like suppose i write something on bitmap fonts maybe use examples from orbit.  https://github.com/andymatuschak/orbit there was another site that had 3d thingy in it forgot the name. all that shit i need
- https://github.com/guardianproject/haven this is simply amazing i need it
- https://github.com/pdfarranger/pdfarranger
- https://github.com/docker-slim/docker-slim
- https://github.com/notwaldorf/tiny-care-terminal I need the tweet thing from here, might have to write my own. Also need some way to export my digital wellbeing from phone. then later can graph is somewhere.
- https://github.com/simeji/jid / jiq
- [peek](https://github.com/phw/peek) GIF maker
- https://github.com/bcicen/ctop
- https://github.com/wtfutil/wtf : can link this with quanitfy and grafana stuff
- https://github.com/yshui/deai
- https://github.com/sstadick/hck
- https://github.com/emersion/mako
- https://github.com/r-darwish/topgrade
- https://github.com/wtfutil/wtf : prolly not going to use it but can take inspiration. + https://github.com/charmbracelet/bubbletea + https://github.com/slok/grafterm
- https://github.com/dln/wofi-emoji
- https://github.com/madler/pigz
- https://github.com/gephi/gephi
- https://github.com/imsnif/bandwhich
- ipfs
- https://github.com/bbugyi200/funky
- https://github.com/antonmedv/fx compare to ijq etc. for speed and everything.
- https://github.com/ogham/exa https://github.com/Peltoche/lsd
- jq https://sr.ht/~gpanders/ijq/
- https://sr.ht/~halzy/waitforit/
### Utility
- https://github.com/esimov/caire
  - https://github.com/muesli/smartcrop
- https://github.com/jhnc/findimagedupes
- https://github.com/bokuweb/lcs-image-diff-rs
- https://github.com/emersion/meltsub
- https://github.com/dessant/buster
- https://github.com/abhimanyu003/sttr
- https://github.com/bytedance/music_source_separation
- https://github.com/rs/curlie
- https://github.com/charmbracelet/wishlist
- https://github.com/koenrh/delete-tweets
- https://github.com/google/butteraugli
- https://github.com/axa-group/Parsr
- https://github.com/nukeop/nuclear
- https://github.com/caarlos0/tasktimer
- https://github.com/rnkn/olivetti
- https://github.com/hlissner/emacs-solaire-mode
- https://github.com/plexus/chemacs2
- https://github.com/dundee/gdu
- https://github.com/arvindell/envful
- https://github.com/medialab/gazouilloire
- https://github.com/Fanael/rainbow-delimiters
- https://github.com/watsonbox/exportify
- https://github.com/mps-youtube/mps-youtube
- https://github.com/abbbi/qmpbackup (idk if i need this)
- https://github.com/waycrate/swhkd
- https://github.com/raitonoberu/sptlrx
- https://github.com/emacscollective/no-littering
- https://github.com/DeploySentinel/Recorder
- https://github.com/segmentio/chamber
- https://github.com/chrisdonahue/nesmdb
- https://github.com/Khan/snippets
- https://github.com/PaulJuliusMartinez/jless
- https://github.com/Skallwar/suckit
- https://github.com/tsurumeso/vocal-remover
- https://github.com/fmthoma/ascii-art-to-unicode
- https://github.com/textlint/textlint
- https://github.com/mikesteele/dual-captions
- https://github.com/any1/wayvnc
- https://github.com/dinedal/textql
- https://github.com/tangramdotdev/tangram
- https://github.com/awslabs/autogluon
- https://github.com/databricks/click
- https://github.com/trungdq88/logmine
- https://github.com/vinceliuice/Qogir-theme
- https://github.com/SoptikHa2/desed
- https://github.com/ImageOptim/gifski
- https://github.com/icholy/ttygif 
  - https://github.com/vvo/gifify
- https://github.com/yuanqing/vdx
- https://github.com/Sioro-Neoku/go-peerflix IDK
- https://github.com/kohler/gifsicle
- https://github.com/johnfactotum/foliate
- https://github.com/swaywm/swaybg
- https://github.com/neutrinolabs/xrdp
- https://github.com/BishopFox/unredacter
- https://github.com/irevenko/tsukae
- https://github.com/iawia002/lux
- https://github.com/Nekmo/dirhunt
- https://github.com/aria2/aria2
- https://github.com/Franiac/TwitchLeecher
- https://github.com/sabnzbd/sabnzbd
- https://github.com/Mayowa-Ojo/chmod-cli rather than this, what i want is something that can quickly remind me how to set the actual command.
- https://github.com/soruly/trace.moe
  - https://github.com/irevenko/what-anime-cli
- https://github.com/sezanzeb/input-remapper
- https://github.com/PaddlePaddle/PaddleSpeech
  - https://github.com/PaddlePaddle/PaddleOCR
- https://github.com/smacke/ffsubsync
### Data
- https://www.datawrapper.de/
- https://github.com/vasi/pixz
- https://datasette.io/
- https://github.com/dimitri/pgcopydb
- https://github.com/multiprocessio/dsq
- https://github.com/torakiki/pdfsam
- https://archive.is/y0JtV
### Programming
- https://github.com/nico2sh/semtag (use this in my projects)
- https://github.com/analysis-tools-dev/static-analysis
- https://github.com/nickgerace/gfold
- https://github.com/siemens/jailhouse
- https://github.com/benbjohnson/litestream
- https://github.com/golang-migrate/migrate
- https://github.com/textbrowser/dooble
- https://github.com/remote-android/redroid-doc
- https://github.com/binwiederhier/ntfy
- https://github.com/qayshp/TestDisk
- https://github.com/elkowar/eww
- https://github.com/abatsakidis/PDFDeSecure
- https://github.com/mickeynp/combobulate
- https://github.com/wandersoncferreira/code-review
- https://github.com/iorate/ublacklist
- https://github.com/proper-testing/proper
  - https://github.com/BurntSushi/quickcheck
- I need some way to list all the possible tools i can use to look at a problem. might need to build this myself.
- [rr](https://rr-project.org/) : rr aspires to be your primary C/C++ debugging tool for Linux, replacing — well, enhancing — gdb. You record a failure once, then debug the recording, deterministically, as many times as you want. The same execution is replayed every time.
- https://github.com/supabase/postgres (check for tutning my postgres instances)
- https://github.com/nanzhong/workstation
- Learn https://graphviz.org/ Why: https://twitter.com/thingskatedid/status/1386077306381242371
- https://www.flycheck.org/en/latest/index.html see supported languages and enable on ones that's needed
- https://github.com/traefik/yaegi Go interpreter
- https://github.com/kellyjonbrazil/jc
- https://github.com/aarzilli/gdlv
- https://github.com/postgres-ai/database-lab-engine
- https://github.com/lief-project/LIEF
- https://github.com/facebook/flipper
- https://github.com/debauchee/barrier
- https://github.com/amir20/dozzle
- https://github.com/plexsystems/sinker
- https://github.com/tcdi/pgx
- https://github.com/remotemobprogramming/mob
- https://github.com/Redocly/openapi-cli
- https://github.com/iovisor/ubpf
- https://github.com/pixelb/ps_mem
- https://github.com/auto-complete/popup-el
- https://github.com/turbot/steampipe
- https://github.com/nikolaydubina/go-binsize-treemap
- https://github.com/fofapro/fapro
- https://github.com/jstrieb/quickserv (for quick prototyping)
- https://github.com/CZ-NIC/pz
- https://github.com/codeinred/untree
- https://github.com/haampie/libtree
- https://github.com/FiloSottile/passage
- https://github.com/quickemu-project/quickemu
- https://github.com/darold/pgbadger
- https://github.com/jobertabma/ground-control
- https://github.com/XAMPPRocky/tokei
- https://github.com/jorgebucaran/fisher
- https://github.com/benfred/py-spy
- https://github.com/koute/bytehound
- https://github.com/Sysinternals/ProcDump-for-Linux
- https://github.com/jonhoo/inferno
- https://github.com/ymarco/auto-activating-snippets
- https://github.com/ftilde/ugdb
  - https://github.com/cyrus-and/gdb-dashboard
  - https://github.com/cs01/gdbgui
  - https://github.com/hugsy/gef
- https://github.com/AlexStocks/redis-tool-set
  - https://github.com/rediscookbook/rediscookbook
- https://github.com/styfle/packagephobia
- https://github.com/sharkdp/hexyl
- https://github.com/typicode/husky
- https://github.com/conventional-changelog/commitlint
- https://github.com/puremourning/vimspector
- https://github.com/jbyuki/dash.nvim
  - https://github.com/michaelb/sniprun
- https://github.com/lemoony/snipkit
- https://github.com/rohanrhu/gdb-frontend
- https://github.com/rcoh/angle-grinder
- https://eternalterminal.dev/
- https://github.com/google/zx
- https://github.com/katef/libfsm
- https://github.com/johnkerl/miller
  - https://github.com/TomWright/dasel
- https://github.com/haxpax/gosms
- https://github.com/DannyBen/bashly
- https://github.com/SixArm/sixarm-unix-shell-functions
- https://github.com/octobox/octobox
- https://github.com/rui314/mold
- https://github.com/muesli/pkgbuilds
- https://anticapitalist.software/
- https://github.com/someshkar/colabcat
  - https://github.com/hashcat/hashcat
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
- https://github.com/sshuttle/sshuttle
- https://insomnia.rest/ and curl
- https://github.com/wagoodman/dive
- https://hashcat.net/hashcat/
- see how we can use basic machine learning, learn a bit of basic machine learning
  - get familiar with openai tools.
- https://github.com/Jguer/yay
- https://github.com/esimov/caire
- pinfo instead of info
  - Enter for entering link
  - H for previous
  - https://man.archlinux.org/man/fuser.1
- https://wiki.c2.com/?EmacsIsSuperman
- https://github.com/emacscollective/no-littering
- https://www.cs.utah.edu/~regehr/hourglass/ (need to find more such educational things and host them myself)
- https://danielbmarkham.com/how-to-win-at-tech-publishing/
- https://github.com/dai-shi/excalidraw-animate
- https://www.reddit.com/r/PixelArt/
- https://patchbay.pub/
  - https://github.com/schollz/duct/blob/master/src/server/server.go
  - this is real fun
- https://github.com/andrewning/sortphotos : maybe useful for my blog
- https://github.com/vi/websocat
- Regardless of whether password shadowing is in effect on a given system, the passwd file is readable by all users so that various system utilities (e.g., grep) can work (e.g., to ensure that user names existing on the system can be found inside the file), while only the root user can write to it. Without password shadowing, this means that an attacker with unprivileged access to the system can obtain the hashed form of every user's password. Those values can be used to mount a brute force attack offline, testing possible passwords against the hashed passwords relatively quickly without alerting system security arrangements designed to detect an abnormal number of failed login attempts. Especially when the hash is not salted it is also possible to look up these hashed passwords in rainbow tables, databases specially made for giving back a password for a unique hash.  :: https://en.wikipedia.org/wiki/Passwd can create a blogpost out of this
- https://github.com/katmagic/Shallot
- https://ols.wtf/2021/05/10/orgy-personal-tech-stack.html
- https://ban.ai/multics/
- https://blueoakcouncil.org/license/1.0.0
- https://macwright.com/2021/03/16/return-of-fancy-tools.html
- https://github.com/lunixbochs/usercorn
- https://github.com/tianon/gosu
- https://github.com/jdan/cleaver
- https://lobste.rs/s/jgixbw/basics_zfs_snapshot_management
- https://github.com/minimaxir/hacker-news-undocumented
- https://github.com/orf/gping
- https://github.com/rs/curlie
  - https://speedtestdemon.com/a-guide-to-curls-performance-metrics-how-to-analyze-a-speed-test-result/
- https://github.com/chocolateboy/startup-time nice to have on the blog
- https://github.com/joshdick/microstat
- https://github.com/ellie/atuin currently no fish support
- https://github.com/dbgate/dbgate
- https://github.com/spieglt/nestur
- https://github.com/irevenko/what-anime-cli
- https://github.com/Codepoints/awesome-codepoints TUI useful
- https://github.com/caseychu/spotify-backup
- https://github.com/Rigellute/spotify-tui
- https://github.com/timvieira/justified-variables can make a editor exitension based on this
- https://github.com/librariesio/metrics
- https://github.com/cheat/cheat this is most of man69 that i need this is different from https://github.com/chubin/cheat.sh
  - but this lacks exporter support etc. we probably now want man69 to use org mode aswell.
  - this functionality can also be done with pet, man69 serves different purposes than a cheat
- https://github.com/idealo/imagededup
- https://github.com/spook/sshping
- https://github.com/koreader/koreader
- need terminal shortcuts to snakecase, underscore, camelcase etc
- https://github.com/codebutler/farebot
- https://github.com/guumaster/hostctl
- https://github.com/netblue30/firejail
- https://docs.errata.ai/vale/about
  - https://duncan.codes/posts/2020-09-14-prose-linting-vale-emacs.org/index.html
  - real nice
- https://github.com/snarfed/granary
- https://github.com/banga/git-split-diffs
  - i think emacs should already have this idk
- https://github.com/uutils/coreutils
- https://github.com/opticdev/optic can use this for all of my apis for sanity
- https://github.com/DorianRudolph/sirula projecct idea
- https://github.com/nomasters/killcord
- https://github.com/networkprotocol/netcode interesting
- https://github.com/bufbuild/buf
- https://github.com/cloudflare/cloudflared
  - Understand cloudflare + tailscale stack it's interesting
- https://github.com/emitter-io/emitter
- https://github.com/mozilla-services/autograph
- https://github.com/google/wuffs
- https://github.com/k4m4/movies-for-hackers
- https://github.com/genuinetools checkout all the tools here
- https://github.com/itaysk/kubectl-neat
- https://github.com/davidhampgonsalves/life-dashboard
  - hack the kindle to do more things, it's clearly doing less for me
- https://github.com/containers/skopeo
- https://github.com/Wilfred/difftastic
- https://github.com/jasonrudolph/keyboard#a-more-useful-caps-lock-key Very nice, just what i was looking for
- https://github.com/mathiasbynens/dotfiles/blob/main/.aliaseks
- https://github.com/holman/dotfiles
- USENET, use it.  https://github.com/nzbget/nzbget
- https://github.com/hrkfdn/ncspot
- https://github.com/samhocevar/rinetd
- https://github.com/TheDiscordian/ipfs-sync
- https://github.com/Nudin/iptable_vis
- https://github.com/jez/as-tree
- https://github.com/proot-me/proot
- https://github.com/mrbbot/miniflare
- https://github.com/tarsius/keycast
  - https://github.com/jojojames/dired-sidebar nice
  - https://github.com/dacap/keyfreq
  - https://github.com/tecosaur/emacs-config the boss
  - https://github.com/magnars/dash.el
  - https://github.com/magit/transient
  - https://github.com/toshism/org-super-links
  - https://github.com/alphapapa/org-ql
- https://github.com/francma/wob
- https://github.com/merbanan/rtl_433
- https://github.com/koalaman/shellcheck
- https://github.com/hpjansson/chafa
- https://github.com/vmatare/thinkfan BAD
- https://github.com/TotallyNotChase/glitch-this
- i want to be silent but at the same time i want to have a very clear voice, i want things to have intentions, i want to be able to express myself clearly if i am enjoying music i want to just express it, because expressing what i feel completes the feeling for me, i don't want my feelings to hurt anyone but i still want to express so that's one of the founding philosoply
- https://github.com/bup/bup
- https://github.com/bazelbuild/sandboxfs
- https://github.com/GlasgowEmbedded/glasgow
- https://github.com/cuelang/cue
- https://github.com/aquasecurity/tracee
- https://github.com/microsoft/PowerToys windows
- https://github.com/stateright/stateright dist sys
- https://github.com/maciejhirsz/logos
- https://github.com/s-rah/onionscan
- I am going for total minimalism, no extra monitors, just one laptop, a notebook and a pen and i should be able to do whatever the fuck i want to do.
- https://github.com/seccomp/libseccomp
- https://github.com/ellotheth/pipethis : for my usecase i want this to simply execute it in a sandbox env
- https://github.com/greymd/tmux-xpanes
- https://janet-lang.org/
- Alternative viewer for flamegraph: https://github.com/jlfwong/speedscope
- https://github.com/looterz/grimd
- https://safeboot.dev/install/
- https://github.com/firecat53/networkmanager-dmenu
- https://github.com/kennylevinsen/sshmuxd
- https://tailscale.com/kb/1106/taildrop/
- https://ideas.offby1.net/posts/development-environment-2021.html
- https://github.com/dyne/Tomb
- https://github.com/davatorium/rofi-scripts
- https://github.com/lzap/systemd-shortcuts
- https://github.com/tsileo/microblog.pub
  - https://viggy28.dev/article/setting-up-ghost-in-raspberry-pi-for-free/ very nice
- https://github.com/adtac/fssb (all my practice files can go with this i guess)
- https://github.com/michaldaniel/ebook-viewer
- https://github.com/jimsalterjrs/sanoid
- pfsense firewall
- https://github.com/drduh/YubiKey-Guide
- https://github.com/ciur/papermerge scanned doc archival, i have few more but this seems nice
- https://github.com/stepchowfun/docuum
- https://www.explainshell.com/
- https://www.reddit.com/r/InternetIsBeautiful/comments/oeibvg/lalalai_100_aipowered_separation_of_instrumental/
- https://github.com/jrblevin/deft + org-roam
- https://www.reddit.com/r/linux/comments/mzncxc/linux_networking_tool_with_simpler_understanding/
- https://github.com/derailed/k9s
  - k3d, k3s(prod), kind, microk8s
- https://github.com/icy/gk8s#seriously-why-dont-just-use-kubectl-config
  - https://www.atomiccommits.io/everything-useful-i-know-about-kubectl/
  - https://github.com/pch/dotfiles/blob/master/kubernetes/utils.zsh
- https://devhints.io/xpath related to man69
- https://github.com/owenthereal/upterm
- https://github.com/sindresorhus/fkill-cli
- [lfs](https://github.com/Canop/lfs): A thing to get information on your mounted disks.
- https://github.com/pyenv/pyenv
- [z3](https://github.com/presslabs/z3) : Backup your ZFS snapshots to S3. Decide on which filesystem to use.
- https://openrgb.org/
### Random
- https://github.com/javierbyte/pintr
- https://github.com/musically-ut/lovely-forks
- https://github.com/zenorocha/codecopy
- https://github.com/klange/nyancat
- https://github.com/dustinkirkland/hollywood
- https://github.com/yuzu-emu/yuzu
- https://github.com/caarlos0/org-stats
- https://github.com/achannarasappa/ticker
- https://github.com/polybar/polybar
- https://github.com/maaslalani/confetty
- https://github.com/sachac/subed
- https://github.com/SimulaVR/Simula
- https://github.com/asciimoo/drawille
- https://github.com/pixa-pics/pixa-pics.github.io
- https://github.com/freqtrade/freqtrade
- https://github.com/bottlesdevs/Bottles
- https://github.com/cursorless-dev/cursorless-talon
- https://github.com/JeanJouliaCode/wipeClean
- https://github.com/m-ou-se/pong
- https://github.com/GitSquared/edex-ui
- https://github.com/charmbracelet/confettysh
- https://github.com/svenstaro/genact
- https://github.com/in3rsha/sha256-animation
- https://github.com/insin/tweak-new-twitter
- https://github.com/folke/trouble.nvim
- [trashhalo/imgcat](https://github.com/trashhalo/imgcat): a tool to output images as RGB ANSI graphics on the terminal 
  - https://github.com/posva/catimg compare and benchmark which one to use
  - https://github.com/sharkdp/hyperfine use this to run benchmarks
  - https://github.com/michaelkofron/image2ascii
- https://github.com/muesli/smartcrop
- create gist directly from emacs
- https://github.com/nwtgck/piping-server
- https://github.com/openai/glide-text2im
- https://github.com/ruffle-rs/ruffle
- https://github.com/dgryski/haiku-finder
- https://github.com/jayphelps/git-blame-someone-else
- https://github.com/wfxr/code-minimap
- https://github.com/vadimdemedes/gifi
- https://github.com/tj/git-extras
- https://github.com/carbon-app/carbon
  - https://github.com/mplewis/src2png
- https://github.com/lunush/rates
- https://github.com/fregante/GhostText
- https://github.com/TachibanaYoshino/AnimeGAN
- https://github.com/robbiebarrat/art-DCGAN
- https://github.com/bloc97/Anime4K
- https://github.com/wuhuikai/GP-GAN
- https://github.com/jantic/DeOldify
- https://github.com/lucidrains/big-sleep
- https://github.com/lucidrains/DALLE-pytorch
- https://github.com/pathak22/context-encoder
- https://github.com/williamyang1991/TET-GAN
- https://github.com/k4yt3x/video2x
- https://github.com/AaronFeng753/Waifu2x-Extension-GUI
- https://github.com/xinntao/Real-ESRGAN
- https://github.com/TencentARC/GFPGAN
- https://github.com/nagadomi/waifu2x
- https://github.com/PaddlePaddle/PaddleGAN
- https://github.com/junyanz/pytorch-CycleGAN-and-pix2pix
- https://github.com/bobbens/sketch_simplification
- https://github.com/nihui/waifu2x-ncnn-vulkan
- https://github.com/naelstrof/maim
- https://github.com/Syllo/nvtop
- https://github.com/NVIDIA/pix2pixHD
- https://github.com/phillipi/pix2pix
- https://github.com/rh12503/triangula
- https://github.com/apple/turicreate
- https://github.com/alievk/avatarify-python
- https://github.com/nashory/gans-awesome-applications
- https://github.com/AlexeyAB/darknet
- https://github.com/microsoft/Bringing-Old-Photos-Back-to-Life
- https://github.com/meowtec/Imagine
- https://github.com/NVIDIA/FastPhotoStyle
- https://github.com/Mukosame/Anime2Sketch
- https://github.com/DmitryUlyanov/deep-image-prior
- https://github.com/junyanz/CycleGAN
- https://github.com/emilianavt/OpenSeeFace
- lots of twitter bots
  - one idea is to tweet good things from books of assamese authrs see @frogandtoadbot
- https://github.com/hacksalot/HackMyResume
- https://github.com/egonelbre/gophers
- https://github.com/brannondorsey/wifi-cracking
- https://github.com/fanpei91/torsniff
- https://github.com/KuroLabs/Airshare
- https://mediasoup.org/documentation/
- https://github.com/nomad-software/meme
- https://github.com/ashleymcnamara/artwork
- https://awsu.me/
- https://whimsical.com/
- https://github.com/gamelinux/passivedns
- https://github.com/cecton/cecile/blob/main/bin/sendselection
- https://github.com/wohb/okify with some random jittter, i can have programming quotes thrown at me + ascii art whenever i enter the exit code is non-zero
- https://github.com/zfsonlinux/zfs-auto-snapshot
- https://github.com/chozabu/LinNetLim don't want to use this but need something like this
- https://github.com/variadico/noti super useful
- https://github.com/ius/rsatool
- https://github.com/denisidoro/navi
- https://github.com/theSage21/handwritten
- https://github.com/deepfakes/faceswap
- https://github.com/cspeterson/splatmoji
- https://github.com/muesli nice gituhb readme page
- https://github.com/felixfbecker/svg-screenshots nice
- https://github.com/shrutikapoor08/devjoke
- Modify : https://github.com/GMartigny/gh.midi
- https://tosdr.org/
- https://github.com/neldredge/mathgen
- https://github.com/lyrebird-voice-changer/lyrebird
- https://github.com/discourse/discourse i need some way to discuss about the issues across my self hosted things. Use this to host that discussion. Run this thing like a company.
- https://github.com/tridactyl/tridactyl
- https://github.com/dgryski/trifles maintain one such repo
- https://github.com/rupa/z
- https://github.com/raisely/NoHarm
- https://github.com/CorentinJ/Real-Time-Voice-Cloning
- webtorrent
- https://github.com/atxdevops/dodatx-food (can do this for guwahati)
- https://github.com/rbenv/rbenv
- https://github.com/deezer/spleeter
- https://github.com/lengstrom/fast-style-transfer
- https://github.com/lucidrains/deep-daze
- https://github.com/nuno-faria/tiler
- https://github.com/marcbelmont/cnn-watermark-removal
- https://github.com/tzutalin/labelImg
- https://github.com/emilwallner/Screenshot-to-code
- [cbonsai](https://gitlab.com/jallbrit/cbonsai): grow bonsai trees in your terminal
- [Literally listen to your network](https://github.com/vvilhonen/nethoscope)
### Information org
- [flimzy/anki](https://github.com/flimzy/anki) Go library to read Anki *.apkg files 
- https://github.com/watson/cheatsheets/blob/master/google-calendar.md need a wiki for these things aswell
- https://github.com/adri/memex
- https://github.com/JustinBeckwith/linkinator
- https://github.com/dundalek/GrammKit
### Binary data
- ar, nm, readelf, objdump
- https://github.com/angr/angr
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
- https://github.com/Lochnair/xt_tls
- https://github.com/sshuttle/sshuttle
- https://github.com/ducaale/xh
- https://github.com/Overv/outrun (what, we do this all the timE)
- https://github.com/batchcorp/plumber
- https://github.com/yarrick/iodine
- https://github.com/batfish/batfish
- https://github.com/NHAS/reverse_ssh
- https://github.com/RobinLinus/snapdrop
- https://github.com/lwthiker/curl-impersonate
- https://github.com/rootless-containers/slirp4netns
- https://github.com/richfelker/mxclient
- https://github.com/aramperes/onetun
- https://github.com/ns1labs/pktvisor
- https://github.com/awnumar/rosen
- https://github.com/danielmiessler/SecLists
- https://github.com/networkprotocol/netcode
- https://github.com/esnet/iperf
- https://github.com/seemk/WebUDP
- https://github.com/traviscross/mtr
- https://github.com/alexkirsz/dispatch-proxy
- https://github.com/cameronhunter/local-ssl-proxy
- https://github.com/moul/assh
- https://github.com/microsoft/snocat
- https://github.com/JakeWharton/pidcat
- https://github.com/yrutschle/sslh
- https://github.com/fatedier/frp
- https://github.com/gsliepen/tinc
- https://github.com/mpolden/echoip
- https://github.com/robertdavidgraham/masscan
  - https://github.com/networkit/networkit
  - https://github.com/zmap/zmap
- https://github.com/iovisor/bcc
- https://github.com/v-byte-cpu/sx
- https://github.com/wiretrustee/wiretrustee
- https://github.com/fastos/tcpdive
- https://github.com/vvilhonen/nethoscope will be fun to reimplement
- https://github.com/valyala/httpteleport
- https://github.com/cloudflare/xdpcap
- https://github.com/rs/dnstrace
- https://github.com/shadow/shadow
- https://github.com/ntop/ntopng
- [iproute2](https://wiki.gentoo.org/wiki/Iproute2)
- socat, netcat, ss, ip2unix and frens
    - [cc on socat](https://copyconstruct.medium.com/socat-29453e9fc8a6)
    - [What is the difference between netstat and netcat (nc)?](https://www.quora.com/What-is-the-difference-between-netstat-and-netcat-nc)
    - [What's the difference between socat and netcat?](https://serverfault.com/questions/246347/whats-the-difference-between-socat-and-netcat)
### Security
- [sbctl](https://github.com/Foxboron/sbctl): Secure Boot key manager 
- [KasperskyLab/TinyCheck](https://github.com/KasperskyLab/TinyCheck): TinyCheck allows you to easily capture network communications from a smartphone or any device which can be associated to a Wi-Fi access point in order to quickly analyze them.
- https://github.com/m57/dnsteal
- http://firehol.org/tutorial/firehol-by-goal/ unsure
- https://github.com/future-architect/vuls
- https://github.com/s0md3v/XSStrike
- https://github.com/medialab/minet
- https://github.com/inotify-tools/inotify-tools
- https://github.com/tejado/android-usb-gadget
- https://github.com/charmbracelet/melt (explore other tools from this org)
- https://github.com/trufflesecurity/truffleHog
- https://github.com/androguard/androguard (need a more updated version of this from somewhere)
- https://github.com/snovvcrash/VeraCryptThief
- https://github.com/smicallef/spiderfoot
- https://github.com/FirmWire/FirmWire
- https://github.com/zeek/zeek
- https://github.com/r3nt0n/bopscrk
- https://github.com/mrd0x/EvilSelenium
- https://github.com/aquasecurity/tracee
- https://github.com/activecm/rita
- https://github.com/gate-computer/gate
- https://github.com/botherder/androidqf
- https://github.com/utkusen/wholeaked
- https://github.com/mandatoryprogrammer/CursedChrome
- https://github.com/francisrstokes/ebpf-usb
- https://github.com/alphasoc/flightsim
- https://github.com/firezone/firezone
- https://github.com/glebarez/cero
- https://github.com/intel/cve-bin-tool
- https://github.com/seanbreckenridge/sqlite_backup
- https://github.com/opsdisk/pagodo
- https://github.com/ReFirmLabs/binwalk
- https://github.com/mechpen/sockdump
- https://github.com/m57/dnsteal
- https://github.com/trustedsec/User-Behavior-Mapping-Tool
- https://github.com/GTFOBins/GTFOBins.github.io
- https://github.com/evilsocket/opensnitch
- https://github.com/jvns/dnspeep
- https://github.com/mmozeiko/aes-finder
- https://github.com/dmshaw/paperkey
- https://github.com/rapid7/metasploitable3
- https://github.com/ncopa/su-exec
- https://github.com/evilsocket/xray
- https://github.com/Raikia/FiercePhish
- https://github.com/zardus/ctf-tools
- https://github.com/Tylous/SniffAir
- https://github.com/NateBrune/silk-guardian
- https://github.com/ufrisk/pcileech
- https://github.com/cloudflare/flan
- https://github.com/trailofbits/manticore
- https://github.com/trustedsec/social-engineer-toolkit
- https://github.com/eugenekolo/sec-tools
- https://github.com/ElectronicCats/SamyKamTools
- https://github.com/pelya/android-keyboard-gadget
- https://github.com/Waboodoo/HTTP-Shortcuts
- https://github.com/samyk/poisontap
- https://github.com/v2fly/v2ray-core
  - https://github.com/v2ray/v2ray-core
- https://github.com/samyk/pwnat
- https://github.com/taviso/ctftool
- https://github.com/beurtschipper/Depix
- https://github.com/mitmproxy/mitmproxy
- https://github.com/violentmonkey/violentmonkey
- https://github.com/orjail/orjail
- https://github.com/evilsocket/pwnagotchi
- https://github.com/radareorg/radare2
- https://github.com/not-an-aardvark/lucky-commit
- https://github.com/darkoperator/dnsrecon
- https://github.com/ticarpi/jwt_tool
- https://github.com/droe/sslsplit
- https://github.com/nuvious/pam-duress nice
- https://github.com/angr/angr programmable
- https://github.com/Ice3man543/hawkeye
- https://github.com/mvt-project/mvt
- https://github.com/Te-k/harpoon
- https://github.com/docker-slim/docker-slim
- https://github.com/projectdiscovery/nuclei
  - https://github.com/jonaslejon/malicious-pdf
- https://github.com/antoniomika/sish
- https://github.com/0vercl0k/wtf
- https://github.com/Oros42/IMSI-catcher
- https://github.com/ginuerzh/gost also learn its implementation
- https://github.com/dsoprea/go-exif
- https://github.com/threat9/routersploit
- https://github.com/usb-tools/ViewSB
- https://github.com/moul/rules.mk I want to have something similar to this for my projects
- https://github.com/fehawen/bin
- https://github.com/dreadl0ck/netcap
- https://www.chiark.greenend.org.uk/~cjwatson/blog/ssh-quoting.html
- https://github.com/Lissy93/personal-security-checklist
- https://github.com/sozu-proxy/sozu
- https://github.com/zhenyolka/DPITunnel
  - https://github.com/SadeghHayeri/GreenTunnel
- https://github.com/jopohl/urh
- https://news.ycombinator.com/item?id=27323748
- https://github.com/CrowdStrike/travel-laptop
- https://github.com/ffuf/ffuf
- https://github.com/jedisct1/minisign
- [Photon](https://github.com/s0md3v/Photon): Incredibly fast crawler designed for OSINT.
- [feroxbuster](https://github.com/epi052/feroxbuster): A fast, simple, recursive content discovery tool written in Rust. 
- https://github.com/pluja/awesome-privacy
- https://github.com/martijnvanbrummelen/nwipe
- https://github.com/bee-san/pyWhat
- [rust nmap alternative](https://github.com/RustScan/RustScan)
- [Ciphey](https://github.com/Ciphey/Ciphey): Automatically decrypt encryptions without knowing the key or cipher, decode encodings, and crack hashes
- [age](https://github.com/FiloSottile/age)
### Streaming
- [Lightspeed](https://github.com/GRVYDEV/Project-Lightspeed)
- https://github.com/gen2brain/cam2ip (I can use this to keep an eye on who is checking on my laptop)
- [OwnCast](https://github.com/owncast/owncast): Take control over your content and stream it yourself. 
- https://github.com/tsl0922/ttyd
### Crypto
- https://twitter.com/MagnetsOh/status/1390597915727433729
- https://norswap.com/blockchain-how/
- https://smallstep.com/blog/command-line-secrets/
- https://twitter.com/10kdiver/status/1380942728222011395
- https://twitter.com/yassineARK/status/1047978606297792513
- https://archive.is/5cp49
- https://github.com/trustwallet/assets
- I denetly need alerts on some coins, like z-cash was like 12k this month no brainer to get it
- https://twitter.com/saxena_puru/status/1215909869670129665
- https://github.com/nayafia/lemonade-stand
  - https://github.com/beeware/paying-the-piper
  - https://github.com/wbkd/awesome-interactive-journalism
- Metamask
- https://github.com/austintgriffith/eth.build
- curl rate.sx (make own projects like this)
  - I will host a ton of these apis so need some kind of a framework for these.
  - https://github.com/dariusk/corpora
- https://drewdevault.com/2021/04/26/Cryptocurrency-is-a-disaster.html
- https://www.wslyvh.com/ethereum-guide/
- have a crypto setup to do this: https://twitter.com/radicle/status/1364980998530879498 (lbp.radicle.network )
- https://github.com/AleoHQ/wagyu
### Online tools
Make some app where i can keep track of online tools that i use.
- [cool backgrounds](https://coolbackgrounds.io/)
- https://jpeg.rocks/
- https://squoosh.app/
- https://github.com/LingDong-/fishdraw
- https://tradingeconomics.com/india/gdp-growth
- https://github.com/initml/cleanup.pictures
- https://github.com/calebj0seph/spectro
- https://github.com/piskelapp/piskel
- https://github.com/rgab1508/PixelCraft
- https://github.com/tomdionysus/foaas
- https://github.com/Miodec/monkeytype
- https://github.com/alyssaxuu/screenity
- https://github.com/wulkano/Kap
- https://github.com/bestony/logoly
- https://hash.ai/
- https://transformer.huggingface.co/
- https://ar5iv.labs.arxiv.org/
- https://books.google.com/talktobooks/
- https://vicariously.io/
- https://subredditstats.com/subreddit-user-overlaps/slatestarcodex
- https://go-city.github.io/#/github.com/prometheus/prometheus
- https://toonify.photos/
- https://www.ventusky.com/?p=29.21;-89.07;6&l=satellite&t=20210829/1840
- https://languagelearningwithnetflix.com/
- https://artvee.com/
- https://excalidraw.com/ very good drawing playground for tech
- google contacts as contacts crm no extra needed
- https://humanclock.com/ : Make a tool to make scale analogy
    - When we say 10mn, what does that mean you can buy 1 honda city
    - When you say 30mts that's the length of some popular statue
    - When you say 400kg, that's the weight of a maruti suzuki etc etc.
    - Inputs can be multiple SI units  and the analoges can be infinite ;)
- https://tosdr.org/
- https://github.com/iv-org/invidious
- http://goshify.tny.im/
- https://lofi.cafe/ firefox-ssb
- https://github.com/alcor/itty-bitty
- https://github.com/apenwarr/blip
- https://swimlanes.io seq diagrams 
- https://github.com/mingrammer/diagrams for home setup
- https://news.google.com/newspapers?nid=P9oYG7HA76QC&dat=19630731&b_mode=2&hl=en
- http://muan.github.io/emoji-minesweeper/ can make the terminal verison of this for practice
- https://github.com/zedeus/nitter
- https://github.com/ibraheemdev/modern-unix
- https://github.com/ianhan/BitmapFonts
- http://geekwagon.net/projects/xkcd1190/
- https://github.com/rastapasta/mapscii check out how this shit is running on telnet
- https://mbuki-mvuki.org/posts/2021-05-30-memoize-commands-or-bash-functions-with-coprocs/
- https://ninad.pundaliks.in/blog/2020/12/thrift-vpn/
- https://tailscale.com/blog/2021-06-taildrop-was-easy/
- https://whimsical.com/mind-maps
- https://removebackground.app/
- https://github.com/soypat/gitaligned
- fund my macbook pro
  - other fund me pages, wish list and allow people to fund me for it through bitcoin, paypal
- https://github.com/eloquence/freeyourstuff.cc
### Projects that i just want to keep an eye on
- https://github.com/tmrts/boilr
- http://choly.ca/post/debugging-go-with-rr/
- https://github.com/sidkshatriya/rd
- https://dolphin-emu.org/
- https://github.com/elfshaker/elfshaker
- https://github.com/tom-james-watson/wikitrivia
- https://github.com/ageitgey/face_recognition
- https://github.com/typpo/asterank
- https://github.com/standardebooks/tools
- https://github.com/launchbadge/sqlx
- https://danyspin97.org/blog/improving-linux-packaging-rinstall/

## others
- https://venthur.de/2021-06-26-python-packaging.html
- https://frida.re/
- https://github.com/digego/extempore
- https://github.com/facebookresearch/detectron2
- https://github.com/ssh-vault/ssh-vault
- https://github.com/zachlatta/sshtron
- https://github.com/compiler-explorer/compiler-explorer
- https://github.com/CamiloGarciaLaRotta/kboard
- https://github.com/jon4hz/ascii-ssh-movie
- https://github.com/kripthor/WiFiBeaconJam
- https://github.com/rofl0r/proxychains-ng

## Blog inspirations
- https://manfred.life/
- https://www.gwern.net/Links
- https://www.datagubbe.se/bestofbash/
- there are few more need to search
- https://webb.page/
- https://origami.kosmulski.org/blog/2021-05-16-building-personal-origami-website-2021
- ferross ka homepage
- when is nes goingtobeused
- https://steveblank.com/secret-history/
- https://mgree.github.io/ actually make a geekodour cli to access everything i have and my homepage is my man page
- thume.ca
- https://lonami.dev/blog/graphs/ want to have notebooks like this
- read more of usesthis

## voice
- https://github.com/jim-schwoebel/voice_datasets
- https://github.com/jim-schwoebel/voicebook
- https://github.com/jim-schwoebel/voiceome
- https://github.com/julius-speech/julius
- https://github.com/alphacep/vosk-api
- https://github.com/ideasman42/nerd-dictation