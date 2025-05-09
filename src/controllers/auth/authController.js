const {createUser,loginUser} =require('../../services/auth/authService') ;

const signup=async (req,res)=>{
    try{
        await createUser(req.body);
        res.status(201).json({message:'Sign Up successfull!!'});
    }catch(error){
        res.status(400).json({error:error.message});
    }
}

const login=async (req,res)=>{
    try{
        const token = await loginUser(req.body);
        res.status(200).json({message:'Login successfull!!',token});
    }catch(error){
        res.status(400).json({error:error.message});
    }
}


module.exports={signup,login};