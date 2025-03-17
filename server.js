require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;
const contactsRoutes = require("./routes/contacts");


app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

app.use('/', require('./routes'));
app.use("/api/contacts", contactsRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
