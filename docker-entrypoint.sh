#!/usr/bin/env bash

pnpm runtime set node 24.18.0 -g
pnpm add -g ember-cli@6.12

exec "$@"
