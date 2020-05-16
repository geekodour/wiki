---
id: exponents
title: Notes on Exponents
sidebar_label: Exponents
---

## What is it really?

The "repeated multiplication" definition of an exponent doesn't really work by itself, just like "repeated addition" doesn't really work for multiplication. (How do you add something half a time?)

### Rational Numbers

> What is the relation between $64^{\frac{1}{2}}$ and $\sqrt{64}$, why are they equal?

$$\implies (64^{\frac{1}{2}})(64^{\frac{1}{2}})=64^{\frac{1}{2}+\frac{1}{2}}=64 (\because x^{a+b}=(x^a)(x^b))$$

$$\implies 64^{\frac{1}{2}}$$ is a number that's multplied by itself is 64. So it must be $8$

> What about $243^{\frac{1}{5}}$?

$$\implies (243^{\frac{1}{5}})(243^{\frac{1}{5}})(243^{\frac{1}{5}})(243^{\frac{1}{5}})(243^{\frac{1}{5}})=243^{\frac{1}{5}+\frac{1}{5}+\frac{1}{5}+\frac{1}{5}+\frac{1}{5}}=243$$

$$\implies 243^{\frac{1}{5}}$$ must then be the fifth root of 243, which is 3.

> What about $10^{\frac{-69}{100}}$?

Since, $10^{\frac{-69}{100}+\frac{69}{100}}=10^0=1=(10^\frac{-69}{100})(10^\frac{69}{100})\implies 10^\frac{-69}{100} = \frac{1}{10^\frac{69}{100}}$

$\implies \frac{1}{10^\frac{69}{100}}=\frac{1}{\sqrt[100]{10^{69}}}=\frac{1}{(\sqrt[100]{10})^{69}}$

> What about $(7^0)$?

$\implies (7^0)(7^3)=7^{0+3}=7^3$, which says that $7^0$ must be 1. But $0^0$ is undefined.

> There are very few rational numbers that we can take n-th roots of and still get a rational number back, so we invent new numbers.

### Irrational Numbers

We define them to make $a^x$ continuous. If we have $6\pi$, we want it to be between $6^3$ and $6^4$ and so on.

## Inverses

The word "inverse" does not just mean "opposite," and it certainly does not mean "complement."

- $10^x$ inverse to $log_{10}(y)$
- $x^{10}$ inverse to $\sqrt[10]{y}$

Euler laid the foundation for the modern introduction of natural logarithm as the inverse function for the natural exponential function, f(x) = ex.

> Rewatch 3blue1brown live on Log

## Powers vs Exponent

There is some confusion if `power` is the same as `exponent`. For this let's look into the [**Exponentiation Operation**](https://en.wikipedia.org/wiki/Exponentiation)

> rewrite
>
> The functions y = x2 and y = ex both share a common property for all x > 0: they are both increasing at an increasing rate. In calculus, we would say that their first derivative is positive (that is, they both have growth) and that their second derivative is positive (that is, their growth is increasing and their graphs are considered concave up). Informally, people might call this exponential growth in order to distinguish it from a case where we have diminishing returns (where the function still grows, but at a decreasing rate). For this second type of function, think of something like y = arctan(x), where the curve is increasing, but levels off to be nearly horizontal.
>
> More formally, exponential growth refers to a special type of concave up function. It is defined as any function whose growth rate is proportional to how big it already is. In symbols, f(x) is exponential iff f'(x) = k \* f(x) for some constant k > 0.
>
> https://www.reddit.com/r/math/comments/3xa7g1/when_people_say_the_growth_was_exponential_do/cy2v713/

## Links

- [Exponential Function](https://en.wikipedia.org/wiki/Exponential_function)
- [e](<https://en.wikipedia.org/wiki/E_(mathematical_constant)>)
- [/r/learnmath question](https://www.reddit.com/r/learnmath/comments/6sa837/ive_never_really_questioned_exponents_until_now/)
- [Can you raise a number to an irrational exponent?](https://math.stackexchange.com/questions/55068/can-you-raise-a-number-to-an-irrational-exponent)
- [Roots and Radicals](https://saylordotorg.github.io/text_intermediate-algebra/s08-01-roots-and-radicals.html)
- [What Do Fractional Exponents Mean?](https://medium.com/i-math/what-do-fractional-exponents-mean-1bb9bd2fa9a8)
- [Cubic root of negative numbers](https://math.stackexchange.com/questions/25528/cubic-root-of-negative-numbers)
- [5.1 Roots and Radicals](https://saylordotorg.github.io/text_intermediate-algebra/s08-01-roots-and-radicals.html)
- [Graphs of Exponential and Logarithmic Functions](https://courses.lumenlearning.com/boundless-algebra/chapter/graphs-of-exponential-and-logarithmic-functions/)
- [1.9: Limit of Exponential Functions and Logarithmic Functions](https://math.libretexts.org/Courses/Mount_Royal_University/MATH_1200%3A_Calculus_for_Scientists_I/1%3A_Limit__and_Continuity_of_Functions/1.9%3A_Limit_of_Exponential_Functions_and_Logarithmic_Functions#Limit_laws)
