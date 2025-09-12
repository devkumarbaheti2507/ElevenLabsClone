import mongoose from "mongoose";
import Audio from "../../models/Audio";
import Cors from "cors";

const cors = Cors({
    origin: "*",
    methods: ["GET"],
});

function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error)
                reject(result);
            else
                resolve(result);
        });
    });
}

export default async function handler(req, res) {
    await runMiddleware(req, res, cors);
    if (req.method === "GET") {
        try {
            await mongoose.connect(process.env.MONGO_URI);
            const audios = await Audio.find({}, { _id: 0 });
            res.status(200).json({ audio: audios });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}