rot-link-check:
	./scripts/muffet -c 32 -e '#!$' -e '.*github.com/geekodour/wiki/edit.*' --timeout 30 https://wiki.itdobelikethat.org
