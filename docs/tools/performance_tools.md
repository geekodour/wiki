---
id: performance_tools
title: Performance Tools
sidebar_label: Performance Tools
---

## vmstat

- [Slightly obsolete Brendan Gregg on vmstat](https://www.youtube.com/watch?v=k9eX1jQR1hA)
- For cpu stats, it shows average across _all_ cpus for the interval. running queue(`r` col) can be used to predict cpu saturation in a coarse way, calculated uptime load averages is a more accurate way to determine cpu saturation.

```
vmstat <interval> <count>
vmstat -w (better formatting!)
```

## nm

list symbols from object files

## pmap

pmap - report memory map of a process

```
sudo pmap -x <PID>
```

## strace

```
// show syscalls related memory
strace -e trace=%memory ./main
```

## ps

- memory is in kilobytes (seem manpage)
- Funfact: `ps`,`kill`,`pgrep`,`top`,`vmstat` etc are all part of [procps](https://gitlab.com/procps-ng/procps)

```
// `ps` with Major Pagefault, Minor Pagefault, `RSS` and `VSZ`
ps -eo pmem,comm,pid,maj_flt,min_flt,rss,vsz --sort -rss | numfmt --header --to=iec --field 4-5 | numfmt --header --from-unit=1024 --to=iec --field 6-7 | column -t | egrep "[t]est|[P]ID"
// for a specific pid
ps -p 322453 -u
```

## htop

- `VSZ` in `ps` = `VIRT` in `top`.
- `RSS` in `ps` = `RES` in `top`.

## Random snippets

### Poor man's stress test by @bwplokta

```
// Replaces every newline with x then `head` for 4GB(4*10^9bytes) then feed it to `grep`, grep will slowly consume 4GB of memory.
yes | tr \\n x | head -c $BYTES | grep showmedamoney
```
