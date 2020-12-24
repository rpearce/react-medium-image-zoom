#!/usr/bin/env bash

set -o errexit
set -o errtrace
set -o nounset
set -eou pipefail

pname="./make"
binsPath="$PWD/node_modules/.bin"
izPath="$PWD/packages/image-zoom"
rmizPath="$PWD/packages/react-medium-image-zoom"
docsPath="$PWD/docs"

function usage {
  cat <<EOF
Usage: $pname <COMMAND>

  build                  Build the project and documentation
  ci                     Run checks for a CI environment
  clean                  Run all clean commands
  contrib                Use the all-contributors CLI
  dev                    Watch for changes and run the docs server
  help, -h, --help       See this help information
  init                   Initialize and build the project
  lint                   Run the linter
  publish                Publish a package
  test                   Run the tests
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

function ci {
  test_pkgs
  build

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

  "$binsPath/rollup" -c "$pkg/rollup.config.js"

  echo "Done"

  return 0
}

function build_rmiz {
  local pkg="$rmizPath"

  echo -n "Building $(basename "$pkg")... "

  cd "$pkg"

  "$binsPath/tsc" -p "$pkg/tsconfig.cjs.json" & CJS_PID=$!
  "$binsPath/tsc" -p "$pkg/tsconfig.esm.json" & ESM_PID=$!
  "$binsPath/tsc" -p "$pkg/tsconfig.umd.json" & UMD_PID=$!

  wait $CJS_PID
  wait $ESM_PID
  wait $UMD_PID

  echo "Done"

  return 0
}

function build_pkgs {
  local build_env="${BUILD_ENV:-}"

  if [ "$build_env" = "iife" ]; then
    build_iz
  else
    build_iz
    #build_rmiz
  fi

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
  "$binsPath/all-contributors" --config "$PWD/conf/.all-contributorsrc" "$@"
}

function dev {
  echo "dev: Not yet implemented"

  #clearscreen
  #echo "Starting dev environment..."

  #build
  #watch & WATCH_PID=$!
  #"$binsPath/serve" docs & SERVE_PID=$!

  #wait $WATCH_PID
  #wait $SERVE_PID

  #return 0
}

function init {
  echo "Installing and linking dependencies..."

  npm i --legacy-peer-deps

  build

  echo "Project initialized"

  return 0
}

function lint {
  "$binsPath/eslint" . \
    -c "$PWD/.eslintrc.js" \
    --ignore-path "$PWD/.eslintignore" \
    "$@"
}

function publish {
  echo "publish: Not yet implemented"
  # local pkg="$1"
  # cd "$pkg"
  # lint & test then npm publish with args
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

function test_pkgs {
  "$binsPath/jest" "$PWD/packages"
}

function unknown-cmd {
  echo "$pname: Sorry! I'm not sure what to do. Please use a known option."
  echo ""
  usage

  return 1
}

function watch {
  "$binsPath/chokidar" "packages/*/source/**/*" -c "./make build"
}

# Check if no command is provided

[[ $# -lt 1 ]] && unknown-cmd

# Determine command

cmd="$1"
shift

case "$cmd" in
  build         ) build;;
  ci            ) ci;;
  clean         ) clean;;
  contrib       ) contrib "$@";;
  dev           ) dev;;
  help|-h|--help) usage;;
  init          ) init;;
  lint          ) lint "$@";;
  publish       ) publish "$@";;
  test          ) test_pkgs;;
  test_cov_ci   ) test_cov_ci;;
  watch         ) watch;;
               *) unknown-cmd;;
esac
