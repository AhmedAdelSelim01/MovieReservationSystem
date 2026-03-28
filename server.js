import server from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

//.eve file
dotenv.config();

// connect to MongoDB
await connectDB();

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
