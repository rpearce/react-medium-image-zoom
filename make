#!/usr/bin/env bash

set -o errexit
set -o errtrace
set -o nounset
set -eou pipefail

pname="./make"
izPath="$PWD/packages/image-zoom"
rmizPath="$PWD/packages/react-medium-image-zoom"

function usage {
  cat <<EOF
Usage: $pname <COMMAND>

  build                  Build the project
  clean                  Run all clean commands
  clean_pkgs             Remove build directories
  contrib                Use the all-contributors CLI
  dev                    Watch for changes and run the docs server
  docs                   Build the example documentation
  help, -h, --help       See this help information
  init                   Initialize and build the project
  lint                   Run the linter
  pkgs                   Build the packages
  test                   Run the tests
  watch                  Watch for changes and rebuild output
EOF

  return 0
}

function build {
  pkgs
  docs

  return 0
}

function build_pkg {
  local pkg="$1"

  echo -n "Building $(basename $pkg)... "
  #spin & SPIN_PID=$!

  #cd "$pkg"

  yarn tsc -p $pkg/tsconfig.cjs.json & CJS_PID=$!
  yarn tsc -p $pkg/tsconfig.esm.json & ESM_PID=$!
  yarn tsc -p $pkg/tsconfig.umd.json & UMD_PID=$!

  wait $CJS_PID
  wait $ESM_PID
  wait $UMD_PID

  # @TODO: kill if error before
  #kill -PIPE $SPIN_PID
  echo "Done"

  return 0
}

export -f build_pkg


function clean {
  clean_pkgs

  return 0
}

function clean_pkgs {
  echo -n "Cleaning packages... "
  #spin & SPIN_PID=$!

  rm -rf $PWD/packages/*/dist/

  # @TODO: kill if error before
  #kill -PIPE $SPIN_PID
  echo "Done"

  return 0
}

function contrib {
  yarn all-contributors --config $PWD/conf/.all-contributorsrc "$@"
}

function dev {
  echo "Starting dev environment..."

  #build
  #watch & WATCH_PID=$!
  #serve & SERVE_PID=$!

  #wait $WATCH_PID
  #wait $SERVE_PID

  return 0
}

function docs {
  echo -n "Building docs... "
  spin & SPIN_PID=$!

  #cp packages/image-zoom/dist/iife/image-zoom.* docs

  kill -PIPE $SPIN_PID
  echo "Done"

  return 0
}

function init {
  echo "Installing and linking dependencies..."

  yarn

  build

  echo "Project initialized"

  return 0
}

function lint {
  yarn eslint . -c $PWD/conf/.eslintrc.js
}

function pkgs {
  build_pkg "$izPath"
  build_pkg "$rmizPath"

  return 0
}

function spin {
  local spinner=( ⣾ ⣽ ⣻ ⢿ ⡿ ⣟ ⣯ ⣷ )

  while :; do
    for i in "${spinner[@]}"; do
      echo -ne "$i"
      echo -en "\033[1D"
      sleep 0.1
    done
  done
}

function tests {
  yarn jest $PWD/packages
}

function tests_cov {
  yarn jest $PWD/packages --coverage --coverageReporters=text-lcov | \
    yarn coveralls
}

function unknown-cmd {
  echo "$pname: Sorry! I'm not sure what to do. Please use a known option."
  echo ""
  usage

  return 1
}

function watch {
  $bin/chokidar "packages/*/source/**/*" -c "./make pkgs"
}

# Check if no command is provided

[[ $# -lt 1 ]] && unknown-cmd

# Determine command

cmd="$1"
shift

case "$cmd" in
  build         ) build;;
  clean         ) clean;;
  clean_pkgs    ) clean_pkgs;;
  contrib       ) contrib "$@";;
  dev           ) dev;;
  docs          ) docs;;
  help|-h|--help) usage;;
  init          ) init;;
  lint          ) lint;;
  pkgs          ) pkgs;;
  test          ) tests;;
  watch         ) watch;;
               *) unknown-cmd;;
esac
