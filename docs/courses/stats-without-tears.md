---
id: stats_without_tears
title: Stats Without Tears
sidebar_label: Stats Without Tears
---

> This is not an actual course, but a text on stats. I am really bad at math man, this is probably my first foray into math in years. I didn't study shit for the last 4 years. Currently [in process.](https://docs.google.com/document/d/1FH77SfRMlExZnCDwAeDbLqQc-BbJXLuK_HPF-quRh-s/edit?usp=sharing)

Read the [book online.](https://brownmath.com/swt/chap00.htm)

## Chapter 1: Statistics!

Some basic definitions, this chapter is not really math heavy but drives home the fact that if you get the samples wrong, you’re fucked. The exercises in this chapter were easy so didn’t put the effort to document that, also this book has solutions to all problems.

### Sample

It is usually a subgroup of the population, but in a census, the whole population is the sample. The sample size is usually denoted as n and the population size as N and the sample size is always a definite number.

### Statistics

#### Descriptive Statistics

Summarizing and presenting the data that was measured, A statistic is a statement of Descriptive stats and is a numerical summary of a sample.

#### Inferential Statistics

Making statements about the population based on measurements of a smaller sample. A parameter is a statement of Inferential stats and a numerical summary of a population.

### Good and bad samples

**A good sample** is a smaller group that is representative of the population, all valid samples are chosen through probability means. Following are some ways to collect samples, ordered by preference:

#### Random Samples

Random doesn’t mean unplanned; even collecting random samples needs proper planning. For this, you need a list and some way to select random subjects from the list for your sample.

#### Systematic Samples

Best explained through an example, Standing outside the grocery store all day, you survey every 40th person. That is a systematic sample with k=40.

#### Cluster Samples

This one makes a big assumption, that the individuals in each cluster are representative of the whole population. A cluster sample cannot be analyzed in all the same ways as random or systematic samples. You subdivide the population into a large number of subunits(clusters) and then construct random samples from the clusters.

#### Stratified Samples

This needs analyzing what data you’ll be working with, if you can identify subgroups(strata) that have something in common related to what you’re trying to study, you want to ensure that you have the same mix of those groups as the population. Eg. 45% Girls and 55% Boys in a school, If you’re taking samples of 400, it should be 45% x 400 and 55% x 400, each mini sample should be constructed using other random sampling methods.

#### Census

A census sample contains every member of the population.

### Quantitative and Qualitative

#### Quantitative

Numeric, sometimes it’s hard to differentiate between discrete and contd. but it’s important to identify the difference when you need to graph them

- Discrete: how many
- Contd. : how much

#### Qualitative

non-numeric

### Errors

In stats, errors are not like programing errors but are the discrepancy between your findings and reality.

#### Sampling error

These are part of the sampling process, cannot be eliminated can be minimized by increasing the sample size

#### Non-sampling error

When you mess up in collecting data/analyzing data etc.

### Variables

Variables are the question and data points are the answers. Eg. birth weight is the variable and 5Kg will be the data point. sometimes variable type is also called data type.

In either observational study or experimental study there are two variables:

- **Explanatory variables/factors**: Suspected causes
- **Response variables**: Suspected effects/results

#### Explanatory variables that make the results/response variables questionable:

- **Lurking variables**: A hidden variable that isn’t measured but affects the outcome. A careful randomized experimental study can get rid of these.

- **Confounding variables**: You know what they are, but you cannot untangle their effect from what you actually wanted. Try to rule these out if possible before experimentation.

### Gathering data

#### Observational study

A retrospective study. Lurking variables are the reason an obs study can never establish cause/causation, no matter how strong of an association do you find.

#### Experiment

Here we can manipulate the explanatory variables, each level of the assigned explanatory variable is known as a treatment. If we do have a randomized experiment, we can prove causation. Eg. Doing a study by giving your 3 children different toys, the explanatory variable is `toy`, and treatments are the different toys.

### Basics of designing experiments

#### Completely Randomized Design

Randomly assign members to the various treatment groups, this is called randomization

#### Randomized Block Design

When there is a confounding variable that you can detect, before conducting the experiment divide subjects into blocks according to that variable, then randomize within each block. This variable is called the blocking variable. i.e confounding variable became the blocking variable here.

> “Block what you can, randomize what you cannot”

#### Matched pairs

Type of randomized block design where each block contains two identical subjects without any fear of lurking variables. (Eg. twins) another special type is matching experimental results with itself (eg. delta)

#### Control groups and placebo

When doing experiments involving the placebo effect, the group that gets the placebo is called the control group

### Rounding Numbers

It was surprising to me that I am was on the wrong side when coming to rounding numbers! Most important thing is to **round in one step** and to **round in the last step of the calculation.**

- Draw a line mentally at the point where you want to round.
- If the number next to the line is 0-4, throw away everything to the right of the line.
- If the number next to the line is 5-9, raise the digit to the left by one and throw away everything to the right of the line.

Eg. `1.2|4768` ~ `1.2` but `1.2|7432` ~ `1.3`
