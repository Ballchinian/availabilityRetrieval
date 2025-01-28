const { MongoClient, ObjectId } = require("mongodb");

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

    return result;
  } finally {
    await client.close();
  }
}

async function deleteUser(userId) {
  const uri = process.env.ATLAS_URI;
  const client = new MongoClient(uri);

  try {
      await client.connect();
      const database = client.db("myDatabase");
      const collection = database.collection("users");

      console.log("Attempting to delete user with ID:", userId); // Log userId

      if (!ObjectId.isValid(userId)) {
        throw new Error(`Invalid ObjectId format: ${userId}`);
      }
      // Convert userId to ObjectId and attempt deletion
      const result = await collection.deleteOne({ _id: new ObjectId(userId) });

      console.log("Delete result:", result); // Log delete result

      return result.deletedCount > 0;
  } catch (error) {
      console.error("Error during deletion operation:", error); // Log detailed error message
      throw new Error("Failed to delete user");
  } finally {
      await client.close();
  }
}

exports.handler = async (event, context) => {
  if (event.httpMethod === 'GET') {
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
  } 
  
  else if (event.httpMethod === 'DELETE') {
    console.log("DELETE request received:", event.body); // Log the raw body

    try {
        const parsedBody = JSON.parse(event.body);
        console.log("Parsed body:", parsedBody);

        const { userId } = parsedBody;
        console.log("Extracted userId:", userId);

        if (!userId || userId === "undefined") {
            throw new Error("Invalid userId received");
        }

        const success = await deleteUser(userId);
        if (success) {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: "User deleted successfully" }),
            };
        } else {
            throw new Error("Failed to delete user");
        }
    } catch (error) {
        console.error("Error during deletion operation:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
  } else {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }
};
