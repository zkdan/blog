---
title: Everything is a file
date: "2021-04-11T09:32:32.169Z"
draft: false
slug: "/everything-is-a-file/"
category: "JavaScript"
tags:
  - "Explainer"
  - "Hardware"
description: "What's happening when I replace an old application with a new one?"
---
[The Big Picture](https://www.youtube.com/watch?v=H6s4gAiaBxk) is the title track on a The Chenille Sisters tape I had as a child. It has a structure similar to the Mother Goose nursery rhyme [The House That Jack Built](https://www.poetrynook.com/poem/house-jack-built) and the folk song [Hole in the Bottom of the Sea](https://www.youtube.com/watch?v=Z6vAOxgSxes), where each line repeats the previous lines. This kind of song structure is appropriately called a culminative. This is good for kids, because it's good for learning.

Anytime I learn anything related to computers or the Internet, I feel like I am writing another line of the Big Picture-style Internet song in my brain.

## What does it mean to replace an application
A question struck me the other day when I was updating VSCode. I downloaded the update into some not-the-Applicatons-folder and wanted to move it into the Applications folder. A modal popped up asking if I wanted to replace the application I currently had in the Applications folder with the icon I was dragging from the not-the-Applications-folder. I said yes, but then I thought: what did I actually just do? What does it mean to replace an application?

My mental model of applications is of a CD ROM box from the 90's: a rectangular prism that magics into one's computer. Applications, to me, are a single unit represented by the icon. Sometimes I'll have two of the icon in different places on my computer and when I go to open it, I'm not sure which one I'm opening, or if they're different, or what.

I've saved a file over another file (`final_edited_v2_FINAL.pdf`) but applications are bigger and assumedly have some stuff in there I'm not familiar with and don't know if I should be touching. `.exe` files? I don't know. There's stuff I never notice until I've shown hidden files and I'm button mashing my way through some attempt at file recovery from a hard drive and have just `-rm`'d something maybe I should have kept.

Here is the long answer to this question:

## What is an operating system
An operating system is a set of files stored on a computing device (e.g. laptop, desktop, phone, car GPS screen thing -- anything that "has a computer in it") that manage low-level things like how much memory to allocate to which application, scheduling and running tasks and background applications, and taking the software files out of the 90's box and making them into your installation of Oregon Trail.

Macintosh computers use macOS (macintosh operating system). Versions of macOS have different names in two categories, big cats (familiar ones may be Leopard, Snow Leopard, Lion, Mountain Lion) and places in California (Sierra, Catalina, Yosemite, El Capitan, Big Sur). They're slowly moving their naming conventions from the excruciatingly literal to the ambient, which is how children evolve from naming their dogs things like Blackie to things like Rex. The basis of each version of macOS is an older versions of macOS and the basis for the oldest version of macOS is Unix. 

## What is Unix
Unix is a piece[*]() of software written in the C programming language that was developed at Bell Labs in the 70's. Because early computer culture was four dudes at different universities smoking indoors and sending each other typewritten letters, Unix was soon licensed by and built upon by many companies and schools (including Microsoft, IBM, and University of California - Berkley). In order to modify the basic Unix code, that is, in order to allow the operating system to do more or different stuff, a person adds to or modifies the C code files that comprise Unix. 

In Unix operating systems, [everything is a file.](https://yarchive.net/comp/linux/everything_is_file.html) In a newsgroup discussion from 2002, Torvalds said _"\[t\]he whole point with 'everything is a file' is \[...\] that you can use common tools to operate on different things."_ 

So, Unix is an operating system

### What is a kernel
One set of files a person can modify is called a `kernel` (yes, it's a popcorn reference). The kernel is one of the base parts of an operating system, right there at the heart. _"In the Unix model, the operating system consists of two parts: first, the huge collection of utility programs that drive most operations; second, the kernel that runs the programs."_[3](https://en.wikipedia.org/wiki/Kernel_(operating_system)#Unix) [4](https://web.archive.org/web/20161004051725/http://www.unix.org/what_is_unix/single_unix_specification.html)

> Linux is a kernel for Unix that was originated by [Linus Torvalds](https://en.wikipedia.org/wiki/Linus_Torvalds) (hence the Lin although, apocryphally, he didn't name it that himself) and is now maintained by thousands of developers.

So, Unix is an operating system
that contains a kernel 
that runs a program 

### What is a file system
A file is a collection of bytes. A byte is a unit of information. 

"Some file systems accept data for storage as a stream of bytes which are collected and stored in a manner efficient for the media."[0](https://en.wikipedia.org/wiki/File_system#Types_of_file_systems)

There are many ways to organize this information (i.e. there are many different kinds of file systems). Unix uses a byte- or stream-oriented file system where information is stored in streams of bytes. Its benefit is that it is more flexible than, say, a record-oriented file system. A record seems to be _a series of related data fields, such as the name, address, identification number and salary of a single employee, in which each field is encoded and mapped to a contiguous string of bytes.'[2](https://en.wikipedia.org/wiki/Distributed_Data_Management_Architecture#Record-oriented_files)_ 

I'm not super clear on this but maybe a way to think about it is array v. object in JavaScript. A record-oriented file system seems to be less flexible than a byte-oriented system but they both do essentially the same thing (store information).

> * Today, there are many operating systems that can be called Unix (and many that are called Unix-like). Since the actual code can be modified everywhere it's used (and theorhetically to the point where it does not resemble the original Unix files anymore), Unix now refers to [a set of standards that drove the creation of the original Unix, including the idea that "everything is a file"](https://en.wikipedia.org/wiki/Unix_architecture#Features)[1](https://unix.org/version4/overview.html). The UNIX spec website (run by X/Open Company) says: _"With the Single UNIX Specification, there is now a single, open, consensus specification that defines a product. There is also a mark, or brand, that is used to identify those products that conform to the Single UNIX specification."_[2](https://unix.org/what_is_unix/single_unix_specification.html#history)

So, Unix is an operating system
that contains a kernel 
that runs a program 
that creates/defines a file system 
that organizes all the data I have on my computer (applications, among other things)

### What is an application
 When I download the VSCode zip file from the internet, I double click, and the kernel tells the operating system to extract the files. During this extraction, the operating system probably reads a file inside the zip that says Here's the icon to use, if you're using icons. So the icon Visual Studio Code provides becomes the symbol for the folder of files that, when run (by a process that the kernel directs) displays my VSCode. 
 
 `Visual Studio Code.app` you can right-click _Show Package Contents_ and your Finder will show you the folder called `Contents` that holds all the files that work together to create this application. 

To me, this explains the whole dragging icon thing. 

## Wait okay what

So, what I took away from this is that operating systems are collections of files just like everything on a computer. I've changed my mental model of an application from a glossy cardboard box to a bunch of files with a Scooby Doo villain mask on.

Here is the poem:

```
My Mac computer has an operating system based on Unix
which is an operating system
that contains a kernel 
that runs a program 
that creates/defines a file system 
that organizes all the data I have on my computer 
some of which is symbolized by an icon
that can be replaced like any other file by dragging
because everything is a file
```
