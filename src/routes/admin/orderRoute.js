const express=require('express')
const router=express.Router();
const {authenticateJWT,authorizeRole}=require('../../middlewares/authMIddleware')
const {fetchOrders} =require('../../controllers/admin/orderController')


router.get('/',authenticateJWT,authorizeRole('ADMIN'),fetchOrders);


module.exports=router