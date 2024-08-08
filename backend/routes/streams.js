const express = require('express');
const router = express.Router();
const Stream = require('../models/Stream');

router.get('/', async (req, res) => {
  const streams = await Stream.find();
  res.send(streams);
});

router.post('/', async (req, res) => {
  const stream = new Stream(req.body);
  await stream.save();
  res.send(stream);
});

module.exports = router;
