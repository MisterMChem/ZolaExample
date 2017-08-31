// npm package helper

var web_server = require('./source/page-server/web server').default

exports = module.exports = web_server

exports.render = require('./source/page-server/render').default

exports['default'] = web_server