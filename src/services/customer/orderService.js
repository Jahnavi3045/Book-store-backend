const Order = require("../../models/Order")
const User = require("../../models/User")


const placeAnOrder = async (userId, orderDescription, address) => {
    const activeOrder = await Order.findOne({ user: userId, orderStatus: 'PENDING' });
    const user = await User.findById(userId)

    if (!activeOrder || !user) {
        return { status: 404, data: 'Order or user not found' }
    }

    activeOrder.orderDescription = orderDescription;
    activeOrder.address = address
    activeOrder.orderStatus = "PLACED"

    await activeOrder.save();

    const order = new Order({
        amount: 0,
        address: "Default address",
        orderStatus: 'PENDING',
        user: user
    })

    await order.save();

    return { status: 200, data: activeOrder }
}

const getOrdersByUser = async (userId) => {
    const orders = await Order.findOne({ user: userId, orderStatus: 'PLACED' });

    if (orders.length<0) {
        return { status: 404, data: 'Ordersnot found' }
    }

    return { status: 200, data: orders}
}


module.exports = { placeAnOrder ,getOrdersByUser}