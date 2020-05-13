---
id: scales
title: Scales
sidebar_label: Scales
---

> I always get confused [by scales](https://en.wikipedia.org/wiki/Scale), so i note them here for future ref of scales i come across often.
>
> - [this video](https://www.youtube.com/watch?v=qSOVBiEotaw) nicely shows how rich Jeff Bezos is doe.
> - `10^13`mts from wherever you're reading this from, [you could see the entire solarsystem infront of your eyes](https://www.youtube.com/watch?v=0fKBhvDjuy0)

## million, billion, lakh, cr

- 1bn = 100cr = 9 zeros = 10^9
- 1cr = 10mn = 100lac = 7 zeros = 10^7
- 1mn = 10lac = 6 zeros = 10^6

For currency it's again multiplying by the currency. Eg. To me a millionaire you'll need `75.69*10^6=~7cr`, so if you have around `₹ 7cr` in your bank, you're a millionaire. 🤑

## bandwidth, latency and throughput

Layman explanation don't @t me; You live in Guwahati and wish to send `200TiB` of pirated ebooks to your friend in Delhi, out of may options here are two:

- Send it via mailpost (`High Bandwidth`, `High Latency`)
- Send it via IP Network/Internet (`Low Bandwidth`, `Low Latency`)

It'll take a lot of time for your friend to download `200TiB` of data with the Internet but will be able to stream it the fastest due to lower latency than sending it via mailpost.

- **Bandwidth**: Amount of data you can send. **High Bandwidth is good.**
- **Latency**: How much time it takes for a signal(in our case the first signal) to travel to its destination. **Low Latency is good.**
- **Throughput**: How much data is travelling. **High Throughput is good.**

## Bytes

- 1e+9 bytes = 1e9 = 10^9B = 2^30B = 1GB (1 Billion bytes in 1GB)
- 1e+6 bytes = 1e6 = 10^6B = 2^20B = 1MB (1 Million bytes in 1MB)

## Graphs

> The reason you choose one scale over another when graphing is to reveal detail that might otherwise be hidden by the nature of the data you're looking at. When talking about scales in graphs, `growth` is tightly coupled; so there are mentions of it aswell.

confusion:
scale: log, linear, exponential
growth: log, linear, exponential

again log has log2(lb), log10(log) and loge(ln)

when we simply say log we mean log10

- There is no such thing called the exponential scale
- Natural log is log base e, not log base 10 btw.
- Does a lograthmic scale grow logatiemtically?

I believe you are confusing exponential growth with an exponential scale. I've never heard of an exponential scale. With a logarithmic scale, the scale does increase exponentially, so that linear growth follows a logarithmic curve, and exponential growth follows a straight line.

- https://en.wikipedia.org/wiki/Semi-log_plot
- https://en.wikipedia.org/wiki/Log%E2%80%93log_plot

### Log scales

> Logarithms find the cause for an effect, i.e the **input for some output**. Log itself has so many uses but when it comes to log scale, it really helps us make good estimate of extremely large/small numbers.

A scale of measurement where the position is marked using the logarithm of a value instead of the actual value.

Suppose you have the inputs, which have a LOT of variation:

```
1, 3, 5134573435345, 0.0000000053453
```

Taking `log10` of these numbers we get:

```
0, 0.477, 12.7, -8.27
```

which seem plottable and easily comparable.

> The statement _"A speck of dust is half way between the size of an atom and the planet earth if you're using logarethmic scale."_ makes sense now.
>
> Some measurements vary by a little at the small scale, or a lot at the large scale. Log scale is simply more convenient than a linear scale for these measurements. Richter Scale, concentration of ions (pH-scale), anything that involves our senses (f-stops in photography, decibels, octaves), entropy, star brightness... the list goes on.

Interesting things to know:

- An **order of magnitude** is an approximate [position on a **logarithmic scale.**](https://psychology.wikia.org/wiki/Order_of_magnitude). Eg. `4*10^6` has a logarithm of `~6.602`; Its order of magnitude is `6`.
- The choice of base in logaretmic scale is upto us.
- 0 is the center of regular old additive scales, and 1 is the center of logarithmic scales.
