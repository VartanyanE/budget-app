const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const mongo = process.env.MONGODB_URI || "mongodb://mongouser:lakers323@ds147551.mlab.com:47551/heroku_f0h2zbhm";
mongoose.connect(mongo, {
    useNewUrlParser: true,
    useFindAndModify: false,

    useUnifiedTopology: true
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});