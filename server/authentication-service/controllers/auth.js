import bcrypt from 'bcrypt'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import validator from 'email-validator'
import { createError } from '../error.js'


const signUpUser = async (req,res,next) => {
    try {
        console.log(req.body);
        if(!validator.validate(req.body.email)) return next(createError(400,"email is not valid"))
        const user = await User.findOne({email: req.body.email})
        console.log("HI1: " + user)
        if(user) return next(createError(404,"User already Exist"))
        console.log("HI2")
        const salt = await bcrypt.genSalt(10)
        console.log("HI3")
        const hash = bcrypt.hashSync(req.body.password,salt)
        console.log("HI4")

        const newUser = new User({...req.body,password: hash})

        await newUser.save()

        const token = jwt.sign({id: newUser._id},process.env.JWT);

        res.cookie("access_token",token).status(201).send("User has been successfully create")
    } catch (err) {
        console.log(err);
        next(err)
    }
}


const signInUser = async (req,res,next) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user) return next(createError(404,"User doesn't exists"))

        const isCorrect = await bcrypt.compare(req.body.password,user.password)
        if(!isCorrect) return next(createError(400,"Wrong Credentials"))

        const token = jwt.sign({id: user._id},process.env.JWT);

        res.cookie("access_token",token).status(201).send("User has been successfully create")
    } catch (error) {
        next(error)
    }
}


const signOutUser = (req,res,next) => {

}


export {signInUser, signUpUser, signOutUser}