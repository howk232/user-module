const express = require("express");
const cors = require("cors");
const db = require("./app/models");
const { initialDb, dbConfig } = require("./app/config/db.config.js");

const app = express();

const corsOptions = {
  origin: "http://localhost:3001",
};

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initialDb();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({ message: "Welcome!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
