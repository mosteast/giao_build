#!/usr/bin/env ts-node

import { env_set, T_opt_edit_env_set } from '@mosteast/env_helper'
import { print_verbose } from '@mosteast/print_helper'
import * as yargs from 'yargs'
import { Argv } from 'yargs'
import { start, stop } from '../dev/lib/app/lifecycle'
import { T_opt_lifecycle, T_opt_start } from '../dev/lib/docker/docker_compose'
import { set_app_mode } from '../dev/lib/docker/set_app_mode'

yargs
  .command({
    command: '$0',
    describe: 'App cli - use `--help` to see sub-command help info',
    builder(argv: Argv<T_opt_lifecycle>) {
      return argv
        .options({
          services: {
            alias: 's',
            type: 'array',
            describe: 'Container services to start: `app`',
          },
          dc_config: {
            alias: 'c',
            type: 'string',
            describe: 'Docker compose config file: `docker-compose.yml`',
          },
        })
        .command<T_opt_lifecycle>({
          command: 'start',
          describe: 'Start app',
          handler: start,
        })
        .command<T_opt_lifecycle>({
          command: 'stop',
          describe: 'Stop app and all services',
          handler: stop,
        })
        .command<T_opt_lifecycle>({
          command: 'restart',
          describe: 'Restart app',
          async handler(args) {
            print_verbose('* Restart')
            await stop()
            await start(<T_opt_start>args)
          },
        })
        .command<T_opt_edit_env_set>({
          command: 'env',
          describe: '.env file manager',
          builder<T_opt_edit_env_set>(argv) {
            return argv
              .command({
                command: 'set <key> <value>',
                describe: 'Set one in .env file',
                handler: env_set,
              })
              .command({
                command: 'set_mode <mode>',
                describe: 'Set env.app_mode',
                handler: set_app_mode,
              })
              .demandCommand()
          },
          handler() {},
        })
        .demandCommand()
    },
    handler() {},
  })
  .argv
