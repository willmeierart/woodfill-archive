const express = require('express')
const router = express.Router()
const axios = require('axios')
const Arena = require('../lib/arena')
require('dotenv').config()

router.get('/', (req, res, next) => {
  const ids = []
  const masterArena = new Arena
  masterArena
    .user().then(data => {
      const channels = data.channels
      channels.forEach((channel) => {
        ids.push(channel.id)
        return ids
      })
      return ids
    }).then((ids) => {
      return Promise.all(ids.map((id) => {
        return getEm(id)
      }))

      function getEm(ind) {
        return axios.get(`https://api.are.na/v2/channels/${ind}`)
          .then(({
            data
          }) => {
            let channelObj = {}
            return newObj(data)
            function newObj(data) {
              channelObj = {
                id: data.id,
                title: data.title,
                length: data.length,
                created_at: data.created_at,
                updated_at: data.updated_at,
                added_at: data.added_at,
                kind: data.kind,
                class: data.class,
                base_class: data.base_class,
                contents: []
              }
              let stuff = data.contents
              for (let item of stuff) {
                channelObj.contents.push({
                  id: item.id,
                  title: item.title,
                  position: item.position,
                  created_at: item.created_at,
                  updated_at: item.updated_at,
                  added_at: item.added_at,
                  connected_at: item.connected_at,
                  content: item.content_html,
                  description: item.description_html,
                  source: item.source,
                  image: item.image,
                  connection_id: item.connection_id
                })
              }
              return channelObj
            }
          })
      }
    }).then((channels) => {
      let allChannels = channels.sort((a, b) => {
        let x = a.title.split('')[0]
        let y = b.title.split('')[0]
        if (x < y) return -1
        if (x > y) return 1
        return 0
      })
      allChannels.forEach((channel) => {
        channel.contents.sort((a,b) => {
          let x = a.position
          let y = b.position
          if (x > y) return -1
          if (x < y) return 1
          return 0
        })
      })
      res.render('index', {
        "channels": allChannels
      })
    })
})

module.exports = router
