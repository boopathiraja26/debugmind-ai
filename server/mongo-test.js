require("dotenv").config();

const mongoose = require("mongoose");

(async () => {
  try {
    console.log(process.env.MONGO_URI);

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected!");
    console.log(conn.connection.host);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();