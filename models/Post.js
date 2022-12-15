

const {Schema, model} = require('mongoose')
const {randomBytes} = require("crypto")


const postSchema = Schema(
    {
        title: {
            type: Schema.Types.String,
            required: true
        },
        body: {
            type: Schema.Types.String,
            required: true,
        },
        perm_link: {
            type: Schema.Types.String,
            unique: true,
            default: null
        },
        image: {
            type: String,
            default: null
        },
        users: {
            type: Schema.Types.ObjectId,
            ref: "users",
            required: true
        },
        genre: {
            type: [Schema.Types.String],
            default: null
        },
        likes: {
            type: Schema.Types.Number,
            default:0
        }

    }, 
    {
        timestamps: true
    }
)

postSchema.pre("save", function(next){
    let perm_link  = String(this.title).replace(/\s/g, "_").toLocaleLowerCase() + "_" + randomBytes(5).toString('hex')
    this.perm_link = perm_link;
    next()
})


const Post = model("posts", postSchema);

module.exports =  Post;

