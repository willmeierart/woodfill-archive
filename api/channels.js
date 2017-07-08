const express = require('express')
const router = express.Router()
const Arena = require('../lib/arena')

router.get('/:id', (req, res, next) => {
  const arena = new Arena
  arena
    .channel(req.params.id)
    .then(channel =>{
      channel.contents.sort((a,b) => {
        let x = a.position
        let y = b.position
        if (x > y) return -1
        if (x < y) return 1
        return 0
      })
      res.render('channel', channel)
    })
    .catch(next)
});

module.exports = router
