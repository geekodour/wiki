---
id: performance_tools
title: Performance Tools
sidebar_label: Performance Tools
---

## vmstat

- [Slightly obsolete Brendan Gregg on vmstat](https://www.youtube.com/watch?v=k9eX1jQR1hA)
- For cpu stats, it shows average across _all_ cpus for the interval. running queue(`r` col) can be used to predict cpu saturation in a coarse way, calculated uptime load averages is a more accurate way to determine cpu saturation.

```shell
$ vmstat <interval> <count>
$ vmstat -w (better formatting!)
```

## pmap

pmap - report memory map of a process

```shell
$ sudo pmap -x <PID>
```

## ps

- memory is in kilobytes (seem manpage)
- Funfact: `ps`,`kill`,`pgrep`,`top`,`vmstat` etc are all part of [procps](https://gitlab.com/procps-ng/procps)

```shell
# `ps` with Major Pagefault, Minor Pagefault, `RSS` and `VSZ`
$ ps -eo min_flt,maj_flt,cmd
$ ps -eo pmem,comm,pid,maj_flt,min_flt,rss,vsz --sort -rss | numfmt --header --to=iec --field 4-5 | numfmt --header --from-unit=1024 --to=iec --field 6-7 | column -t | egrep "[t]est|[P]ID"
# for a specific pid
$ ps -p 322453 -u
```

## Htop/top

- [Output reference](http://archive.is/PUHrs)
- Show user threads: <kbd>Shift + H</kbd>
- Memory is shown in kilobytes.

## Random snippets

```shell
# Poor man's stress test by @bwplokta
# Replaces every newline with x then `head` for 4GB(4*10^9bytes)
# then feed it to `grep`, grep will slowly consume 4GB of memory.
$ yes | tr \\n x | head -c $BYTES | grep showmedamoney
```

## Books
- https://github.com/dendibakh/perf-book