#!/usr/bin/env ts-node

import { print_verbose } from '@mosteast/print_helper'
import * as yargs from 'yargs'
import { start, stop } from '../dev/lib/app/lifecycle'
import { T_opt_start } from '../dev/lib/docker/docker_compose'

const args = yargs.argv

run()

async function run() {
  print_verbose('* Restart')
  await stop()
  await start(<T_opt_start>args)
}
