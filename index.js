const express = require('express');
const ObjectId = require('mongodb').ObjectID;
const app = express();
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

// MongoDB  uri credential
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7tcxm.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri)

// const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-shard-00-00.7tcxm.mongodb.net:27017,cluster0-shard-00-01.7tcxm.mongodb.net:27017,cluster0-shard-00-02.7tcxm.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-11utgn-shard-0&authSource=admin&retryWrites=true&w=majority`;


app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());


const port = process.env.PORT || 5000

// MongoDB database
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const addNewsCollection = client.db("newsPortal").collection("newsPortalAdmin");
  
  console.log("db connected")
  console.log("db error,", err)


  // test database
  // const data = {name : "test", price:25, quenteti: 100, city:"syl"}
  // addNewsCollection.insertOne(data)
  // .then(result => {
  //   console.log("one data aded");
  // })

    app.post('/newsadd', (req, res) => {
      const newNews = req.body;
      console.log("add new img", newNews)
      addNewsCollection.insertOne(newNews)
      .then(response => {
        res.send(response.insertedCount > 0)
        console.log("data added")
      })
    })


  // app.post('/addNews', (req, res) => {
  //     const addNews = req.body;
  //     console.log("data added", addNews)
  //     addNewsCollection.insertOne(addNews)
  //     .then(result => {
  //         res.send(result.insertedCount > 0)
  //     })
  // })
  // client.close();
});


app.get('/', (req, res) => {
  res.send('Welcome to backend!')
})

app.listen(process.env.PORT || port)