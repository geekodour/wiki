---
id: laptop_tools
title: Laptop Tools
sidebar_label: Laptop Tools
---

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
```

## xrandr

```shell
# projector
$ xrandr --output HDMI-1 --mode 1366x768
$ xrandr --output HDMI-1 --off
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

## systemd

```shell
# show systemd service file
$ systemctl cat dhcpcd.service
# systemd-analyze plot : units that take a long time to start
$ systemd-analyze plot > plot.svg
```

## Random snippets

```shell
# grep and replace
$ grep -rl assets|xargs sed -i 's/assets/\/img\//g'
```

## Future Tools

> Tools that I want to try out.

- [soveran/map](https://github.com/soveran/map)
- [ripgrep](https://github.com/BurntSushi/ripgrep)
- [oragono](https://github.com/oragono/oragono)
- [thoughts](https://lobste.rs/s/yabibk/thoughts_portable_posixy_pal_for_putting)
- [nethogs](https://linux.die.net/man/8/nethogs)
- [bc](#)
