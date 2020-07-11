---
id: linux_security
title: Linux Security
sidebar_label: Linux Security
---

Unix permissions, capabilities, SELinux, AppArmor, seccomp, etc.

- cat /proc/PID/cgroup, you see that the process is in a cgroup
- If you look at /proc/PID/status, you see capabilities.
- If you look at /proc/self/attr/current, you see SELinux labels.
- If you look at /proc/PID/ns, you see the list of namespaces the process is in.
