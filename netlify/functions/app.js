const { MongoClient } = require("mongodb");

async function getData() {
  const uri = "your_mongo_connection_string";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("your_database_name");
    const collection = database.collection("your_collection_name");

    // Query to retrieve only the name and selectedDates fields
    const projection = { name: 1, selectedDates: 1, _id: 0 }; // Set _id to 0 to exclude it
    const result = await collection.find({}, { projection }).toArray();

    console.log(result);
  } finally {
    await client.close();
  }
}

getData().catch(console.error);
