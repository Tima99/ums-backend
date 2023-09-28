const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");


const avatarPath = path.join(__dirname, "../uploads");
// setup multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, avatarPath);
    },
    filename: async (req, file, cb) => {
        try {
            const files      = await fs.readdir(avatarPath);
            const fileExists = files.find((file) => file.includes(req.email) && file);
            if (fileExists) 
                await fs.unlink(path.join(avatarPath, fileExists));
        } catch (error) {
            console.log(error);
        }
        finally{
            const extension = file.mimetype.split("/")[1]
            cb(null, `${req.email}.${extension}`.replaceAll("data", ""));
            // our image name should not contain `data` keyword
            // as in frontend it is used for checking , it is fileReading base64 for image src or url for fetch iamge from backend
        }
    },
});

const upload = multer({
    storage: storage,
});

module.exports = upload