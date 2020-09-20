---
id: go_lang
title: Golang
sidebar_label: Golang
---

> Love it or hate it, I've decided to make go my staple for a while.

## Notes

- [Notes on pprof](/docs/notes/study/go_lang/pprof)

## Random Guidelines

- The **name** of a variable, or a constant, should describe its purpose.
- **Comments** on variables and constants should describe their contents not their purpose.
- Name your package for what it provides, not what it contains.
- **guard clauses**; conditional blocks with assert preconditions upon entering a function. return early.
- If you assign nil to a slice and the slice will have zero len and zero cap and no longer point an underlying array.
- global variables become an invisible parameter to every function in your program! Any function that relies on the state of a global variable can be broken if another part of the program changes that variable.
- Go features first class support for concurrency with channels, and the select and go statements.
- Channels orchestrate; mutexes serialize.
- Always close channels from sending side.
- Go maps are sort of live in the heap or something ([Full details here](https://dave.cheney.net/2018/05/29/how-the-go-runtime-implements-maps-efficiently-without-generics)), so if you want to keep the pointer to the slice or other stuff you gotta do what you gotta do.

## Conversations

- `./…`: An import path is a pattern if it includes one or more "..." wildcards, each of which can match any string. Example: `x/...` matches `x` as well as `x`'s subdirectories.
- About `Context.context`: I had a [conversation on slack about `Contexts`](https://gophers.slack.com/archives/C02A8LZKT/p1588549175026200). It's not possible for a function that takes a `context.Context` and cancel it. All it could do is `newCtx, cancel := context.WithCancel(origCtx)`. In that case, when `cancel()` is called `newCtx` will be canceled, but `origCtx` will not. Additionally, when you're passing context to a some function; the original context can be used to cancel the request early. The provided context can't be cancelled by the HTTP client. `newCtx` will be canceled either when `cancel()` is called or `origCtx` is canceled, so in a manner of speaking it inherits from it. It will also have access to the same values as `origCtx` does.
- More on context: https://rodaine.com/2020/07/break-context-cancellation-chain/
- Even more: https://utcc.utoronto.ca/~cks/space/blog/programming/GoContextValueMistake

## Source

- [DC- Gophercon19](https://dave.cheney.net/practical-go/presentations/gophercon-singapore-2019.html)

## Unread posts
- [Go: Should I Use a Pointer instead of a Copy of my Struct?](https://medium.com/a-journey-with-go/go-should-i-use-a-pointer-instead-of-a-copy-of-my-struct-44b43b104963)
- https://christine.website/blog/within-go-repo-layout-2020-09-07