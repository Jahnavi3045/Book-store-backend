const Book =require("../../models/Book")
const Order=require("../../models/Order")
const User=require("../../models/User")
const CartItem=require("../../models/CartItem")


const addBookToCart=async(userId,bookId)=>{
    let activeOrder=await Order.findOne({user:userId,orderStatus:'PENDING'}).populate('cartItem');

    // if(!activeOrder){
    //     return {status:404,data:'Active order not found'};
    // }

    // if(activeOrder){
    //     return {status:409,data:'Book already exists in cart'};
    // }

    // const bookExists = activeOrder.cartItem.some(
    //     (item) => item.book.toString() === bookId
    //   );
    
    if (!activeOrder) {
        // No active order → create one
        activeOrder = await new Order({
          user: userId,
          amount: 0,
          address: 'Temporary address', // You may replace this later at checkout
          orderStatus: 'PENDING',
          cartItem: []
        }).save();
      }
    
      // ✅ Check if book already exists in cart
      const cartItems = await CartItem.find({ order: activeOrder._id });
      const bookExists = cartItems.some(item => item.book.toString() === bookId);

      if (bookExists) {
        return { status: 409, data: 'Book already exists in cart' };
      }

    const [book,user]=await Promise.all([
        Book.findById(bookId),
        User.findById(userId)
    ])

    if(!book || !user){
        return {status:404,data:"Book or user not found"};
    }

    const savedCartItem=await new CartItem({
        order:activeOrder,
        user,
        book,
        price:book.price,
        quantity:1
    }).save();

    activeOrder.amount+=book.price;
    activeOrder.cartItem.push(savedCartItem)

    await activeOrder.save();

    return {status:201,data:"Book added to cart successfully"}
}


const fetchCartUser=async(userId,bookId)=>{
    const activeOrder=await Order.findOne({user:userId,orderStatus:'PENDING'}).populate({
        path:'cartItem',
        populate:{path:'book'}
    });
    
    if (!activeOrder) {
        return {status:404,data:'Active order not found'}
      }

    return {status:200,data:activeOrder}
}

module.exports={addBookToCart,fetchCartUser}