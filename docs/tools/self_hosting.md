---
id: self_hosting
title: Self Hosting
sidebar_label: Self Hosting
---

## Meta
- [Map of my personal data infrastructure(not mine :p)](https://beepb00p.xyz/myinfra.html)
- I will never install directly from github, promise. If i have to i'll always create AUR package and download my own shit.
- I am done with using other ppl code (subjective)
- https://swimlanes.io/
- https://news.ycombinator.com/item?id=31534316
- https://chown.me/blog/infrastructure-2020
- https://sirupsen.com/metrics
- https://perfectmediaserver.com/index.html (important)
- https://andreas.welcomes-you.com/zfs-risc-v-512mb-lichee-rv/
- https://www.casaos.io/
- https://landchad.net/
- https://cockpit-project.org/

## diagramming
- https://www.cloudcraft.co/
- https://docs.microsoft.com/en-us/azure/architecture/browse/
- https://c4model.com/
- https://icepanel.io/

## DNS/Ad Blocking
- [dnscrypt](https://dnscrypt.info/)
- [unbound usage](https://vermaden.wordpress.com/2020/11/18/unbound-dns-blacklist/)

## Aggregation
- [Tiny Tiny RSS](https://tt-rss.org/) is a free and open source web-based news feed (RSS/Atom) reader and aggregator
- [Elfeed with Tiny Tiny RSS](https://codingquark.com/emacs/2020/04/19/elfeed-protocol-ttrss.html)
- [miniflux](https://miniflux.app/): Miniflux is a minimalist and opinionated feed reader.
- [FreshRSS](https://freshrss.org/): A free, self-hostable aggregator… probably the best!
- https://xkcd.com/1179/ : Read xkcd daily. make some bot or something.

## Database
- https://pgstats.dev/

## Hosting
- Caddy : for hosting personal websites
- nginx for some other websites
- https://bridge.grumpy-troll.org/2020/07/small-mailserver-bcp/
- danbooru 
- https://blog.siddharthkannan.in/2022/06/12/goodbye-pi-hole-hello-coredns
- https://news.ycombinator.com/item?id=32037356
- Move personal projects to sr.ht maybe or maybe self host git, maybe not initially
- https://pushover.net/
- https://baserow.io/ (database)
- https://dokku.com/docs/

## Communication
- https://www.monicahq.com for contacts CRM
- https://openslo.com/
- Jitsi
- https://cryptpad.fr/
- [DKIM](https://rya.nc/dkim-privates.html)
- https://www.beeper.com/

## Auth
- pass/bitwarden/keybase/tail/yubi (security setup)
  - https://github.com/drduh/YubiKey-Guide
- https://bastian.rieck.me/blog/posts/2022/server/
- https://news.ycombinator.com/item?id=30655479
- https://goteleport.com/blog/why-sso-sucks/
- mozilla sops
- [Keycloak](https://www.keycloak.org/documentation)
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
- [PirateBox](https://piratebox.cc/goals) (discontinued): provides easy file sharing and messaging over a local area network
- [Backing up data like the adult I supposedly am](https://magnusson.io/post/backups/)
- [BorgBackup](https://www.borgbackup.org/)
- [rsync.net](https://www.rsync.net/index.html)

## Information sharing
- [BookstackApp](https://www.bookstackapp.com/): BookStack is a simple, self-hosted, easy-to-use platform for organising and storing information. ( I plan to use to store book reviews of all books)
  - https://github.com/bookwyrm-social/bookwyrm
- https://docs.hedgedoc.org/

## Networking setup
- https://brokenco.de//2021/06/06/high-density-homelab.html
- https://ninad.pundaliks.in/blog/2020/12/thrift-vpn/
  - https://shadowsocks.org/en/index.html
  - https://blog.gwlab.page/vpn-over-ssh-the-socks-proxy-8a8d7bdc7028

## Monitoring
- Prometheus&Grafana : no brainer
- https://oss.oetiker.ch/smokeping/ 
- https://www.cs.swarthmore.edu/~finney/proj/wuzzah/
- [Motion](https://motion-project.github.io/): Motion is a highly configurable program that monitors video signals from many types of cameras. 
- https://dystroy.org/rhit/
- https://paramdeo.com//blog/opting-your-website-out-of-googles-floc-network
- https://oss.oetiker.ch/smokeping/
  - https://github.com/SuperQ/smokeping_prober
- [netdata](https://github.com/netdata/netdata)

## Entertainment
- [Jellyfin](https://jellyfin.org/): Jellyfin is the volunteer-built media solution that puts you in control of your media. Stream to any device from your own server, with no strings attached. Your media, your server, your way.
- https://lidarr.audio/
- https://lobste.rs/s/n6o6ez/move_away_from_streaming_platforms_take
- Self host media wiki for family tree and family information (It should be private by default)
- https://radarr.video/#downloads-v3-linux
- [Funkwhale](https://funkwhale.audio/en_US/)
- [Replacing YouTube & Invidious](https://secluded.site/replacing-youtube-invidious/)
- nitter
- [DIY Video Hosting](https://tyler.io/diy-video-hosting/)
- https://grocy.info/
- need some server to store movies and audio books etc.
- [Moving from YouTube to PeerTube](https://battlepenguin.com/tech/moving-from-youtube-to-peertube/)

## Torrent
- [Jackett](https://github.com/Jackett/Jackett): API Support for your favorite torrent trackers 
- [Monitoring Torrents On Your Server](https://rmpr.xyz/Managing-torrents-on-your-server/)

## Freaky
- https://www.traccar.org/
- https://publish.obsidian.md/swyx/R+-+Product/Automation+Notes
- [tor node](https://hacky.solutions/blog/2020/06/06/operating-a-tor-relay.html): With tailscale you can have exit nodes.
- crypto miner for fun
