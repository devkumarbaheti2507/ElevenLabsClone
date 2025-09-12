import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const audioSchema = new mongoose.Schema({
    language: String,
    url: String,
});

const Audio = mongoose.model("Audio", audioSchema);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));

const seedData = [
    {
        language: "English",
        url: "https://res.cloudinary.com/dyw7vufmp/video/upload/v1757699895/elevenlabs_audio/vxixmhcgtc0gbp4t54mz.mp3"
    },
    {
        language: "Italian",
        url: "https://res.cloudinary.com/dyw7vufmp/video/upload/v1757699898/elevenlabs_audio/exwvterxxlym9kz0cmtd.mp3"
    }
];

const seedDB = async () => {
    await Audio.deleteMany({});
    await Audio.insertMany(seedData);
    console.log("Database seeded!");
    mongoose.connection.close();
};

seedDB();