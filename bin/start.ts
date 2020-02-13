#!/usr/bin/env ts-node

import * as yargs from 'yargs'
import { T_opt_start } from '../dev/lib/docker/docker_compose'
import { start } from '../dev/lib/app/lifecycle'

yargs
  .command({
    command: '$0 [--build|-b] [--service|-s=list of services] [--dc_config|-c="path/to/config"]',
    builder(argv) {
      return argv
        .option('build', {
          alias: 'b',
          type: 'boolean',
          describe: 'Whether building containers before starting.',
        })
        .options('service', {
          alias: 's',
          type: 'array',
          describe: 'Container services to start.',
        })
        .options('dc_config', {
          alias: 'c',
          type: 'string',
          describe: 'Docker compose config file.',
        })
    },
    async handler(args) {
      await start(<T_opt_start>args)
    },
  })
  .argv
