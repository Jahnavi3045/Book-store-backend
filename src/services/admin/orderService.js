const Order = require("../../models/Order")


const getOrders = async () => {
    const orders = await Order.findOne({orderStatus: 'PLACED' }).populate('user');

    if (orders.length<0) {
        return { status: 404, data: 'Ordersnot found' }
    }

    return { status: 200, data: orders}
}


module.exports = { getOrders}