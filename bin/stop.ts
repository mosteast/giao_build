#!/usr/bin/env ts-node
import { stop } from '../dev/lib/app/lifecycle'
import * as yargs from 'yargs'

yargs.command({
  command: '$0',
  async handler() {
    await stop()
  },
}).argv
