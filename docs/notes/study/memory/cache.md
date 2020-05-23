---
id: cache
title: Notes on cache
sidebar_label: cache
---

> My computer has 32bit (`$ getconf WORD_BIT`) wordsize and dL1,iL1(data,instruction) cache of 32KB each(`$ lscpu`), supports `write-back` (`$ lshw`)
>
> ```
> λ getconf -a | grep CACHE
>
> LEVEL1_ICACHE_SIZE                 32768
> LEVEL1_ICACHE_ASSOC                8
> LEVEL1_ICACHE_LINESIZE             64
> LEVEL1_DCACHE_SIZE                 32768
> LEVEL1_DCACHE_ASSOC                8
> LEVEL1_DCACHE_LINESIZE             64
> LEVEL2_CACHE_SIZE                  262144
> LEVEL2_CACHE_ASSOC                 4
> LEVEL2_CACHE_LINESIZE              64
> LEVEL3_CACHE_SIZE                  6291456
> LEVEL3_CACHE_ASSOC                 12
> LEVEL3_CACHE_LINESIZE              64
> ```

## Types of `miss`

- **Cold (compulsory) miss**: at the start when cache is empty.
- **Capacity miss**: when `working set` is larger than the cache.
- **Conflict miss**: this is common in direct mapping, happens less in e-way associatve caches. Block i at level k+1 must be placed in block (i mod 4) at level k

## Organization

- `(S,E,B)`
- S = 2^s `sets`
- E = 2^e `lines` per set.
- B = 2^b bytes per cache `block`. (this is what we mean when we say cache block size)
- Each `line` consist of a `block` and few more things.

> cache `blocks` are interesting, the purpose of blocks is to exploit spatial locality. If you make the `blocks` too small, you might not fetch enough neighbour bits so that spatial locality is at use.

![](/img//cache.png)

> If you ever want to design a cache:
>
> - The block size comes first
> - Then you determine how big you want your cache to be
> - Then you decide on the associativity
> - Once you determine the associativity, that determines the number of sets.

> **Associativity == S (no of sets, 2^s)**

### Cache placement policies

These can be categorized based on [associativity](https://en.wikipedia.org/wiki/CPU_cache#Associativity).

- **Direct Mapped cache**: `E = 1`, multiple `S`. The cache can be framed as a (S\*1) column matrix. good best-case time, but unpredictable in worst case.
- **Fully associative cache**: `E` is multiple but `S =1`. The cache organization can be framed as (1\*E) row matrix.
- **E-way associative cache/ Set-associative cache**: When `E` is more than 1. A set-associative cache can be imagined as a (E\*S) matrix. Eight-way set associative cache is common.

> Even though fully associative cache give the best miss rate, It's not worth having this much of complex search logic in the hardware of cache to support low associativity to support full associativity. We do see full associativity in virtual memory, because the penalty in `DRAM to Disk` is way more than penalty from `cache to DRAM`.

When there is the need to replace a `block/line` in a cache, [cache replacement policies such as LRU are used.](https://en.wikipedia.org/wiki/Cache_replacement_policies), the `lines` have additional blocks to store timestamps etc.

## Writing

![](/img//cache_write.png)

## Metrics

- Miss Rate (%)
- Hit Time (cpu cycles); eg. 4clock cycle for L1
- Miss Penalty (cpu cycles) ; Total time for a `miss` = `hit time`+`miss penalty`

### Improving locality

> Lots of doubts in **Cache miss analysis**

#### Spatial Locality

Rearranging loops. Basically going from right-to-left, we want the leftmost item to be changing the fastest eg. `A[k][i][j]`, here `j` should be changing the most if the nested loops involved are for `i`,`j`and `k`; so rearranging nested loops in the order of `k-i-j` will give the best spatial locality.

Also see [Memory Hierarchy](/docs/notes/study/memory/mem_hie#locality)

#### Temporal Locality

- [Supplementary notes on using Blocking to Increase Temporal Locality∗](/pdf/waside-blocking.pdf)
