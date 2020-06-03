#!/usr/bin/env bash

set -o errexit
set -o errtrace
set -o nounset
set -eou pipefail

pname="./make"
#bin="$PWD/node_modules/.bin"
#izPath="$PWD/packages/image-zoom"
#rmizPath="$PWD/packages/react-medium-image-zoom"

function usage {
  cat <<EOF
Usage: $pname <COMMAND>

  build                  Build the project
  clean                  Run all clean commands
  clean_pkgs             Remove build directories
  clean_lerna            Run "lerna clean -y"
  docs                   Build the example documentation
  help, -h, --help       See this help information
  init                   Initialize and build the project
  pkgs                   Build the packages
  watch                  Watch for changes and rebuild output
EOF

  return 0
}

function unknown-cmd {
  echo "$pname: Sorry! I'm not sure what to do. Please use a known option."
  echo ""
  usage
  return 1
}

#function clean {
#  clean_pkgs
#  clean_lerna
#  return 0
#}

#function clean_pkgs {
#  rm -rf $PWD/packages/*/dist/
#  return 0
#}

#function clean_lerna {
#  $bin/lerna clean -y
#  return 0
#}

#function docs {
#  return 0
#}

#function watch {
#  $bin/chokidar "packages/*/source/**/*" -c "./make pkgs"
#}

#function build_pkg {
#  local pkg="$1"
#  local simple="${2-}"

#  echo "Building $pkg"

#  echo "Compiling $pkg/tsconfig.esm.json"
#  $bin/tsc -p $pkg/tsconfig.esm.json

#  echo "Compiling $pkg/tsconfig.cjs.json"
#  $bin/tsc -p $pkg/tsconfig.cjs.json

#  echo "Compiling $pkg/tsconfig.umd.json"
#  $bin/tsc -p $pkg/tsconfig.umd.json

#  echo "Done building $pkg"

#  return 0
#}

function pkgs {
  #echo "Cleaning..."

  #clean_pkgs

  yarn workspaces foreach run build
  #build_pkg "$izPath"
  #build_pkg "$rmizPath"

  #find $PWD/packages \
  #  -maxdepth 1 \
  #  ! -path $PWD/packages \
  #  -type d \
  #  -exec /bin/bash -c 'build_pkg $0' {} \;

  return 0
}

function build {
  pkgs
  #docs
  return 0
}

#function init {
#  npm i
#  build
#  return 0
#}

# Check if no command is provided

[[ $# -lt 1 ]] && unknown-cmd

# Determine command

case "$1" in
  build         ) build;;
  #clean         ) clean;;
  #clean_pkgs    ) clean_pkgs;;
  #clean_lerna   ) clean_lerna;;
  #docs          ) docs;;
  help|-h|--help) usage;;
  #init          ) init;;
  pkgs          ) pkgs;;
  watch         ) watch;;
               *) unknown-cmd;;
esac
