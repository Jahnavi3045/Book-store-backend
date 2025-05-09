const express=require('express')
const router=express.Router();
const {authenticateJWT,authorizeRole}=require('../../middlewares/authMIddleware')
const {placeOrder, fetchOrdersByUser} =require('../../controllers/customer/orderController')


router.post('/',authenticateJWT,authorizeRole('CUSTOMER'),placeOrder);
router.get('/',authenticateJWT,authorizeRole('CUSTOMER'),fetchOrdersByUser);


module.exports=router