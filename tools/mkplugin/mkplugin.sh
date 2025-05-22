#!/bin/bash
node --experimental-strip-types $(dirname $(realpath $0))/mk.ts $*
