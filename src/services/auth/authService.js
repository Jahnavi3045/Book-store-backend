const bcryptjs=require('bcryptjs');
const User=require('../../models/User');
require('dotenv').config();
const jwt= require('jsonwebtoken');
const Order = require('../../models/Order');

const createUser=async(userData)=>{
    try{
        const email=userData.email;
        const password=userData.password;
        const firstName=userData.firstName;
        const lastName=userData.lastName;

        const existingUser=await User.findOne({email:email});

        if(existingUser){
            throw new Error('User already exists.!!')
        }
        const hashedPassword= await bcryptjs.hash(password,10);

        const user=new User({
            email:email,
            firstName:firstName,
            lastName:lastName,
            role:'CUSTOMER',
            password:hashedPassword,
        })
        const order=new Order({
            amount:0,
            address:"Default address",
            orderStatus:'PENDING',
            user:user
        })
        await order.save();
        await user.save();
        return user;
    }
    catch(error){
        console.error(`error while creating user:${error}`);
    }
}

const loginUser=async(userData)=>{
    try{
        const email=userData.email;
        const password=userData.password;

        const existingUser=await User.findOne({email:email});

        if(!existingUser){
            throw new Error('User doesnt exists.!!')
        }
        const isPasswordValid= await bcryptjs.compare(password,existingUser.password);
        if(!isPasswordValid){
            throw new Error('Invalid password!!')
        }

        const token=jwt.sign({id:existingUser._id,role:existingUser.role},
            process.env.JWT_SECRET,
            {expiresIn:'1d'},
        );
        return token;
    }
    catch(error){
        console.error(`error while creating user:${error}`);
    }
}
module.exports={createUser,loginUser};