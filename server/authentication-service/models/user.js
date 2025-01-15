import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    "name" : {
        type: String,
        required: true
    },
    "email" : {
        type: String,
        required: true,
        unique: true,
    },
    "phoneNumber": {
        type: String,
        required: true,
        length: 10
    },
    "password": {
        type: String,
        required: true
    }
},{timeStamps: true})

export default mongoose.model("User",userSchema)