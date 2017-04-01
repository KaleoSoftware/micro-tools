const { json } = require('micro')

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))

const respondToLivenessProbe = fn => async (req, res) => {
  if (req.method == 'GET' && req.url == '/') return { healthy: true }
  return fn(req, res)
}

const parseJSONInput = fn => async (req, res) => {
  req.json = await json(req)
  return fn(req, res)
}

module.exports = { compose, respondToLivenessProbe, parseJSONInput }
