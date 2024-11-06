const { MongoClient } = require("mongodb");

async function getData() {
  const uri = process.env.ATLAS_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('myDatabase');
    const collection = database.collection("users");

    // Query to retrieve only the name and selectedDates fields
    const projection = { name: 1, selectedDates: 1, _id: 0 }; // Set _id to 0 to exclude it
    const result = await collection.find({}, { projection }).toArray();

    console.log(result);
  } finally {
    await client.close();
  }
}


exports.handler = async (event, context) => {
  try {
    const data = await getData();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error retrieving data:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to retrieve data" }),
    };
  }
};
