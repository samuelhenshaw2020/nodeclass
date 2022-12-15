const {IncomingForm} = require("formidable");
const {join} = require("path")
const fs = require('fs');
const User = require("../models/User");

async function Upload(req, res){

    const form = new IncomingForm();
  

    form.parse(req, (err, field, files) => {
        const image_path = join("storage", String(files['fileData'].originalFilename).replace(/\s/g, '_').toLocaleLowerCase())
        
        fs.createReadStream(files['fileData'].filepath)
            .pipe(fs.createWriteStream(join(__dirname, '..', image_path)))
            .on('finish', async () => {
               try {
                await User.create({
                    name: "Timilehin",
                    password: "Akpaukpagi",
                    role: "ADMIN",
                    email: "timilehin@gmail.com",
                    profile_image: image_path

                })
                res.status(201).json({message: "done"})
               } catch (error) {
                console.log(error)
                res.status(500).json({message: "error"})
                
               }

            })
            .on('error', (err) => {
                console.log(err)
            })
    })

}

module.exports = {
    Upload
}