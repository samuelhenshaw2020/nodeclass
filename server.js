const express = require("express")
const mongoose = require('mongoose')
const {MONGODB_URI, SESSION_SECRET} = require('./config/env')
// const session = require("express-session")
const cors = require('cors')
const {EventEmitter} = require("events")
const mailer = require("./config/mail")

mongoose.set('strictQuery', false);
mongoose.connect(String(MONGODB_URI), function(err) {
    if(err) return console.error(err)
    console.log("db set")
})

const PORT = 5000;
const app = express()



app.use(cors({
    origin: ["http://localhost:3001", "*"]
}))
app.use(express.json())

app.use("/api/auth", require("./routes/user.route"))
app.use("/api/post", require("./routes/post.route"))

// const xevent = new EventEmitter();

// xevent.on("damilare", async function(){
//     await mailer.sendMail({
//         to: "samuelhenshaw2020@gmail.com",
//         from: "samuel@gmail.com",
//         subject: "Welcome to Shop4me",
//         text: "Hello world?", // plain text body
//         html: "<b>Hello world?</b>", // html body,
//     })
//     console.log("emial sent")
// })

// xevent.on("gbengaed", function(value){
//     console.log(value)
// })

// app.get("/", async (req, res) =>{
//     try {

//         xevent.emit("gbengaed", {"samuel henshaw", "henshaw"})
//         res.status(200).json({message: "done"})
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({message: "error"})
        
//     }

// })

app.listen(PORT, () => {
    console.log(`App runnning on port ${PORT}`)
})