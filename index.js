const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
require('dotenv').config()


const app = express();
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());
/************************ MongoDB  uri credential *************************/
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7tcxm.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log('database connected' , uri)
let client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


/************************ 
    Routes -- Get method 
*************************/

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to News Portal Backend')
})



// Get all News
app.get('/allnews', (req, res) => {
  client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(conErr => {
    const allNewsCollection = client.db("newsPortal").collection("newsPortalAdmin");
    allNewsCollection.find().toArray((err, documents) => {
      err ? res.status(500).send(err) : res.send(documents)
    })
  })
  client.close();
})


// Get all Admin
app.get('/alladmin' ,(req, res) => {
  client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(conErr => {
    console.log("all adnmin err", conErr)
    const adminCollection = client.db("newsPortal").collection("Admin");
    adminCollection.find().toArray((err, documents) => {
      err ? res.status(500).send(err) : res.send(documents)
    })
  })
  client.close();
})



// Get all User
app.get('/users', (req, res) => {
  client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(conErr => {
    
    const userCollection = client.db("newsPortal").collection("user");
    userCollection.find().toArray((err, documents) => {
      err ? res.status(500).send(err) : res.send(documents)
    })
  })
  client.close();
})


/************************ 
    Routes -- Post method 
*************************/
app.post('/newsadd' , (req , res) => {
  const data = req.body;
  console.log("add new news data", data);
  client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(conErr => {
    console.log("db error,", conErr)  
    const newNewsCollection = client.db("newsPortal").collection("newsPortalAdmin");
    newNewsCollection.insertOne(data, (err, result) => {
      err ? res.status(500).send({message : err}) : res.send(result.ops[0].insertedCount > 0)
      console.log("db data add error,", err) 
    })
  })
  client.close();
})




app.post('/loginuser', (req, res) => {
  const loginUser = req.body;
  console.log("login user data", loginUser);
  client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(conErr => {
    console.log("login user connent err", conErr)
    const userCollection = client.db("newsPortal").collection("user");
    userCollection.insertOne(loginUser, (err, result) => {
      err ? res.status(500).send({message: err}) : res.send(result)
    })

  })
  client.close();

})



app.post('/newadmin', (req, res) => {
  const admin = req.body;
  console.log("login user data", admin);
  client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(conErr => {
    console.log("login user connent err", conErr)
    const adminCollection = client.db("newsPortal").collection("Admin");
    adminCollection.insertOne(admin, (err, result) => {
      err ? res.status(500).send({message: err}) : res.send(result)
    })

  })
  client.close();

})



// app.post('/newadmin', (req, res) => {
//   const data = req.body;
//   console.log("add newAdmin data", data);
//   const email = req.body.email;
//   console.log('email', email)
//   console
//   client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//   client.connect(conErr => {
//     console.log("add new data arr", conErr);
//     const adminCollection = client.db("newsPortal").collection("Admin");
//     adminCollection.find({adminEmail: email}).toArray((err, admin) => {
//       if (admin.length == 0) {
//         res.send("You are already an admin", admin)
//       } else {
//         adminCollection.insertOne(data, (err, result) => {
//           err ? res.status(500).send({message: err}) : res.send(result.insertedCount > 0)
//           console.log("db data add error,", err) 
//         })        
//       }
//     })
//   })
//   client.close();

// })




// // MongoDB database
// client.connect(err => {
//   const addNewsCollection = client.db("newsPortal").collection("newsPortalAdmin");
//   const adminCollection = client.db("newsPortal").collection("Admin");
//   const userCollection = client.db("newsPortal").collection("user");
  
//   console.log("db connected")
//   console.log("db error,", err)

//     app.post('/newsadd', (req, res) => {
//       const newNews = req.body;
//       console.log("add new img", newNews)
//       addNewsCollection.insertOne(newNews)
//       .then(response => {
//         res.send(response.insertedCount > 0)
//         console.log("data added")
//       })
//     })
//   client.close();
// });


const port = process.env.PORT || 5000
app.listen(port, err => err ? console.log("Filed to Listen on Port" , port) : console.log("Listing for Port" , port));