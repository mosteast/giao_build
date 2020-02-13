const { connection_opts } = require('../rds')

const opt = process.env.NODE_ENV === 'testing' ? connection_opts.main_test : connection_opts.main

module.exports = opt
