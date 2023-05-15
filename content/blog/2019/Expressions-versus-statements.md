---
title: Expressions vs. statements
date: "2019-06-12T17:32:32.169Z"
template: "post"
draft: false
slug: "/posts/expressions-v-statements/"
category: "JavaScript"
tags:
  - "JavaScript"
  - "Explainer"
  - "Web Development"
description: "What's the difference between an a function expression and a function statement? More broadly, how are they different everywhere else?"
---

Why is a function expression called an expression? What about it makes it expression-y? Given what I knew about expressions, it seemed to me that any time you create a function it's a statement and any time you call a function, it's an expression. Not so.

An expression is a combination of variables, constants, operators, and functions that returns a value.

A statement is a syntactic unit of meaning that denotes some action to be carried out by a program.

### Level 1

> An expression produces a value.

Identify the expressions:

```js
133/5;
let password;
33 * password;
33 + 'password';
```

```js
✅ 133/5;
🚫 let password;
✅ 33 * password;
✅ 33 + 'password';
```

Type the lines with ✅ into a REPL (the browser console, a JSBin, whatever). You'll get a value back! Boom! Expressions!

The line with 🚫 up there is a **statement**. Statements don't evaluate to anything, they just say something about the program. In the case above, they're saying "there exists a variable called `password`". In the case above, there's no value assigned to this variable, it are merely created.

Identify the statements:
```js
const username = 'blimp_parade';
let volleyball;
let ball;
'blimp_parade' / volleyball;
username / volleyball;
34 % 22
```

```js
✅ const username = 'blimp_parade'; 
✅ let volleyball; 
✅ let ball; 
🚫 'blimp_parade' / volleyball;  
🚫 username / volleyball;  
🚫 34 % 22;
```

That first one! Is confusing! Because - something's happening. We're using an operator and a variable to assign a value, and when the variable is used it will evaluate to something... we're getting really close to the definition of an expression!

> An expression is a combination of variables, constants, operators, and functions that returns a value.

But, it's a statement. We're telling the program that `username` is equal to `'blimp_parade'`. We're not asking for anything back, we're just telling.

If you stop reading here, no problem. The takeaway is that **an expression evaluates to a value, while a statement does not**.

### Level 2

What about a case like this:

```js
const rainfall = 88;
const possibleRainfall = rainfall * 15;
```

The first line is for sure a statement, we know that now. But what about the second line? We're using operators, variables, at least one value...

Still a statement! `let possibleRainfall = rainfall * 15;` itself does not evaluate to anything, **buuuuuuut** _contains_ an expression(`rainfall * 15`). 

```js
// statement
const rainfall = 88;

// also a statement! but one that contains an expression.
const possibleRainfall = rainfall * 15;
```

Identify the 💚expressions💚 and the 🔨statements🔨:

```js
const waterHeightInCm = '123233';
1+2;
waterHeightInCm*3;
let rainfall = 88;
let possibleRainfall = rainfall * 15;
let umbrella;
```

```js
🔨 const waterHeightInCm = '123233';
💚 1+2;
💚 waterHeightInCm*3;
🔨 let rainfall = 88;
🔨 let possibleRainfall = rainfall * 15;
🔨 let umbrella;
```

If you stop reading here, that's fine! The takeaway is that **statements can contain expressions**.

### Level 3

Is a function an expression or a statement? A function produces a value, usually. Right?

Very often true!

Functions are mentioned in the definition we have for expressions:

> An expression is a combination of variables, constants, operators, and **functions** that returns a value.

So it looks like a function can be part of an expression. But a function doesn't _do_ anything until we call it. Let's separate this into two questions:
1. When a function is declared, is it an expression or a statement?
2. When a function is called, is it an expression or a statement?

### When a function is declared, is it an expression or a statement?

Depends on how you write it!

This right here:
```js
function addNumbers(){
  //add those numbers somehow
}
```
Statement.

This right here:
```js
const addNumbers = function(){
  //add those numbers somehow
}
```
Expression.

WHAT! WHY?! That same syntax is a statement when we're assigning a variable!!!!

```js
const password = 'qwerty' + 1234;
```

`const password = 'qwerty' + 1234;` is a statement with an expression in it. That's basically what a function expression is:

```js 
const addNumbers = function(){
  //add those numbers somehow
}
```

As far as I can tell, the reason this is an _expression_ is because you can immediately invoke a function declared using this syntax, effectively making it an expression.

```js
const thing = (function dance(){console.log('dance')}) +3
```

```js
(function () {
   console.log('do something')
})();
```

```js
(function doSomething(){console.log('ahhsa')})
```

But immediately invoked function expressions are another post!
