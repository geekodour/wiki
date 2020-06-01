---
id: promql
title: PromQL Notes Dump
sidebar_label: PromQL
---

## Data Model

![](/img/tsdb_prob.png)

```shell
# stores values over time where the identifier stays the same.
<identifier> -> [(t0,v0), (t1,v1), ...]
t0 = int64, miliseconds unix timestamps
v0 = float64
## each of the following are totally different time series
prometheus_http_requests_total{code="200", handler="/api/v1/query", instance="localhost:9090", job="prometheus"}
prometheus_http_requests_total{code="200", handler="/graph", instance="localhost:9090", job="prometheus"}
```

- We use metric name with labels for the `identifier`
- **Vertical writes**: In a short timeframe, we update every current active time series not necessarily at the same time but in one scrape cycle.
- **On disk**: Each two-hour block consists of a directory containing one or more chunk files that contain all time series samples for that window of time, as well as a metadata file and index file.
- **index file**: indexes metric names and labels to time series in the chunk files.

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

- It should be always used with `counter` variables as it calculates the per second increase of your `counter` in the specified time range. It makes no sense of taking `rate` of a `gauge` variable. It's a good rule not never compare raw counters and always use `rate()`, `rate` makes use of all the datapoints returned by the range vector unlike `delta` because it returns the per-second average rate [of increase of the time series in the range vector.](https://utcc.utoronto.ca/~cks/space/blog/sysadmin/PrometheusRateVsIrate)
- Use `rate` for alerts and slow-moving counters, a small dip in the rate can reset the `FOR` clause when alerting if using `irate` so prefer using `rate`.
- `irate`/instant rate is basically taking `rate` of the last two samples; i.e looks back at the last two samples under a sliding window.
- `irate` should only be used when graphing volatile, fast-moving counters. See [comparison here.](https://www.robustperception.io/irate-graphs-are-better-graphs)

> When taking `rate` it's advisable to take the range time-frame be `4x` the scraping interval. Prometheus default `scrape_interval` is 15s so it should be minimum `1m` because `rate` needs at least two data points to calculate the rate of increase.

## Querying

There are terms such as [Instant Queries](https://prometheus.io/docs/prometheus/latest/querying/api/#instant-queries),[Range Queries](https://prometheus.io/docs/prometheus/latest/querying/api/#range-queries), [Instant and Range vector selectors](https://prometheus.io/docs/prometheus/latest/querying/basics/#range-vector-selectors), [Offset Modifiers](https://prometheus.io/docs/prometheus/latest/querying/basics/#offset-modifier), [Subqueries](https://prometheus.io/blog/2019/01/28/subquery-support/), the [time, start and end query parameters](https://prometheus.io/docs/prometheus/latest/querying/api/#range-queries), grafana's `$__interval`, steps and resolutions, which can be pretty intimidating at first to understand how all these relate. The documentation actually explains everything nicely but here's a summary.

There are basically two ways you can select time series, they are called the **time series selctors**; instant and range vector selectors. The [`offset`](https://prometheus.io/docs/prometheus/latest/querying/basics/#offset-modifier) modifier can be used to get historical instant or range vectors which can be useful for alerts when comparing against the past.

### Instant vs Range vectors

![](/img//instant_vec.png)

> Instant vector returns the most recent value for any time series. This is how are we getting an instant vector at any(past,present) point in time even if the scrapes are happening at specific intervals.

![](/img//range_vec.png)

> Range query basically just dumps samples back from the current instant. The timestamps for different timeseries will mostly be different but the it's interesting to notice that the samples mostly differ by the `scrape_interval`.

### The API

### Request and Response combinations

#### Instant Vector

See the [parameters here.](https://prometheus.io/docs/prometheus/latest/querying/api/#instant-queries)

| endpoint       | query                                                                              | notes                                                                                                                                                                                          | `resposeType` |
| -------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `/query`       | instant vector [with `time`](https://github.com/prometheus/prometheus/issues/1246) | The prometheus UI in console mode uses this.                                                                                                                                                   | vector        |
| `/query`       | instant vector with `time` and `offset`                                            | Even if offset is set and values will be different, the timestamp of an instant vector result [is always that of the `evaluation time`.](https://github.com/prometheus/prometheus/issues/5415) | vector        |
| `/query_range` | instant vector with `start`, `end` and `step`                                      | The prometheus UI in graph mode and grafana uses this to get instant vectors to plot.                                                                                                          | matrix        |
| `/query_range` | instant vector with `start`, `end` , `step` and `offset`                           | Similar to `/query` with `offset`                                                                                                                                                              | matrix        |

#### Range Vector

See the [parameters here.](https://prometheus.io/docs/prometheus/latest/querying/api/#range-queries)

| endpoint       | query                                                  | notes                                                      | `resposeType` |
| -------------- | ------------------------------------------------------ | ---------------------------------------------------------- | ------------- |
| `/query`       | range vector with `time`                               | -                                                          | matrix        |
| `/query`       | range vector with `time` and `offset`                  | The timestamps shown will be from the time of the `offset` | matrix        |
| `/query_range` | range vector with `start`, `end` and `step`            | Not Allowed                                                | -             |
| `/query_range` | range vector with `start`, `end` , `step` and `offset` | Not Allowed                                                | -             |

### Steps and Resolution

> These are specific to range queries(`/query_range`).
>
> Instant queries(`/query`) do not have a `step` parameter, as they are evaluated at a single point in time (the current time, or a custom time if set)

Resolution in promethus world can be measured in seconds, _eg. 1ms resolution > 1s resolution_. 1ms resolution will have way higher noise. When querying prometheus data, we can use the `step` parameter in `/query_range` to set our resolution, which then evaluates the given query at each `step` independent of the `stored samples`. So we can represent larger time ranges without being accurate enough.

Sometimes query step/query resolution/resolution step/evaluation step/`interval`(source) are used interchangbly. The`step`,`start`and`end` paratemeters determines how many points you will get back.

![](/img/thanos_step.png)

> **What if you specify a resolution of `5s` for a time series scraped with `scape_interval` set to `1m`, Prometheus doesn't have more datapoints to evaluate!**
>
> This explanation is equally true for any value for the resolution. Sample timestamps for different time series can be at arbitrary intervals and not time-aligned with each other but you still need to be able to select multiple series and aggregate over them, so they need to be [artificially aligned](https://github.com/prometheus/prometheus/issues/2564).
>
> The way promql does this by having an independent `evaluation interval` (the resolution `step` that you chose) for the query as a whole, independent of the underlying details of the data. So `scrape_interval=1m` and `step=5s`, simply means that new data is put into the [time series at every `scrape_interval` but query is evaluated at each `step` for every timeseries](https://www.robustperception.io/step-and-query_range) that is matched for that identifier. Functions like `rate` don't know whether they're being called as part of a range query, nor do they know what the step is.
>
> promql engine basically [runs an evaluation loop](https://github.com/prometheus/prometheus/blob/2209fa98b42aee3aed864d7ea3534775ca8cd6e9/promql/engine.go#L920) where we start at the range's start timestamp, then increase the timestamp by interval on every iteration, and abort the loop when the timestamp becomes larger than the range's end timestamp.

> Example timeseries: `[(t,v)] => [(1,1),(4,4),(7,7),(11,11),(15,15)]`
>
> Running the evaluation loop on this time series with `start=0`,`end=16` and `step=5` will give us `[(0,0),(5,4),(10,7),(15,15)]`
>
> PromQL selects the value of the sample that is the most recent before (or exactly at) the `evaluation step` timestamp, it never looks at "future" data, so for `t=0`/`start=0`, the result would simply be empty instead of `1`.

### Prometheus UI and Grafana

Grafana has a few parameters/options to access the prometheus api endpoints in a few different ways, it's best to consult the [official grafana prometheus datasource doc](https://grafana.com/docs/grafana/latest/features/datasources/prometheus/).

Since Grafana has to deal with graphs and not just the metrics, it has to take extra care when plotting things so that there is never more data points than the the number of has pixels the graph has etc. It has few options which can be **easily confused** with what parameters prometheus api takes in.

Tweaking these grafanap options really depends on what one wants to see in the graph, but there are some variables and options which are not well stated in the official documentation.

- `$__interval` (seconds) : It is a global variable that is dinamically calculated based on the time range and the width of the graph(the number of pixels). There are the `$__from` and `$__to` variables to specify timerange, . The formula is `$__interval = ( $__from - $__to)/resolution`, resolution here means the display resolution(the width of the panel). For example, If the panel is `1099px` wide and time range is `24h = 86400s`, `$__interval = 86400/1099 = 78s`, `78s` is then **rounded up** to `2m` which is then set to the `$__interval` variable.
- When using the **prometheus data source**, the value of the `$__interval` variable is used as the `step` parameter for the prometheus range queries(`/query_range`)
- In the prometheus query editor we get another option called `Resolution` which is a ratio(`1/1`,`1/2`,...). `Resolution` here basically means **how many pixels per datapoint**, (`1/1` > `1/10`) This basically modifies the `$__interval` variable ergo the `step`.

> Example,
>
> - If `$__interval` was `2m` and `Resolution` was set to `1/1`, `step` would be `2m`.
> - If `$__interval` was `2m` and `Resolution` was set to `1/2`, `step` would be `2m`x2=`4m`.

- **The minimum value of `step`** is (or can be) limited in various ways, both for the entire panel of queries (`Min interval`) and in the individual metrics queries (`Min step`)
- In grafana you can make your `rate()` range intervals auto-adjust to fit the `steps`. One could use `$__interval` to choose an appropriate value such as `rate(a_metric_name[$__interval])` for the range vector.
- The range interval you likely want to use for `rate()` depends partly on your query step:

  - Might want the `rate()` range interval of the `query step`
  - Might want the `rate()` range somewhat more than the `query step`
  - If we try to do something like `rate(metric_name[3s])` where the `step` greater than the range of the vector, we'll undersample and skip over some data! because now range durations only include one metric point and none of `rate` or `irate` can operate on one data point.

- There is also the `$__range`,`$__range_s` and `$__range_ms` variables which is basically `to - from` **(CONFUSION!!!)**

- Takeaway, when working with prometheus and Grafana there are **3 different meanings of the same word** resolution. The actual prometheus resolution/`step`(seconds), The panel width resolution and the `Resolution` ratio option of the prometheus datasource.

#### Issues

- In console mode, Older react UI on time increment just increments by 10 mins, the new react UI does that by 30 mins. Sometime it increments the microseconds in the classic UI. weird.
- This article points to [some more complex senarios.](https://www.stroppykitten.com/technical/prometheus-grafana-statistics)

### Stallness

- At every resolution timestep, for every series the PromQL expression references, the last sample value is chosen (if it is not older than the staleness period of 5 minutes).
- Note that there will be always one returned sample for every increment of the interval (5), even if it would be the same repeated value from the same sample (if "real" samples are less frequent than the eval step). The exception is when there is an explicit staleness marker or the last sample for a given series is >5min before the evaluation timestamp (promql.LookbackDelta = 5 \* time.Minute).
- https://www.robustperception.io/staleness-and-promql
- https://github.com/prometheus/prometheus/pull/7011
- https://github.com/prometheus/prometheus/issues/398
- https://promcon.io/2017-munich/talks/staleness-in-prometheus-2-0/

### Subquery

- https://prometheus.io/blog/2019/01/28/subquery-support/
- https://utcc.utoronto.ca/~cks/space/blog/sysadmin/PrometheusSubqueriesForSpikes
- https://utcc.utoronto.ca/~cks/space/blog/sysadmin/PrometheusSubqueriesDefaultStep
- https://utcc.utoronto.ca/~cks/space/blog/sysadmin/PrometheusSubqueriesMathOverTime

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

### Read

- [PrometheusQuerySteps](https://utcc.utoronto.ca/~cks/space/blog/sysadmin/PrometheusQuerySteps)

## Doubts

### Placement of `by`, are these the same?

```
sum by (job)(rate(http_requests_total{job="node"}[5m]))
```

```
sum (rate(http_requests_total{job="node"}[5m]))  by (job)
```

- what are modifiers (offset, bool)
