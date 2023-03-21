const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

// routes
const userRoutes = require("./routes/user");
const hotelRoutes = require("./routes/hotel");
const adminRoutes = require("./routes/admin");

app.use(cors());

app.use(express.json({ type: ["application/json"] }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(userRoutes);
app.use(hotelRoutes);
app.use(adminRoutes);
mongoose.set("strictQuery", true);

mongoose
  .connect(
    "mongodb+srv://tiendat:dat0948756694@cluster0.bz7lnti.mongodb.net/booking?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));
