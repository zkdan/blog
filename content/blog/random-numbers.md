---
title: Why do we get random numbers that way in JavaScript?
date: "2023-05-10"
draft: false
slug: "/why-do-we-get-random-numbers-that-way-in-javascript/"
category: "JavaScript"
tags:
  - "Math"
  - "JavaScript"
  - "Explainer"
  - "Web Development"
description: "What exactly is each part of that random number function doing?"
---
You've definitely googled `js random number`. I know I have. This here is an explainer for me, myself, when I forget what each part of the equation does.

## Getting a random number
`Math.random()` returns a number that looks like this: `0.7212660732474856`. It's a decimal, it's long, and it's always between 0 and 1. It's [inclusive of 0 but not of 1.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive), which means that the number returned by `Math.random()` is between 0 and .9999999999999999. 

## Adding a maximum
If I want an integer, I take the returned number and multiply it by 10 or 100 or 322 - whatever I want the upper limit of my range to be. Say I want a number between 0 and 128.
```js
  Math.random() * 128
```
The largest number possible is `.9999999999999999 * 128`. So, `127.99999999999999`. The smallest possible will be `0 * 128`. So, `0`. 

## Cleaning up the number, two ways
The return from `Math.random()` looks all gnarly: `0.7212660732474856`. That number times the top of my range isn't gonna look great. It's gonna be `92.32205737567816`, for example. So I'm gonna wanna clean it up. Two ways to do that:

### `Math.ceil()` 
This function rounds a number up to the **next largest integer**. When using `Math.ceil()`, both 9.001 and 9.9 round up to 10.
  >> `Math.round()` rounds the way I was taught in school (i.e. 2.5 rounds up tp 3 and 2.3 rounds down to 2).
    
So, calling `Math.ceil()` with an argument of anything larger than zero returns 1. Calling it with an argument of any non-decimal (e.g. 3, 37288, 81239817381273980000) returns that integer (albeit in exponential notation if it's larger than 20 digits). 

`Math.ceil(Math.random())` will _almost always be 1_ except on the very, very rare occasion that `Math.random()` returns exactly 0. What is `Math.ceil()` if `Math.random()` returns `.00028311`? `.28883999`? `.998778668`?

If I want a number [between 0 and 128](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive), `Math.ceil(Math.random() * 128)` will give me that. If I want a number between 1 and 128, I can tack a 1 on to the `Math.ceil()`, and take 1 off the top of the range: `Math.ceil(Math.random() * 127) + 1`

```js 
  Math.ceil(Math.random() * 127) + 1
  // say Math.random returns .00028311
  Math.ceil(.00028311 * 127) + 1
// .00028311 * 127 = 0.035954969999999996
  Math.ceil(0.035954969999999996) + 1
// the argument is larger than 0, so Math.ceil()is 1
1+1 
```

```js
Math.ceil(Math.random() * 127) + 1
// say Math.random returns .28883999
Math.ceil(.28883999 * 127) + 1
// .28883999 * 127 = 36.68267873 
Math.ceil(36.68267873) + 1
// the closest integer, rounding up, from 36.68267873 is 37
37+1 
```

```js
Math.ceil(Math.random() * 127) + 1
// say Math.random returns .998778668
Math.ceil(.998778668 * 127) + 1
// .998778668 * 127 = 126.844890836  
Math.ceil(126.844890836 ) + 1
// the closest integer, rounding up, from 126.844890836 is 127
127+1 
```
### `Math.floor()` 
This function returns the largest integer **less than or equal to** a given number. 

Say I want a number between 0 and 128 again. So, `Math.random() * 128`. Great. I get a number like `47.56094752691706` which I can then clean up using `Math.floor()`.

```js 
  Math.ceil(Math.random() * 128)
  // say Math.random returns .00028311
  Math.floor(.00028311 * 128)
// .00028311 * 127 = 0.035954969999999996
  Math.floor(.03623808)
// rounding toward zero, Math.floor(.03623808) is 0 
```

To get a number between 1 and 128, I've got to add a 1, just like when working with `Math.ceil()`.

```js 
  Math.ceil(Math.random() * 128) + 1
  // say Math.random() returns .28883999
  Math.floor(.00028311 * 128) + 1
  // .00028311 * 128 = 36.97151872 
  Math.floor(36.97151872) + 1
// the largest integer less than 36.97151872 is 36
  36 + 1
```
```js
  Math.floor(Math.random() * 128) + 1
  // say Math.random() returns .998778668
  Math.floor(.998778668 * 128) + 1
  // .998778668 * 128 = 127.843669504 
  Math.floor(127.843669504) + 1
  // the largest integer less than 127.843669504 is 127
  127 + 1
```

## TL;DR
For a number between 0 and 128, inclusive:
`Math.ceil(Math.random() * 128)`
`Math.floor(Math.random() * 129)`

For a number between 1 and 128, inclusive:
`Math.ceil(Math.random() * 127) + 1`
`Math.floor(Math.random() * 128) + 1`

The 1 is outside the `Math.` method to account for the rare occasions that `Math.random()` returns exactly 0.