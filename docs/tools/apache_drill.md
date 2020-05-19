---
id: apache_drill
title: Apache Drill
sidebar_label: Apache Drill
---

## First Impressions

- Pretty cool stuff. Unified way to query data from various data sources.
- Not very k8s friendly but works, has two modes of operation embedded and distributed. The distributed mode uses zookeeper to keep things in sync which can used in server/k8s environment and the embedded mode is meant to be used locally.
- Main workhorse is the **drillbit**, it should run close to the data for better data locality. Each drillbit can use plugins to connect to different datasources(file, mongo etc).
- In distributed mode, when there are multiple drillbits running **any one** of them can take in the query, i.e there is **no leader-follower architecture** here. The drillbits can talk to each other with the help of zookeeper. The once receiving the query becomes the coordinator for that request. It is also important for all of the drillbits to be running on the same configuration, esp. `drill.exec.cluster-id`.
- Nice video on [how drill works.](https://www.youtube.com/watch?v=0rurIzOkTIg)

## Issues
