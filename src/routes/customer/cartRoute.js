const express=require('express')
const router=express.Router();
const {authenticateJWT,authorizeRole}=require('../../middlewares/authMIddleware')
const {postBookToCart,getCartByUser} =require('../../controllers/customer/cartController')


router.post('/:bookId',authenticateJWT,authorizeRole('CUSTOMER'),postBookToCart);
router.get('/',authenticateJWT,authorizeRole('CUSTOMER'),getCartByUser);

module.exports=router