#!/usr/bin/env bash

set -o errexit
set -o errtrace
set -o nounset
set -eou pipefail

pname="./make"
izPath="$PWD/packages/image-zoom"
rmizPath="$PWD/packages/react-medium-image-zoom"
docsPath="$PWD/docs"

function usage {
  cat <<EOF
Usage: $pname <COMMAND>

  build                  Build the project and documentation
  clean                  Run all clean commands
  contrib                Use the all-contributors CLI
  dev                    Watch for changes and run the docs server
  help, -h, --help       See this help information
  init                   Initialize and build the project
  lint                   Run the linter
  test                   Run the tests
  test_cov_ci            Generate test coverage for CI
  watch                  Watch for changes and rebuild output
EOF

  return 0
}

function build {
  clean
  build_pkgs
  build_docs

  return 0
}

function build_docs {
  echo -n "Building docs... "

  cp "$izPath/dist/iife/image-zoom.js" "$docsPath"
  cp "$izPath/dist/iife/image-zoom.min.js" "$docsPath"

  echo "Done"

  return 0
}

function build_iz {
  local pkg="$izPath"

  echo -n "Building $(basename "$pkg")... "

  cd "$pkg"

  yarn rollup -c "$pkg/rollup.config.js"

  echo "Done"

  return 0
}

function build_rmiz {
  local pkg="$rmizPath"

  echo -n "Building $(basename "$pkg")... "

  cd "$pkg"

  yarn tsc -p "$pkg/tsconfig.cjs.json" & CJS_PID=$!
  yarn tsc -p "$pkg/tsconfig.esm.json" & ESM_PID=$!
  yarn tsc -p "$pkg/tsconfig.umd.json" & UMD_PID=$!

  wait $CJS_PID
  wait $ESM_PID
  wait $UMD_PID

  echo "Done"

  return 0
}

function build_pkgs {
  build_iz
  build_rmiz

  return 0
}

function clean {
  clean_docs
  clean_pkgs

  return 0
}

function clean_docs {
  echo -n "Cleaning docs... "

  rm -f "$docsPath/image-zoom.js"
  rm -f "$docsPath/image-zoom.min.js"

  echo "Done"

  return 0
}

function clean_pkgs {
  echo -n "Cleaning packages... "

  rm -rf "$PWD/packages/*/dist/"

  echo "Done"

  return 0
}

function clearscreen {
  printf '\033c'
  return 0
}

function contrib {
  yarn all-contributors --config "$PWD/conf/.all-contributorsrc" "$@"
}

function dev {
  echo "Not yet implemented"

  #clearscreen
  #echo "Starting dev environment..."

  #build
  #watch & WATCH_PID=$!
  #yarn serve docs & SERVE_PID=$!

  #wait $WATCH_PID
  #wait $SERVE_PID

  #return 0
}

function init {
  echo "Installing and linking dependencies..."

  yarn

  build

  echo "Project initialized"

  return 0
}

function lint {
  yarn eslint . \
    -c "$PWD/.eslintrc.js" \
    --ignore-path "$PWD/.eslintignore" \
    "$@"
}

#function spin {
#  #spin & SPIN_PID=$!
#  #kill -PIPE $SPIN_PID

#  local spinner=( ⣾ ⣽ ⣻ ⢿ ⡿ ⣟ ⣯ ⣷ )

#  while :; do
#    for i in "${spinner[@]}"; do
#      echo -ne "$i"
#      echo -en "\033[1D"
#      sleep 0.1
#    done
#  done
#}

function test {
  yarn jest "$PWD/packages"
}

function test_cov_ci {
  yarn jest "$PWD/packages" --coverage --coverageReporters=text-lcov | \
    yarn coveralls
}

function unknown-cmd {
  echo "$pname: Sorry! I'm not sure what to do. Please use a known option."
  echo ""
  usage

  return 1
}

function watch {
  yarn chokidar "packages/*/source/**/*" -c "./make build"
}

# Check if no command is provided

[[ $# -lt 1 ]] && unknown-cmd

# Determine command

cmd="$1"
shift

case "$cmd" in
  build         ) build;;
  clean         ) clean;;
  contrib       ) contrib "$@";;
  dev           ) dev;;
  help|-h|--help) usage;;
  init          ) init;;
  lint          ) lint "$@";;
  test          ) test;;
  test_cov_ci   ) test_cov_ci;;
  watch         ) watch;;
               *) unknown-cmd;;
esac
