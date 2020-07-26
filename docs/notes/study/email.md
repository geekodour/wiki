---
id: email
title: Email
sidebar_label: Email
---

Notes on how email works.

The first step is for the `email client` to tell the `mail server` that _"Hey! I want a mail to be transmitted."_, this is primarily done through `IMAP` or `POP`(old). These protocols are designed to do things like send mail, retrive mail, organize mail into folders etc.

`Mail servers` and other message transfer agents use `SMTP` to send and receive mail messages among each other.

```
A ->(IMAP/POP)-> Gmail ->(SMTP)-> Outlook -> (IMAP/POP)->B
```

And ofcourse, `IMAP/POP/SMTP` are application layer protocols.

## TODO

- DKIM

## Links

- https://ideas.liw.fi/rethinking-email.html
- https://craphound.com/spamsolutions.txt
