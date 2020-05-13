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

```
git show --format=email HEAD | ./scripts/checkpatch.pl --strict --codespell
```

## xrandr

```shell
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

- Printing in a makefile: `$(info ${VAR_NAME})`

## weechat

- Switch channels: <kbd>Alt</kbd>+<kbd>1/2/3/../9</kbd>
- Set settings: `/fset`

## x window

- All keycodes: `xmodmap -pke`
- keystrokes: `xev`
- window class: `xprop`

## codespell

```shell
codespell .
```

## Formatting USB

```shell
$ dd if=/dev/zero of=/dev/sdX status=progress
$ fdisk /dev/sdb
$ mkfs.vfat /dev/sdb1
```

## rsync

```
rsync -avzhP -e "ssh -i path_to_key" /from/dir/ username@host:/to/dir/
```

## lshw

## lscpu

- `cat /proc/cpuinfo` shows individual cpu stats doe.

## lstopo

## Random snippets

### Grep and replace

```
grep -rl assets|xargs sed -i 's/assets/\/img\//g'
```
