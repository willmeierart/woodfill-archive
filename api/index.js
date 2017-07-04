const express = require('express')
const router = express.Router()
const Arena = require('../lib/arena')
require('dotenv').config()

router.get('/', (req, res, next) => {
  const arena = new Arena

  arena
    .channel(process.env.ARENA_CHANNEL_ID)
    // .channel(81641)
    .then(data =>{
      console.log(data.json)
      res.render('index', data)
    }).catch(console.log('error'))
});

module.exports = router
