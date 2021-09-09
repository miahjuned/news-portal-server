const express = require('express');
const ObjectId = require('mongodb').ObjectID;
const app = express();
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

// MongoDB  uri credential
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7tcxm.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());


const port = process.env.PORT || 5000

// MongoDB database
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const addNewsCollection = client.db("NewsPortal").collection("addNews");
  
  console.log("db erre", err)
  app.post('./addNews', (req, res) => {
      const addNews = req.body;
      console.log("data added", req.body)
      console.log("data added", res)
      addNewsCollection.insertOne(addNews)
      .then(result => {
          res.send(result.insertedCount > 0)
          console.log("data added", result.insertedCount > 0)
      })
  })
  client.close();
});


app.get('/', (req, res) => {
  res.send('Welcome to backend!')
})

app.listen(process.env.PORT || port)