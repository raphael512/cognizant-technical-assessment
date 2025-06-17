import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import express from "express";
import cors from "cors";
const uri =
  "mongodb+srv://raphael512rg:GlqtzpfBG7vUstqL@cluster0.hapmgtp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/dbtest", async (req, res) => {
  try {
    await client.connect();
    res.send("Connected to MongoDB");
  } catch (err) {
    console.log(err);
    res.send("Error connecting to MongoDB:", err);
  } finally {
    await client.close();
  }
});

app.get("/getBooks", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("cognizant-db");
    const collection = database.collection("Books");
    res.send(JSON.stringify(await collection.find({}).toArray()));
  } catch (err) {
    res.send("Error connecting to MongoDB:", err);
  } finally {
    await client.close();
  }
});

app.post("/addBook", async (req, res) => {
  let status = 201;
  try {
    await client.connect();
    const database = client.db("cognizant-db");
    const collection = database.collection("Books");
    await collection.insertOne({
      bookName: req.body.bookName,
      authorName: req.body.authorName,
      price: req.body.price,
      genre: req.body.genre,
    });
  } catch (err) {
    status = 400;
  } finally {
    // Close the connection when done
    await client.close();
  }
  if (status === 201) {
    res.status(status);
    res.send({ message: "Data inserted successfully!" });
  } else {
    res.status(status);
    res.send("Error connecting to MongoDB:", err);
  }
});

app.put("/book/:id", async (req, res) => {
  const id = new ObjectId(req.params.id);
  let error;
  let status = 201;
  try {
    await client.connect();
    const database = client.db("cognizant-db");
    const collection = database.collection("Books");
    await collection.updateOne(
      { _id: id },
      {
        $set: {
          bookName: req.body.bookName,
          authorName: req.body.authorName,
          price: req.body.price,
          genre: req.body.genre,
        },
      }
    );
  } catch (err) {
    console.log(err);

    error = err;
    status = 400;
  } finally {
    // Close the connection when done
    await client.close();
  }
  if (status === 201) {
    res.status(status);
    res.send({ message: "Data inserted successfully!" });
  } else {
    res.status(status);
    res.send("Error connecting to MongoDB:", error);
  }
});

app.get("/book/:id", async (req, res) => {
  const id = new ObjectId(req.params.id);
  try {
    await client.connect();
    const database = client.db("cognizant-db");
    const collection = database.collection("Books");

    res.send(JSON.stringify(await collection.findOne({ _id: id })));
  } catch (err) {
    res.send("Error connecting to MongoDB:", err);
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
