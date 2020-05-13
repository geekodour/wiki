---
id: interrupts
title: Interrupts
sidebar_label: Interrupts
---

## Interrupt Handler/Interrupt service routine/`ISR`

Interrupt might sound like something bad/annoying but all this time that you've been typing on the keyboard and moving your mouse, it's your keyboard sending interrupts to the cpu; more like some signal that requires immediate attention.

If the interrupt is accept by the CPU, the processor responds by suspending its current activities, saving its state, and executing a function called an `ISR`. These can be initiated by either `software(synchronous interrupt)` or `hardware(async interrupt)`. Software interrupts are interesting, eg. When say `divide by zero` happened, an interrupt/exception will be sent out and the OS is supposed to handle it.

> Unlike other event handlers, interrupt handlers are expected to set interrupt flags to appropriate values as part of their core functionality.

- [A keyboard interrupt handler](http://cs.smith.edu/~nhowe/262/oldlabs/keyboard.html)
- [TLDP: Interrupt Handlers](https://www.tldp.org/LDP/lkmpg/2.4/html/x1210.html)
- [Understanding the Linux Kernel Chapter on ISR and IRQ](https://www.oreilly.com/library/view/understanding-the-linux/0596005652/ch04s06.html)

## Interrupt request/`IRQ`

A hardware [interrupt](https://en.wikipedia.org/wiki/Interrupt) request (IRQ) is an electronic signal issued by a hardware device which is external to the processor, to communicate that the device needs attention from the operating system (OS). Each device is associated with a particular IRQ signal. Processors can enable/disable IRQs by setting _interrupt masks_, there are also certain IRQs that cannot be disabled.

```
cat /proc/interrupts
```

IRQs need a Interrupt controller, previously [PIC](https://en.wikipedia.org/wiki/Programmable_interrupt_controller) and now [APIC](https://en.wikipedia.org/wiki/Advanced_Programmable_Interrupt_Controller) they kind of maintain the index of IRQs.

- [PnP](https://en.wikipedia.org/wiki/Plug_and_play)
