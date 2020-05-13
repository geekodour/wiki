---
id: actor
title: Actor Model
sidebar_label: Actor Model
---

## Actor Model

It is a mathematical model of concurrent computation that treats **actor** as the fundamental unit of computation. Actors usually come in systems.

**What makes an Actor?**

- **Processing**: Getting something done
- **Storing**: Ability to store/ use memory
- **Communicating**: Ablity to communicate (have an address)

**What can an Actor do?**

- Create more actors.
- Send messages to actors that it knows.
- Designate how it will deal with the next message that is sent to itself.

**Example for 3rd bullet**: You have ₹5 and someone sends you ₹6 after sometime, so next time you need to do some transaction you'll be using ₹11 and not ₹5 as your balance.

> 📝 **About running the tasks concurrently**
>
> Conceptually, 1 message at a time but implementers can have concurrent implementations.
> **Synchronization** is built into the rule that one message is sent at a time.

### Future

Future is a special actor, you can create an actor for any result while the result is being computed and you can keep passing that result around or store it.

### Identity and Address

```md
identity != address
```

- There can be one **address** for a whole bunch of **actors**
- One **actor** can have multiple **addresses**

We cannot tell if there is one actor or multiple actors behind a given address. **All you can do with an address is send it a message.** The integrity of addresses is to be maintained to ensure capability.

### Communication

The communication happens directy(eg. `put`,`get`); there is no channel involved. If in case you want to implement sequencing you can create `futures` and send the sequence to the reciever actor and they later can manifest it if needed.

Messages gets delivered **at most** once. If you send 3 messages to the **same** actor, it will just execute one at a time. To have these 3 messages being executed concurrently, you need to create 3 actors and send one message to each.

### Non-determinism and Indeterminism

- **Nondeterministic**: [Nondeterministic Turing machines(NTM)](https://en.wikipedia.org/wiki/Nondeterministic_Turing_machine) have only bounded nondeterminism.
- **[Indeterminism](https://en.wikipedia.org/wiki/Unbounded_nondeterminism)**: When things are decided based on how things worked out. Hewitt tries to justify unbounded non-determinism based on the idea of [arbiters](<https://en.wikipedia.org/wiki/Arbiter_(electronics)>) as you could not tell how long it would take the arbiter to make its decision.

![](/img//indeterm.jpg)

> 📝 Arbiters
>
> Arbiters break ties. It is something you can't make out of **straight** AND/OR gates or other boolean components.
>
> - It has two inputs and two outputs. (i1,i2 and o1 and o2)
> - It takes two inputs and gives out only one output. (i1,i2 ▶️ o2)
>
> This result is of considerable practical importance, as **multiprocessor** computers would not work reliably without it. The first multiprocessor computers date from the late 1960s, predating the development of reliable arbiters.

### Programming Languages

There is an art to making programming languages for actors, very easy to screw it up. `Erlang` is probably one of the most famous languages that uses Actor model.

### Why we should not try to force consistency in our world

- We can't
- We don't know much and some of it is wrong. (schrodinger cat)

### Source

- [Hewitt, Meijer and Szyperski: The Actor Model](https://www.youtube.com/watch?v=7erJ1DV_Tlo)
- [The actor model in 10 minutes](https://www.brianstorti.com/the-actor-model/)
