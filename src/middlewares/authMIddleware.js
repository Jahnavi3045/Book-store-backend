const jwt=require('jsonwebtoken')
require('dotenv').config();

const authenticateJWT=(req,res,next)=>{
    const authHeader=req.header('Authorization');

    if(!authHeader){
        return res.status(401).json({message:'Unauthorized:missing token'});
    }

    const [bearer,token]=authHeader.split(' ');

    if(bearer!=='Bearer' || !token){
        return res.status(401).json({message:'Unauthorized:Invalid token format'});
    }

    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
            console.error(`Token verification error:${err}`)
            return res.status(403).json({message:'Forbidden:Invalid token'})
        }
        req.user=user;
        next();
    })

}

const authorizeRole=(role)=>{
    return (req,res,next)=>{
        if(req.user.role!==role){
            return res.status(403).json({message:'Access forbidden:You do not have correct role'})
        }
        next();
    };
}

module.exports={authenticateJWT,authorizeRole};