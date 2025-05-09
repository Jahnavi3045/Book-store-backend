const express=require('express')
const router=express.Router();
const {authenticateJWT,authorizeRole}=require('../../middlewares/authMIddleware')
const {getAllBooks,getBookById,searchBook} =require('../../controllers/customer/bookController')


router.get('/',authenticateJWT,authorizeRole('CUSTOMER'),getAllBooks);
router.get('/:id',authenticateJWT,authorizeRole('CUSTOMER'),getBookById);
router.get('/search/:genre',authenticateJWT,authorizeRole('CUSTOMER'),searchBook);

module.exports=router