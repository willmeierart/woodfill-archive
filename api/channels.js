const express = require('express')
const router = express.Router()
const axios = require('axios')
const Arena = require('../lib/arena')

router.get('/:id', (req, res, next) => {
  const arena = new Arena
  arena
    .channel(req.params.id)
    .then(channel =>{
      isChannel(channel)
      function isChannel(channel){
        for (let item of channel.contents){
          if (item.class == 'Channel'){
            delete item.contents
            let ind = item.id
            return axios.get(`https://api.are.na/v2/channels/${ind}`)
              .then(({data}) => {
                item.contents = []
                let stuff = data.contents
                for (let subitems of stuff){
                  item.contents.push({
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

                // console.log(item.contents)
                return item
              })
              // .then((deepChannel)=>{
              //   console.log(deepChannel.contents)
              // })
          }
          console.log(channel.contents)
          return channel
        }
      }

      channel.contents.sort((a,b) => {
        let x = a.position
        let y = b.position
        if (x > y) return -1
        if (x < y) return 1
        return 0

      })
      if (channel.contents.subchannel){
          channel.contents.subchannel.contents.sort((a,b)=>{
            let x = a.position
            let y = b.position
            if (x > y) return -1
            if (x < y) return 1
            return 0
          })
      }
      // console.log(channel)
      res.render('channel', channel)
    })
    .catch(next)
});

module.exports = router
