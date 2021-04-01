const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectID;
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mnfgc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


client.connect((err) => {
  const eventCollection = client.db("tshirtShop").collection("products");
  const orderCollection = client.db("tshirtShop").collection("order");

  app.get("/event", (req, res) => {
    eventCollection.find().toArray((err, items) => {
      res.send(items);
    });
  });
  app.post("/addEvent", (req, res) => {
    const newEvent = req.body;
    eventCollection.insertOne(newEvent.data).then((result) => {
      console.log(result);
      res.send(result.insertedCount > 0);
    });
  });

    app.get('/product/:id', (req, res) => {
        eventCollection.find({ _id: ObjectId(req.params.id) })
            .toArray((err, document) => {
            res.send(document[0])
        })
    })

  app.post('/order', (req, res) => {
    console.log(req.body)
    orderCollection.insertOne(req.body)
      .then(result => {
        console.log(result);
        res.send(result.insertedCount > 0);
    })
  })

  app.get('/orderDetail', (req, res) => {
    const orderInfo= req.query.email;
    orderCollection.find({ email: orderInfo })
      .toArray((err, document) => {
      res.send(document)
    })
  })
  app.delete("/delete/:id", (req, res) => {
    console.log(req.params.id)
    eventCollection
      .deleteOne({ _id: ObjectId(req.params.id) })
      .then((result) => {
        res.send(result)
      });
  });

});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
