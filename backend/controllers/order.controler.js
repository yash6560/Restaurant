const Order = require('../models/order.model')
const Stripe = require('stripe');
const Cart = require('../models/cart.model');
const User = require('../models/user.model');
const notifyOrderStatus = require('../utils/socket');

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const placeOrder = async(req, res) => {
    const { deliveryDetails, cartId, totalAmount } = req.body;
    const userId = req.user._id;
    
    try {
        const items = await Cart.findById(cartId);

        if (!items) {
            return res.status(400).json({ message: "Cart not found", success: false });
        }

        const newOrder = await Order.create({
            user: userId,
            deliveryDetails: {
            name: deliveryDetails.name,
            email: deliveryDetails.email,
            contact: deliveryDetails.contact,
            address: deliveryDetails.address,
            city: deliveryDetails.city,
            country: deliveryDetails.country,
            pincode: deliveryDetails.pincode,
        },
            items: items.items,
            totalAmount: totalAmount,
        });


        const line_items  = items.items.map((item => ({
            price_data : {
                currency : 'inr',
                product_data : {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity : item.quantity,
        })))

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items : line_items,
            mode : 'payment',
            success_url: `${process.env.FRONTEND_URL}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${process.env.FRONTEND_URL}/verify?success=false&orderId=${newOrder._id}`,
            metadata: { orderId: newOrder._id.toString() }
        })

        
        await Cart.findByIdAndDelete(cartId);

        return res.status(200).json({message : "Order is placed!", success:true, success_url : session.url, orderId: newOrder._id});
              
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Order not Placed", success : false}); 
    }

}

const getOrder = async(req, res) => {
    const userId = req.user._id
    try {
        const userIsAdmin = await User.findById(userId);
        let orderlist
        if(userIsAdmin.isVerify){
            orderlist = await Order.find();
        }else{
            orderlist = await Order.find({user:userId});
        }
        
        return res.status(200).json({message : "orders get", success : true, orderlist});
        

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Order not get", success : false}); 
    }
}

const verifyOrder = async(req, res) => {
    try {
        const sig = req.headers['stripe-signature'];
        const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY;
        
        let event;
        
        // Convert request body to buffer manually (important)
        const rawBody = req.body instanceof Buffer ? req.body : Buffer.from(JSON.stringify(req.body));

        try {
            event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        } catch (error) {
            console.error('Webhook signature verification failed.', error);
            return res.status(400).send(`Webhook Error: ${error.message}`);
        }

        if(event.type === 'checkout.session.completed'){
            const session = event.data.object;
            const orderId = session.metadata.orderId;

            await Order.findByIdAndUpdate(orderId, { status: "Confirmed", payment: true });
            
            notifyOrderStatus(orderId, {status : "Confirmed"});
            console.log(`Order ${orderId} verified successfully!`);
        }

        res.status(200).send("Webhook Processed");

    } catch (error) {
        console.log(error);
        return res.status(500).json({success : false}); 
    }

}



module.exports = {placeOrder, verifyOrder, getOrder}