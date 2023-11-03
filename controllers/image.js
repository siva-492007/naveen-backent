const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'b5d4d409538f49018fde6f7c824860cb'
});

const handleApiCall = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  app.models
    // .predict(
    //   {
    //   id: "a403429f2ddf4b49b307e318f00e528b",
    //   version: "6dc7e46bc9124c5c8824be4822abe105",
    // },
    //  req.body.input)
    // .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .predict('face-detection', req.body.input)
    .then(data => {
      console.log(data)
      res.json(data);
    })
    .catch(err => {
      console.log("api call err: ")
      res.status(400).json('unable to work with API')
    })
}

const handleImage = (req, res, db) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .then(() => {
    db('users').select('entries').where('id', id)
    .then( entry => {
      res.json(entry[0].entries);
    })
    
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage,
  handleApiCall
}