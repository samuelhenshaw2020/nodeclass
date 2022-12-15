

const {Schema, model} = require('mongoose')
const {randomBytes} = require("crypto")


const commentSchema = Schema(
    {
        body: {
            type: Schema.Types.String,
            required: true
        },
        posts: {
            type: Schema.Types.ObjectId,
            ref: "posts",
            required: true
        },
        users: {
            type: Schema.Types.ObjectId,
            ref: "users",
            required: true
        }

    }, 
    {
        timestamps: true
    }
)


const Comment = model("comments", commentSchema);

module.exports =  Comment;

