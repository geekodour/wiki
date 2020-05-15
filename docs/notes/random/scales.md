---
id: scales
title: Scales
sidebar_label: Scales
---

> I always get confused [by scales](https://en.wikipedia.org/wiki/Scale), so i note them here for future ref of scales i come across often.
>
> - [This video](https://www.youtube.com/watch?v=qSOVBiEotaw) nicely shows how rich Jeff Bezos is doe.
> - $10^{13}$mts from wherever you're reading this from, [you could see the entire solarsystem infront of your eyes](https://www.youtube.com/watch?v=0fKBhvDjuy0)
> - [Orders of magnitude (numbers)](<https://en.wikipedia.org/wiki/Orders_of_magnitude_(numbers)>)

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
growth: log, linear, exponential, polinomial

- exponential growth does not JUST mean a type of growth that grows very fast, it means a particular type of growth.; it's faster than polinomial growth. When things grow in relation to their own size. Proportional growth?

- There is no such thing called the exponential scale
- Does a lograthmic scale grow logatiemtically?

I believe you are confusing exponential growth with an exponential scale. I've never heard of an exponential scale. With a logarithmic scale, the scale does increase exponentially, so that linear growth follows a logarithmic curve, and exponential growth follows a straight line.

- https://en.wikipedia.org/wiki/Semi-log_plot
- https://en.wikipedia.org/wiki/Log%E2%80%93log_plot
- https://en.wikipedia.org/wiki/Level_(logarithmic_quantity)
- https://en.wikipedia.org/wiki/Logarithm#History
- https://en.wikipedia.org/wiki/Significand
- https://en.wikipedia.org/wiki/Floating-point_arithmetic
- https://en.wikipedia.org/wiki/Logarithmic_growth
- https://www.quora.com/Is-there-a-difference-between-logarithmic-and-exponential-growth
- https://en.wikibooks.org/wiki/A-level_Computing/AQA/Paper_2/Fundamentals_of_data_representation/Floating_point_numbers
- https://medium.com/biovinci/log-base-2-or-e-or-10-9f2a694faa51

## Log scales

> ![](/img/logscale.png)
>
> _The distance from 1 to 2 is the same as the distance from 2 to 4, or from 4 to 8. Similarly 1 to 3 is the same as 3 to 9 and 10 to 100 is the same distance as 1 to 10. Thus moving a set distance along the scale means the number has been multiplied by 10 (or some other fixed factor) ;_
>
> 0 is the center of regular additive scales, 1 is the center of logarithmic scales. (???)

A scale of measurement where the position is marked using the logarithm of a value instead of the actual value. Logarithmic scales reduce wide-ranging quantities to tiny scopes.

Suppose you have the inputs, which have a **lot of variation:**

```
1, 3, 5134573435345, 0.0000000053453
```

Taking $log_{10}$ of these numbers we get:

```
0, 0.477, 12.7, -8.27
```

which seem plottable and easily comparable. The statement _"A speck of dust is half way between the size of an atom and the planet earth if you're using logarethmic scale."_ makes sense now.

Some measurements vary by a little at the small scale, or a lot at the large scale. Log scale is simply more convenient than a linear scale for these measurements. Richter Scale, concentration of ions (pH-scale), anything that involves our senses (f-stops in photography, decibels, octaves), entropy, star brightness etc. Some of these use $log_{10}$ and some use $log_2$

### Choice of the base

Typically, $log_{10}$ and $log_e$ scale are used.

## Growth

Often exponential growth curves are displayed on a log scale, otherwise they would increase too quickly to fit within a small graph.

Linear scales are additive, log steps are multiplicative

https://en.wikipedia.org/wiki/Exponential_growth

## Order of Magnitude

An **order of magnitude** is an approximate [position on a **logarithmic scale.**](https://psychology.wikia.org/wiki/Order_of_magnitude). Eg. $4\times10^6$ has a common logarithm of `~6.602`; Its order of magnitude is `6`.

## Inclusive and Exclusive

```
(0, 5) = 1, 2, 3, 4
(0, 5] = 1, 2, 3, 4, 5
[0, 5) = 0, 1, 2, 3, 4
[0, 5] = 0, 1, 2, 3, 4, 5
```
