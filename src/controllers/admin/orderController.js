const {getOrders}=require('../../services/admin/orderService')


const fetchOrders=async(req,res)=>{
    try{
        const response=await getOrders();

        res.status(response.status).json(response.data);
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}


module.exports={fetchOrders}