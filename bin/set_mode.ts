#!/usr/bin/env ts-node

import { set_app_mode } from '../dev/lib/docker/set_app_mode'

require('yargs')
  .command({
    command: '$0 <mode>',
    describe: 'Set env `app_mode`',
    handler: set_app_mode,
  })
  .argv

