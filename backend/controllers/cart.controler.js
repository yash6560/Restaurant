const Cart = require('../models/cart.model');

const fetchData = async(req, res) => {
    const userId = req.user._id
    try {
        const cart = await Cart.findOne({user : userId});

        if(!cart){
            return res.status(401).json({ message: "DATA is not avaoilable" });
        }

        return res.status(200).json({cart});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "NOt added in cart", success : false});
    }
}

const AddItems = async(req, res) => {
    const items = req.body.items;
    
    const userId = req.user._id
    
    try {
        let cart = await Cart.findOne({user : userId})
        if(cart){
            items.forEach((newItem) => {
                const existCart = cart.items.findIndex(
                    (item) => item.foodId.toString() === newItem.foodId.toString()
                );

                if(existCart >=0){
                    cart.items[existCart].quantity += newItem.quantity;
                }else{
                    cart.items.push(newItem);
                }
            })

            await cart.save();
        }
        else{
            cart = new Cart({user : userId, items});
            await cart.save();
        }
        return res.status(200).json({ message: "item add in Cart", cart });

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "NOt added in cart", success : false});
    }
}

const IncreaseCartItem = async(req, res) => {
    const userId = req.user._id;
    const itemId = req.params.id;

    try {
        const cart = await Cart.findOne({user : userId});

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const itemindex = cart.items.findIndex((item) => item.foodId.toString() === itemId.toString());

        if(itemindex >= 0){
            cart.items[itemindex].quantity += 1;
            await cart.save();
            return res.status(200).json({ message: "Item quantity increased", cart });
        }else{

            res.status(200).json({message:"item not found for increase"});
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Not increment in cart", success : false});
    }
}

const DecreseCartItem = async(req, res) => {
    const userId = req.user._id;
    const itemId = req.params.id;

    try {
        const cart = await Cart.findOne({user : userId});

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const itemindex = cart.items.findIndex((item) => item.foodId.toString() === itemId.toString());

        if(itemindex >= 0){
            if(cart.items[itemindex].quantity > 1){
                cart.items[itemindex].quantity -= 1;
            }
            await cart.save();
            return res.status(200).json({ message: "Item quantity decrese", cart });
        }else{

            res.status(200).json({message:"item not found for increase"});
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Not decrement in cart", success : false});
    }
}

const removeFromCart = async(req, res) => {
    const userId = req.user._id;
    const itemId = req.params.id;
    try {
        const cart = await Cart.findOneAndUpdate({user : userId}, { $pull: { items: { foodId: itemId } } },
            { new: true });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // If cart is empty, delete it
        if (cart.items.length === 0) {
            await Cart.deleteOne({ user: userId });
            return res.status(200).json({ message: "Item removed & cart deleted" });
        }
        
            return res.status(200).json({ message: "Item removed", cart });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Not removed from cart", success : false});
    }
}

const deleteCart = async(req, res) => {
    const userId = req.user._id;
    try {
        await Cart.findOneAndDelete({user : userId});
        return res.status(200).json({success : true});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({success : false});
    }
}

module.exports = {AddItems, fetchData, IncreaseCartItem, DecreseCartItem,removeFromCart, deleteCart}