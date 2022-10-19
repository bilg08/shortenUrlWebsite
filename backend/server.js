let express = require('express');
let cors = require('cors')
let rebrandlyClient = require("./rebrandly.js")

let app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.get('/:url', (req, res) => {
  let slashtag = `test-${Math.floor(Math.random() * 999999)}`;
  let url = `https://www.${req.params.url}`;

  let linkDef = {
    "title": "My first link",
    "slashtag": slashtag,
    "destination": url
  };

  let onError = (err) => {
    console.log(JSON.stringify(err))
  }

  let onLinkCreated = (link) => {
    res.status(200).json({
      shortUrl:link.shortUrl
    })
  }

  rebrandlyClient.createNewLink(linkDef, onLinkCreated, onError);
})

app.listen(8000, () => console.log(`listening 8000`))



