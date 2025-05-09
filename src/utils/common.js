const bcryptjs=require('bcryptjs');
const User=require('../models/User');
require('dotenv').config();

const createAnAdminAccount=async()=>{
    try{
        const email=process.env.ADMIN_EMAIL;
        const password=process.env.ADMIN_PASSWORD;
        const firstName=process.env.ADMIN_FIRSTNAME;
        const lastName=process.env.ADMIN_LASTNAME;

        const existingAdmin=await User.findOne({email:email});

        if(existingAdmin){
            console.log('Admin account already exists!!');
            return;
        }
        const hashedPassword= await bcryptjs.hash(password,10);

        const admin=new User({
            email:email,
            firstName:firstName,
            lastName:lastName,
            role:'ADMIN',
            password:hashedPassword,
        })
        await admin.save();
        console.log('admin account created successfully.!!')
    }
    catch(error){
        console.error(`error while creating adimin account:${error}`);
    }
}


module.exports={createAnAdminAccount};