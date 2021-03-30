const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

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
    console.log('database connected')

//   app.get("/event", (req, res) => {
    // eventCollection.find().toArray((err, items) => {
    //   res.send(items);
    //   console.log(items);
    // });
//   });
//   app.post("/addEvent", (req, res) => {
//     const newEvent = req.body;
//     eventCollection.insertOne(newEvent.data).then((result) => {
//       console.log(result);
//       res.send(result.insertedCount > 0);
//     });
//   });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
