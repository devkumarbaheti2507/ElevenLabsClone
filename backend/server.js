const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Audio = require("./models/Audio");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "https://eleven-labs-clone-nine.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));

app.get("/api/audio", async (req, res) => {
    try {
        const audios = await Audio.find({}, { _id: 0 });
        res.json({ audio: audios });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
