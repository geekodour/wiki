---
id: promql
title: PromQL Notes Dump
sidebar_label: PromQL
---

## Instant vs Range vectors

![](/img//instant_vec.png)
![](/img//range_vec.png)

## Operators

### Aggregation

**only** takes `instant vectors` as inputs and only return `instant vectors` as outputs. Eg. `sum`,`min`,`max`,`stddev`,`stdvar`.

### Binary

- Arithmetic binary operators `+ - \* / % ^`
- Comparison binary operators `== != > < >= <=`
- Logical/set binary operators `and (intersection) | or (union) | unless (complement)`

Works with both `scalar` and `instant vectors`; let `&` be some binary operator.

- `scalar & scalar = scalar`
- `scalar & instant vector = instant vector`
- `instant vector & instant vector = instant vector`

## Functions

Takes argument of any promql type, gives output in any promql type.

### `rate(v range_vector)`

- It should be always used with `counter` variables as it calculates the per second increase of your `counter` in the specified time range. It makes no sense of taking `rate` of a `gauge` variable. It's a good rule not never compare raw counters and always use `rate()`

- `irate` should only be used when graphing volatile, fast-moving counters. Use `rate` for alerts and slow-moving counters, as brief changes in the rate can reset the `FOR` clause and graphs consisting entirely of rare spikes are hard to read. `irate` is basically taking `rate` of the last two samples; i.e _instant rate_

- When taking `rate` it's advisable to take the range timeframe be `4x` the scraping interval. Prometheus default `scrape_interval` is 15s so it should be minimum `1m` because `rate` needs atleast two data points to calculate the rate of increase.

## Links

### PromQL

- [prometheus-example-queries](https://github.com/infinityworks/prometheus-example-queries)
- [promql for humans](https://timber.io/blog/promql-for-humans/)
- [docs](https://prometheus.io/docs/prometheus/latest/querying/basics/#operators)
- [jitendra-1217/promql.cheat.sheet](https://github.com/jitendra-1217/promql.cheat.sheet)
- [Prometheus Querying - Breaking Down PromQL](https://www.section.io/blog/prometheus-querying/)
- [PromQL queries for the rest of us](https://www.weave.works/blog/promql-queries-for-the-rest-of-us/)
- [grafana promql post](https://grafana.com/blog/2020/02/04/introduction-to-promql-the-prometheus-query-language/)
- [Understanding the Prometheus rate() function](https://www.metricfire.com/blog/understanding-the-prometheus-rate-function)
- [Rate then sum, never sum then rate](https://www.robustperception.io/rate-then-sum-never-sum-then-rate)
- [How does a Prometheus Counter work?](https://www.robustperception.io/how-does-a-prometheus-counter-work)

### Alerting

- [Absent Alerting for Jobs](https://www.robustperception.io/absent-alerting-for-jobs)
- [Absent Alerting for Scraped Metrics](https://www.robustperception.io/absent-alerting-for-scraped-metrics)

## Doubts

### Placement of `by`, are these the same?

```
sum by (job)(rate(http_requests_total{job="node"}[5m]))
```

```
sum (rate(http_requests_total{job="node"}[5m]))  by (job)
```
