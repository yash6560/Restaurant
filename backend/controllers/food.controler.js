const FoodItem = require('../models/fooditem.model');
const Cart = require('../models/cart.model');

const foodDisplay = async(req, res) => {
    try {
        const result = await FoodItem.find();
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Somting is wrong", success : false});
    }

}

const addFood = async (req, res) => {
    let image = req.file.path;
    const food = new FoodItem({
        name : req.body.name,
        image : image,
        price : req.body.price,
        description : req.body.description,
        category : req.body.category,
    })

    try {
        await food.save();
        res.status(200).json({message : "data save", success:true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Somting is wrong", success : false});
    }
}

const removeFood = async(req, res) => {
    const itemId = req.body.Id;
    try {
        const response = await FoodItem.findByIdAndDelete(itemId);
        
        if(response){
            const foodItems = await FoodItem.find();
            res.status(200).json({message : "item removed", success:true,foodItems});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Somting is wrong", success : false});
    }
}

const editMenu = async(req, res) => {
    const itemId = req.params.id;
    let image = req.file.path;
    try {
        const response = await FoodItem.findByIdAndUpdate(itemId, {
            name : req.body.name,
            image : image,
            price : req.body.price,
            description : req.body.description,
            category : req.body.category,
        })

        return res.status(200).json({message:"data is edited", success : true});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Somting is wrong", success : false}); 
    }
}


module.exports = {foodDisplay, addFood, removeFood, editMenu}