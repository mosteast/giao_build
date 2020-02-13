#!/usr/bin/env ts-node

import { env_set } from '@mosteast/env_helper'

run()

function run() {
  require('yargs')
    .command({
      command: '$0 <key> <value>',
      describe: 'Set one item in .env',
      async handler(argv) {
        await env_set(argv.key, argv.value)
      },
    })
    .argv
}
