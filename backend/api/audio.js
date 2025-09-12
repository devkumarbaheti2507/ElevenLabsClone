import mongoose from "mongoose";

const audioSchema = new mongoose.Schema({
    language: String,
    url: String,
});

const Audio = mongoose.models.Audio || mongoose.model("Audio", audioSchema);

const connectDB = async () => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
};

export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
        res.status(200).end();
        return;
    }
    try {
        await connectDB();
        const audios = await Audio.find({}, { _id: 0 });
        res.status(200).json({ audio: audios });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}