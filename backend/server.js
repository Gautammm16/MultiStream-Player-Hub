const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;


mongoose.connect('mongodb://127.0.0.1:27017/video-streams', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const StreamSchema = new mongoose.Schema({
  url: String,
});

const Stream = mongoose.model('Stream', StreamSchema);

app.use(express.json());

app.get('/streams', async (req, res) => {
  const streams = await Stream.find();
  res.send(streams);
});

app.post('/streams', async (req, res) => {
  const stream = new Stream(req.body);
  await stream.save();
  res.send(stream);
});

app.delete('/streams', async (req, res) => {
  await Stream.deleteMany({});
  res.send({ message: 'All streams deleted' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
