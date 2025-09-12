import cloudinary from "./cloudinary.js";

const files = [
    { language: "English", path: "./audios/English_Audio.mp3" },
    { language: "Italian", path: "./audios/Italian_Audio.mp3" },
];

const uploadFiles = async () => {
    for (let file of files) {
        const result = await cloudinary.uploader.upload(file.path, {
            resource_type: "auto",
            folder: "elevenlabs_audio",
        });
        console.log(file.language, result.secure_url);
    }
};

uploadFiles();
