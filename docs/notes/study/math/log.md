---
id: log
title: Logarithm
sidebar_label: Logarithm
---

## Intro

A logarithm is the power to which a number must be raised in order to get some other number. Some references refer logarithm as an exponent. It can find the cause for an effect, i.e the **input for some output**.

John Napier introduced Logarithm as a means of simplifying calculations in [1614](/docs/notes/history#1614), that's about 400 years ago. It can do amazing and boring(?) things like counting zeros of a number($log_{10}(1000)=3$), extracting the fifth root of 27, list goes on. This page contains information mostly about real logs, there are [something called](https://en.wikipedia.org/wiki/Multivalued_function) the [complex log aswell!](https://en.wikipedia.org/wiki/Complex_logarithm) and there's [Discrete logarithm](https://en.wikipedia.org/wiki/Discrete_logarithm) which has uses in Cryptography.

> - $y=27^{0.2}$
> - Taking log on both sides
> - Solving and later taking the antilog.
>
> We can do the same for [multiplying large numbers aswell.](https://qedinsight.wordpress.com/2011/04/22/a-practical-use-for-logarithms-part-2-how-we-multiplied-large-numbers-40-years-ago-and-how-integral-transforms-use-the-same-basic-idea/)
>
> - Convert multiplication problem into an addition problem : $log_b xy=log_bx+log_by$
> - Convert division problem into a subtraction problem : $log_b\frac{x}{y}=log_bx-log_by$
> - Convert exp. problem into a multiplication problem : $log_bx^y=ylog_bx$

### A look into the definition

- If $x>0$ and $b\in(0,\infin),\ b\ne1$ then $y=log_b(x)$ iff $b^y=x$
- In the equation $y=log_b(x)$, $y$ is called the **logarithm.**
- Logarithmic functions are only defined for positive real numbers.
- The function $log_b(x)$ is [continuous](https://math.stackexchange.com/questions/1133697/how-do-i-prove-using-the-definition-that-the-logarithmic-function-is-continuous) for $x>0$

Proving that $x$ needs to be positive is simple; If $x$ were negative or 0, $b^y$ has to result in a negative number or 0. No matter what $y$ is, since $b$ is a positive number it's [never going to be a negative number or 0.](https://www.youtube.com/watch?v=MuX7T4PM1Mc)

Now why does $b$(the base) has to be a positive real number not equal to 1?

$b^y=x\ \implies\ b^{log_b(x)}=x$

| Base | Reason it cannot be                                                                                                                                                                                                                                                                                                                                                                        |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1    | For $x=5$, $log_1(5)$ has no solution.<br/> For $x=1$, $log_1(1)$ can be anything.                                                                                                                                                                                                                                                                                                         |
| 0    | For $x=0$, $log_0(0)$ can be anything, otherwise it does not have a solution. We also know that $x$ can't be $0$                                                                                                                                                                                                                                                                           |
| -2   | $(-2)^2=4$ $\implies$ $log_{-2}(4)=2=\frac{log_2(4)}{log_2(-2)}\implies log_{2}(-2)=1\implies 2^1=-2$ which is untrue.<br/><br/> It's also because you can't take [even roots of negative numbers](https://en.wikipedia.org/wiki/Nth_root). Eg. $(-2)^{1.01}=(-2)^{\frac{101}{100}}=\sqrt[100]{-2^{101}}$ is not defined and we lose some properties such as continuity in the real plane. |

> Some interesting discussions negative base:
>
> - [Can logarithm have a negative base?](https://socratic.org/questions/can-a-logarithm-have-a-negative-base)
> - [Why must the base of a logarithm be a positive real number not equal to 1?](https://math.stackexchange.com/questions/690024/why-must-the-base-of-a-logarithm-be-a-positive-real-number-not-equal-to-1)
> - [Why can't logs have negative bases? : /r/learnmath](https://www.reddit.com/r/learnmath/comments/l948f/why_cant_logs_have_negative_bases/)

## Bases

In logarithm the value of a positive number depends not only on the number but also on the base of the logarithm. There are some well known bases.

- Natural Log: $log_e$ written as ln
- Common Log: $log_{10}$ written as lg
- Binary Log: $log_2$ written as lb

### Natural Log

The natural logarithm has the number e (that is b ≈ 2.718) as its base; its use is widespread in mathematics and physics because it is immune to integration and differentiation.i.e. $\frac{d(e^x)}{dx}=e^x$.

### Common Log

The logarithm base 10 (that is b = 10) is called the common logarithm and has many applications in science and engineering.

#### Numbers greater than 1

When it's about $lg$ of numbers greater than 1 that differ by a factor of a power of 10 all have the same fractional part. This fractional part is called the `mantissa`; The integer part, called the `characteristic`

```python
>>> math.log10(3)
0.47712125471966244
>>> math.log10(30)
1.4771212547196624
>>> math.log10(300)
2.4771212547196626
```

> **$log_{10}$ and number of digits:**
>
> If $n$ has $d$ digits, then $10^{d-1}\leq n<10^{d}$
>
> $\implies d-1\leq log_{10}(n)<d$ $(\because log_{10}10^y=y)$
>
> $\lfloor{log_{10}(n)}\rfloor = d-1$ gives the integer part(the `characteristic`)
>
> $\implies \lfloor{log_{10}(n)}\rfloor + 1 = d$, total number of digits in $n$

#### Numbers greater than 0 but less than 1

Numbers greater than 0 and less than 1 have negative logarithms; but that's not true for something like $log_{0.2}(0.8)$

![](/img/difflogplots.png)

> Decade
> https://en.wikipedia.org/wiki/Decade_(log_scale)

### Binary Log

The binary logarithm uses base 2 (that is b = 2) and is commonly used in computer science.

> Octave
> https://en.wikipedia.org/wiki/Octave

### Base does not matter?

As far as big-Oh notation is concerned, the base of the logarithms doesn't make any real difference, because of **Change of Base** property and logarithms are related by some constant. So it's common to see just $log(x)$ notation in big-Oh as the base does not matter.

$$
log_3(n)=\frac{log_2(n)}{log_2(3)}
$$

## Links

- [A Practical Use For Logarithms](https://qedinsight.wordpress.com/2011/04/17/a-practical-use-for-logarithms/)
- [Wiki: Log](https://en.wikipedia.org/wiki/Logarithm)
- [Wiki: Natural Log](https://en.wikipedia.org/wiki/Natural_logarithm)
- [Wiki: Common Log](https://en.wikipedia.org/wiki/Common_logarithm#Mantissa_and_characteristic)
- [Clarify why all logarithms differ by a constant](https://math.stackexchange.com/questions/14133/clarify-why-all-logarithms-differ-by-a-constant)
