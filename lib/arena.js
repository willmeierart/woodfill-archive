const axios = require('axios')

const URL_BASE = 'https://api.are.na/v2'

module.exports = class Arena {
  url(path) {
    return [URL_BASE, path].join('/')
  }

  channel(id) {
    return axios.get(this.url(`channels/${id}`))
      .then(({ data }) => data)
  }

  block(id) {
    return axios.get(this.url(`blocks/${id}`))
      .then(({ data }) => data)
  }
}
