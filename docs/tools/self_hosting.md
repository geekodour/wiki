---
id: self_hosting
title: Self Hosting
sidebar_label: Self Hosting
---

## Meta
- [Map of my personal data infrastructure(not mine :p)](https://beepb00p.xyz/myinfra.html)
- I will never install directly from github, promise. If i have to i'll always create AUR package and download my own shit.
- I am done with using other ppl code (subjective)
- https://chown.me/blog/infrastructure-2020


## DNS/Ad Blocking
- https://github.com/AdguardTeam/AdGuardHome
- https://github.com/whytheplatypus/switchboard
- https://github.com/honeytrap/honeytrap
- https://github.com/octodns/octodns for managing my self hosted shit
  - https://github.com/StackExchange/dnscontrol
- [dnscrypt](https://dnscrypt.info/)
  - [dnscrypt-proxy](https://github.com/DNSCrypt/dnscrypt-proxy)
- [unbound usage](https://vermaden.wordpress.com/2020/11/18/unbound-dns-blacklist/)
- https://github.com/safing/portmaster

## Aggregation
- [huginn](https://github.com/huginn/huginn): hackable version of IFTTT or Zapier on your own server
  - https://github.com/muesli/beehive there's the other ruby thing aswell
- [RSSHub](https://github.com/DIYgod/RSSHub): RSSHub is an open source, easy to use, and extensible RSS feed generator. It's capable of generating RSS feeds from pretty much everything.
- [Tiny Tiny RSS](https://tt-rss.org/) is a free and open source web-based news feed (RSS/Atom) reader and aggregator
    - [Elfeed with Tiny Tiny RSS](https://codingquark.com/emacs/2020/04/19/elfeed-protocol-ttrss.html)
- [miniflux](https://miniflux.app/): Miniflux is a minimalist and opinionated feed reader.
- [FreshRSS](https://freshrss.org/): A free, self-hostable aggregator… probably the best!
- [tomnomnom/waybackurls](https://github.com/tomnomnom/waybackurls)
- https://xkcd.com/1179/ : Read xkcd daily. make some bot or something.

## Hosting
- Caddy : for hosting personal websites
- https://github.com/pulumi/pulumi small shit apps
- https://github.com/groundnuty/k8s-wait-for
- Move personal projects to sr.ht maybe
- https://github.com/hashicorp/nomad this prolly will be a good idea
- https://dokku.com/docs/
- https://github.com/TwinProduction/gatus
- https://github.com/gotify/server
- https://baserow.io/ (database)

## Communication
- [oragono](https://github.com/oragono/oragono): A modern IRC server (daemon/ircd) written in Go. 
- https://github.com/knadh/listmonk
- https://github.com/ndbeals/keep-exporter
- https://github.com/PrivateBin/PrivateBin
- https://www.monicahq.com for contacts CRM
- https://openslo.com/
- [tehlounge](https://github.com/thelounge/thelounge): Modern, responsive, cross-platform, self-hosted web IRC client 
- https://github.com/mattermost/focalboard
- [thoughts](https://github.com/thwidge/thoughts) : I want to use something similar to thoughts that i'd probably end up building myself
- https://github.com/matrix-org/dendrite
- Jitsi
- https://cryptpad.fr/
- [MailInABox](https://github.com/mail-in-a-box/mailinabox)
    - [DKIM](https://rya.nc/dkim-privates.html)
- [foxcpp/maddy](https://github.com/foxcpp/maddy): Composable all-in-one mail server.
- [matterbridge](https://github.com/42wim/matterbridge): bridge between mattermost, IRC, gitter, xmpp, slack, discord, telegram, rocketchat, twitch, ssh-chat, zulip, whatsapp, keybase, matrix, microsoft teams, nextcloud, mumble, vk and more with REST API (mattermost not required!) 
- https://www.beeper.com/
## Auth
- [Glauth](https://github.com/glauth/glauth): A lightweight LDAP server for development, home use, or CI 
- https://github.com/pomerium/pomerium
- pass/bitwarden/keybase/tail/yubi (security setup)
- https://github.com/appvia/krane
- https://github.com/gravitational/teleport
- https://github.com/pglombardo/PasswordPusher
- https://github.com/ory/hydra
- https://github.com/dani-garcia/vaultwarden
- [ovh/the-bastion](https://github.com/ovh/the-bastion) Authentication, authorization, traceability and auditability for SSH accesses. 
- https://github.com/base2Services/bastion-cli
- https://github.com/gravitational/teleport nice
- https://github.com/buzzfeed/sso
- https://github.com/emre/storm: Manage your SSH like a boss. 
- mozilla sops
- https://github.com/ory/keto
- [Keycloak](https://www.keycloak.org/documentation)
- https://github.com/yrutschle/sslh
- https://github.com/skeeto/endlessh ssh tarpit
- https://www.v2ray.com/en/welcome/workflow.html PROXY
- [smallstep/certificates](https://github.com/smallstep/certificates) Open-Source Certificate Authority & PKI Toolkit
  - [step-ssh-example](https://github.com/smallstep/step-ssh-example)
  - [How often should I rotate my ssh keys?](https://tailscale.com/blog/rotate-ssh-keys/)
  - [SSH configuration: ssh_config](https://goteleport.com/blog/ssh-config/)
  - [mkcert](https://github.com/FiloSottile/mkcert) :  A simple zero-config tool to make locally trusted development certificates with any names you'd like. 
  - [Build a Tiny Certificate Authority For Your Homelab](https://smallstep.com/blog/build-a-tiny-ca-with-raspberry-pi-yubikey/) : Think we can just use mkcert here
  - [A visual guide to SSH tunnels](https://robotmoon.com/ssh-tunnels/)
  - [A fast TCP/UDP tunnel over HTTP](https://github.com/jpillora/chisel)

## Data Storage/Sharing
- [Perkeep](https://perkeep.org/): A set of open source formats, protocols, and software for modeling, storing, searching, sharing and synchronizing data in the post-PC era.
- https://github.com/filebrowser/filebrowser
- restic
- [PirateBox](https://piratebox.cc/goals) (discontinued): provides easy file sharing and messaging over a local area network
- [Backing up data like the adult I supposedly am](https://magnusson.io/post/backups/)
- [rclone](https://github.com/rclone/rclone): "rsync for cloud storage" - Google Drive, S3, Dropbox, Backblaze B2, One Drive, Swift, Hubic, Wasabi, Google Cloud Storage, Yandex Files 
- https://github.com/restic/others
- [BorgBackup](https://www.borgbackup.org/) and [rsync.net](https://www.rsync.net/index.html)
- https://github.com/andrewchambers/bupstash
- https://github.com/mickael-kerjean/filestash

## Information sharing
- [BookstackApp](https://www.bookstackapp.com/): BookStack is a simple, self-hosted, easy-to-use platform for organising and storing information. ( I plan to use to store book reviews of all books)
  - https://github.com/bookwyrm-social/bookwyrm
- [docspell](https://github.com/eikek/docspell): Assist in organizing your piles of documents, resulting from scanners, e-mails and other sources with miminal effort. 
- [HedgeDoc](https://docs.hedgedoc.org/): HedgeDoc lets you create real-time collaborative markdown notes.
- https://github.com/excalidraw/excalidraw
- https://github.com/calendso/calendso
- https://github.com/zhenghaoz/gorse
- https://github.com/rykov/paperboy
- https://github.com/backstage/backstage
- [photoprism/photoprism](https://github.com/photoprism/photoprism): Personal Photo Management powered by Go and Google TensorFlow 
- [athens](https://github.com/athensresearch/athens)
- https://github.com/foxcpp/maddy
- [Stork Static Site search](https://github.com/jameslittle230/stork): Impossibly fast web search, made for static sites. 
## Networking setup
- [Tailscale](https://github.com/tailscale/tailscale)
- https://brokenco.de//2021/06/06/high-density-homelab.html
- https://github.com/pirate/wireguard-docs (VPN) for experimenting we can probably run tailscale and wireguard both, This is really good resource
- https://github.com/hyprspace/hyprspace
- https://github.com/thatmattlove/hyperglass

## Monitoring
- Prometheus&Grafana : no brainer
- https://github.com/samber/awesome-prometheus-alerts
- https://github.com/honeycombio/refinery
- https://github.com/monitoringsucks/metrics-catalog
- [Motion](https://motion-project.github.io/): Motion is a highly configurable program that monitors video signals from many types of cameras. 
- https://github.com/ossec/ossec-hids
- https://github.com/slok/sloth
- https://github.com/containrrr/watchtower
- https://dystroy.org/rhit/
- https://github.com/testground/testground
- https://paramdeo.com//blog/opting-your-website-out-of-googles-floc-network
- https://github.com/coinbase/salus
- https://oss.oetiker.ch/smokeping/
  - https://github.com/SuperQ/smokeping_prober
- https://github.com/netdata/netdata
- https://github.com/pyroscope-io/pyroscope need this for all applications
- https://github.com/milesmcc/shynet
- [netdata](https://github.com/netdata/netdata)
- https://github.com/prymitive/karma

## Archiving
- [heritrix3](https://github.com/internetarchive/heritrix3)
- [colly](https://github.com/gocolly/colly)
- https://github.com/ArchiveBox/ArchiveBox
- https://github.com/i5ik/22120
- https://github.com/geph-official/geph4
- https://github.com/uriel1998/muna
- https://github.com/pentacent/keila
- https://github.com/simon987/awesome-datahoarding

## Entertainment
- [Jellyfin](https://jellyfin.org/): Jellyfin is the volunteer-built media solution that puts you in control of your media. Stream to any device from your own server, with no strings attached. Your media, your server, your way.
- https://lidarr.audio/
- Self host media wiki for family tree and family information (It should be private by default)
- https://github.com/pixelfed/pixelfed most importantly it does not have stories
- https://radarr.video/#downloads-v3-linux
- [Funkwhale](https://funkwhale.audio/en_US/)
- [Replacing YouTube & Invidious](https://secluded.site/replacing-youtube-invidious/)
- [DIY Video Hosting](https://tyler.io/diy-video-hosting/)
- https://grocy.info/
- need some server to store movies and audio books etc.
- [Moving from YouTube to PeerTube](https://battlepenguin.com/tech/moving-from-youtube-to-peertube/)
## Torrent
- [Jackett](https://github.com/Jackett/Jackett): API Support for your favorite torrent trackers 
- https://github.com/horahoradev/horahora
- https://github.com/varbhat/exatorrent
- [Monitoring Torrents On Your Server](https://rmpr.xyz/Managing-torrents-on-your-server/)

## Freaky
- https://github.com/home-assistant/core
- https://www.traccar.org/
- https://github.com/privacybot-berkeley/privacybot
- [tor node](https://hacky.solutions/blog/2020/06/06/operating-a-tor-relay.html): With tailscale you can have exit nodes.
- crypto miner for fun
- https://github.com/tonarino/innernet

## Others
- https://github.com/MayaPosch/NymphCast/
- https://github.com/rshipp/awesome-malware-analysis
- https://github.com/grafana/k6
- https://github.com/nerab/dropcaster