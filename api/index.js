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
                if (item.class == 'Channel'){
                  let ind = item.id
                  return axios.get(`https://api.are.na/v2/channels/${ind}`)
                    .then(({data}) => {
                      // console.log(data)
                      let subdata = data
                      let subchannelObj = {
                        id: subdata.id,
                        title: subdata.title,
                        length: subdata.length,
                        created_at: subdata.created_at,
                        updated_at: subdata.updated_at,
                        added_at: subdata.added_at,
                        kind: subdata.kind,
                        class: subdata.class,
                        base_class: subdata.base_class,
                        contents: []
                      }
                      let subStuff = subdata.contents
                      for (let subitems of subStuff){
                        subchannelObj.contents.push({
                          id: subitems.id,
                          title: subitems.title,
                          created_at: subitems.created_at,
                          updated_at: subitems.updated_at,
                          added_at: subitems.added_at,
                          connected_at: subitems.connected_at,
                          content: subitems.content_html,
                          description: subitems.description_html,
                          source: subitems.source,
                          image: subitems.image,
                          connection_id: subitems.connection_id,
                          position: subitems.position
                        })
                      }
                      delete channelObj.image
                      channelObj.subchannel = subchannelObj
                      console.log(channelObj)
                      return channelObj
                    })

                }else{
                  channelObj.contents.push({
                    id: item.id,
                    title: item.title,
                    created_at: item.created_at,
                    updated_at: item.updated_at,
                    added_at: item.added_at,
                    connected_at: item.connected_at,
                    content: item.content_html,
                    description: item.description_html,
                    source: item.source,
                    image: item.image,
                    connection_id: item.connection_id,
                    position: item.position
                  })
                }
              }
              return channelObj
            }
          })
      }
    }).then((channels) => {
      // console.log(channels)
      let allChannels = channels.sort((a, b) => {
        let x = a.title.split('')[0]
        let y = b.title.split('')[0]
        if (x < y) return -1
        if (x > y) return 1
        return 0
      })
      allChannels.forEach((channel) => {
        console.log(channel.title)
        channel.contents.sort((a,b) => {
          let x = a.connection_id
          let y = b.connection_id
          // console.log(x, y)
          if (x > y) return 1
          if (x < y) return -1
          return 0
        })

      })
      // res.json(channels)
      // allChannels.
      // console.log(allChannels)
      res.render('index', {
        "channels": allChannels
      })
    })
})





  // function contentsObj(item) {
  //   channelObj.contents.push({
  //     id: item.id,
  //     title: item.title,
  //     created_at: item.created_at,
  //     updated_at: item.updated_at,
  //     added_at: item.added_at,
  //     connected_at: item.connected_at,
  //     content: item.content_html,
  //     description: item.description_html,
  //     source: item.source,
  //     image: item.image,
  //     connection_id: item.connection_id,
  //     position: item.position
  //   })
  // }
  // let stuff = data.contents
  // for (let item of stuff) {
  //   if (item.class == 'Channel') {
  //     let indiv = item.id
  //     return axios.get(`https://api.are.na/v2/channels/${indiv}`)
  //       .then(({
  //         data
  //       }) => {
  //         console.log(data)
  //         let deepDataChannelObj = newObj(data)
  //         channelObj.contents.push({
  //           subchannel: deepDataChannelObj
  //         })
  //       })
  //   } else {
  //     contentsObj(item)

module.exports = router
