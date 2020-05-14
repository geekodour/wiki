---
id: log
title: Logarithm
sidebar_label: Logarithm
---

## Intro

A logarithm is the power to which a number must be raised in order to get some other number. Some references refer logarithm as an exponent. It can find the cause for an effect, i.e the **input for some output**

John Napier introduced Logarithm as a means of simplifying calculations in [1614](/docs/notes/history#1614), that's about 400 years ago. It can do amazing and boring(?) things like counting zeros of a number($log_{10}(1000)=3$), extracting the fifth root of 27, list goes on.

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

- If $x>0$ and $b>0, b\ne1$ then $y=log_b(x)$ iff $b^y=x$
- In the equation $y=log_b(x)$, $y$ is called the **logarithm.**
- Logarithmic functions are only defined for positive real numbers.
- The function $log_b(x)$ is continuous for $x>0$
- This means that $x$ should always be positive and $b$ should always be greater than 1.

Proving that $x$ needs to be positive is simple; If $x$ were negative or 0, $b^y$ has to result in a negative number or 0. No matter what $y$ is, since $b$ is a positive number it's [never going to be a negative number or 0.](https://www.youtube.com/watch?v=MuX7T4PM1Mc)

Now why does $b$(the base) has to be greater than 1?

$b^y=x\ \implies\ b^{log_b(x)}=x$

| Base | Reason it cannot be                                                                                                                                                                                                                     |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | For $x=5$, $log_1(5)$ has no solution.<br/> For $x=1$, $log_1(1)$ can be anything.                                                                                                                                                      |
| 0    | For $x=0$, $log_0(0)$ can be anything, otherwise it does not have a solution. We also know that $x$ can't be $0$                                                                                                                        |
| -2   | $(-2)^3=-8$ i.e $log_{-2}(-8)=3$ 🛑 (not valid with $log$ because you can't take [even roots of negative numbers](https://en.wikipedia.org/wiki/Nth_root). Eg. $(-2)^{1.01}=(-2)^{\frac{101}{100}}=\sqrt[100]{2^{101}}$ is not defined! |

> Some interesting discussions negative base:
>
> - [Can logarithm have a negative base?](https://socratic.org/questions/can-a-logarithm-have-a-negative-base)
> - [Why must the base of a logarithm be a positive real number not equal to 1?](https://math.stackexchange.com/questions/690024/why-must-the-base-of-a-logarithm-be-a-positive-real-number-not-equal-to-1)
> - [5.1 Roots and Radicals](https://saylordotorg.github.io/text_intermediate-algebra/s08-01-roots-and-radicals.html)
> - [Cubic root of negative numbers](https://math.stackexchange.com/questions/25528/cubic-root-of-negative-numbers)
> - [Why can't logs have negative bases? : /r/learnmath](https://www.reddit.com/r/learnmath/comments/l948f/why_cant_logs_have_negative_bases/)
> - [Radicals](http://www.onemathematicalcat.org/algebra_book/online_problems/radicals_mp.htm)
> - [What Do Fractional Exponents Mean?](https://medium.com/i-math/what-do-fractional-exponents-mean-1bb9bd2fa9a8)
> - [Complex logarithm](https://en.wikipedia.org/wiki/Complex_logarithm)
> - [Multivalued function](https://en.wikipedia.org/wiki/Multivalued_function)

## Bases

Now that we know that bases positive and greater than 1, there are some well known bases that we come across often.

- Common Log: $log_{10}$ written as lg
- Natural Log: $log_e$ written as ln
- Binary Log: $log_2$ written as lb

Each of these have special peoperties and uses; going through each of them:

### Common Log

Logarithms that differ by a factor of a power of 10 all have the same fractional part.

Decade

### Natural Log

### Binary Log

Octave

## Links

- [A Practical Use For Logarithms](https://qedinsight.wordpress.com/2011/04/17/a-practical-use-for-logarithms/)
- [How do I prove using the definition that the logarithmic function is continuous](https://math.stackexchange.com/questions/1133697/how-do-i-prove-using-the-definition-that-the-logarithmic-function-is-continuous)
