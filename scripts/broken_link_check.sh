set -eux

ROOT_DIR=$(pwd)

checklinks() {
  set +e
  ./scripts/bin/muffet -c 32\
  -e '#!$'\
  -e '.*github.com/geekodour/wiki/edit.*'\
  --timeout 45 \
  https://wiki.geekodour.xyz > $ROOT_DIR/static/rotlinks.txt
}

pushchanges() {
git add $ROOT_DIR/static/rotlinks.txt && git commit -m "Added rotten links" && git push origin master
}

if ! [[ "$0" =~ "scripts/broken_link_check.sh" ]]; then
	echo "must be run from repository root"
	exit 255
fi
checklinks
pushchanges


