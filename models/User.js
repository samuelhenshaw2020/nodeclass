

const {Schema, model} = require('mongoose')
const {randomBytes} = require("crypto")
const bcrypt = require('bcrypt')

const userSchema = Schema(
    {
        name: {
            type: Schema.Types.String,
            required: true
        },
        email: {
            type: Schema.Types.String,
            required: true,
            unique: true
        },
        password: {
            type: Schema.Types.String,
            required: true
        },
        role: {
            type: Schema.Types.String,
            enum: ["CUSTOMER", "ADMIN", "SELLER"],
            default: "CUSTOMER"
        },
        otp: {
            type: Schema.Types.String,
            default: null
        },
        perm_link: {
            type: Schema.Types.String,
            unique: true,
            default: null
        },
        profile_image: {
            type: String,
            default: null
        }

    }, 
    {
        timestamps: true
    }
)

userSchema.pre("save", function(next){
    let otp = randomBytes(5).toString("hex");
    let perm_link  = String(this.name).replace(/\s/g, "_").toLocaleLowerCase() + "_" + otp;
    this.otp = otp;
    this.perm_link = perm_link;
    next()
})

userSchema.pre("save", async function(next){
    const salt  = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword;
    next()
})

const User = model("users", userSchema);

module.exports =  User;

