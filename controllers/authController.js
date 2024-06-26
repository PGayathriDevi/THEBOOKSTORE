import { comparePassword, hashPassword } from "../helpers/authHelper.js"
import userModel from "../models/userModel.js"
import JWT from 'jsonwebtoken'

//register
export const registerController = async(req,res) =>{
    try {
        const {name,email,password,phone,address} = req.body
        //validation
        if(!name){
            return res.send({error: 'name is required'})
        }
        if(!email){
            return res.send({error: 'email is required'})
        }
        if(!password){
            return res.send({error: 'password is required'})
        }
        if(!phone){
            return res.send({error: 'phone number is required'})
        }
        if(!address){
            return res.send({error: 'address is required'})
        }
        //existing user

        const existingUser = await userModel.findOne({email})

        if(existingUser){
            return res.status(200).send({
                success:true,
                message:"Already registered please Login"
            })
        }
        //register user
        const hashedPassword = await hashPassword(password);

        const user =await new userModel({name ,email,phone,address,password:hashedPassword}).save()

        res.status(201).send({
            success:true,
            message:"user registered successfully",
            user,
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'there was an error please try again',
            error
        })
    }
}

//post login
export const loginController = async(req,res)=>{
    try {
        const {email,password} = req.body
        //validation 
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"invalid email or password"

            })
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message: 'user not found'
            })
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:"invalid password"
            })
        }
        //token
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.status(200).send({
            success:true,
            message:"LOGIN successful",
            user:{
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address

            },token
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'there was an error in logging in',
            error
        })
    }

}

//test
export const testController = async(req ,res) => {
    try {
        res.send('protected routes')
    } catch (error) {
        console.log(error)
        res.send({error})
    }
}

