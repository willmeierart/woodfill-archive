const express = require('express')
const router = express.Router()
const axios = require('axios')
const Arena = require('../lib/arena')

router.get('/:id', (req, res, next) => {
  const arena = new Arena
  arena
    .channel(req.params.id)
    .then(channel => {
      return channel
    }).then((channel) => {
      function sortEm(channel) {
        return channel.sort((a, b) => {
          let x = a.position
          let y = b.position
          if (x > y) return -1
          if (x < y) return 1
          return 0
        })
      }
      function isChannel(item) {
        if (item.class == 'Channel') {
          return axios.get(`https://api.are.na/v2/channels/${item.id}`)
            .then(({
              data
            }) => {
              let channelObj = {}
              return newObj(data)
              function newObj(data){
                channelObj = {
                  channelStatus:true,
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
                for (let subitems of data.contents) {
                  // console.log(subitems)
                  channelObj.contents.push({
                    id: subitems.id,
                    title: subitems.title,
                    position: subitems.position,
                    created_at: subitems.created_at,
                    updated_at: subitems.updated_at,
                    added_at: subitems.added_at,
                    connected_at: subitems.connected_at,
                    content: subitems.content_html,
                    description: subitems.description_html,
                    source: subitems.source,
                    image: subitems.image,
                    connection_id: subitems.connection_id
                  })
                }
                sortEm(channelObj.contents)
                return channelObj
              }
            })
        } else {
          return item
        }
      }
      function wholeShabang(channel){
        sortEm(channel.contents)
        for (let item of channel.contents) {
          isChannel(item)
        }
        // console.log(channel)
        // res.render('channel', channel)
        console.log(channel)
        return channel
      }
      return wholeShabang(channel)
    })
    .then((channel) => {

      res.render('channel', channel)
    })
    .catch(next)
})

module.exports = router
