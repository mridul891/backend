import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String, //Cloudinary Url
        required: true
    },
    coverImage: {
        type: String, //cloudianry url
    },
    watchHistory: [
        {
            type: Schema.Type.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    refreshToken: {
        type: String
    }
}, { timestamps: true })

// pre is an middleware which act just before the saving of the data in mongodb
userSchema.pre(method = "save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10)
    next()
})

//we are hashing the password here 
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// generation of access Token 
userSchema.methods.generateAccessToken = async function () {
    await jwt.sign({
        //This id is been given by dataBase
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname

    }, process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    )
}

// generation of referesh Token
userSchema.methods.generateRefreshToken = function () {
    jwt.sign(

        {
            _id: this._id,
        }, process.env.REFERSH_TOKEN_SECRET, {
        expiryIn: REFERSH_TOKEN_EXPIRY
    }
    )
}

export const User = mongoose.model("User", userSchema)