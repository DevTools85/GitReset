const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const uri = `mongodb+srv://db_access:v5GoPUjpCLIx45Oh@cluster0.miqtm7v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

app.get('/', async (req, res) => {
  let client;
  
  try {
    // MongoDB bağlantısını oluştur
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    await client.connect(); // MongoDB'ye bağlan
    await client.db("admin").command({ ping: 1 }); // Bağlantıyı test et
    res.json({ message: "yesConnect" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "noConnect." });
  } finally {
    if (client) {
      await client.close(); // Bağlantıyı kapat
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
