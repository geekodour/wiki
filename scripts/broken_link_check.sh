set -eux

ROOT_DIR=../

checklinks() {
  set +e
  ./bin/muffet -c 32\
  -e '#!$'\
  -e '.*github.com/geekodour/wiki/edit.*'\
  --timeout 45 \
  https://wiki.geekodour.xyz > $ROOT_DIR/static/rotlinks.txt
}

pushchanges() {
git add $ROOT_DIR/static/rotlinks.txt && git commit -m "Added rotten links" && git push origin master
}

checklinks
pushchanges
