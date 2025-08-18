import multer from "multer";
import fs from "fs";
import path from "path";

const tempDir = "public/temp";
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

// Set up storage engine
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, tempDir);
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    },
});

// Initialize multer with the storage engine
const upload = multer({ storage });

export default upload;
