const axios = require('axios')

const API_BASE = 'https://api.are.na/v2'

module.exports = class Arena {
  url(path) {
    return [API_BASE, path].join('/')
  }

  user(){
    return axios.get(this.url(`user/woodfill-archive/search?subject=channels&per=100`))
    .then(({data})=>data)
  }

  channel(id) {
    return axios.get(this.url(`channels/${id}&per=100`))
      .then(({ data }) => data)
  }

  block(id) {
    return axios.get(this.url(`blocks/${id}&per=100`))
      .then(({ data }) => data)
  }
}
