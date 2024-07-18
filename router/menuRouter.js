const express = require("express");
const menuItem = require("../model/menuItem.js");
const router = express.Router();

router.post("/item", async (req, res) => {
  try {
    const data = req.body;
    const newItem = new menuItem(data);
    const response = await newItem.save();
    res.status(201).send({
      message: "Item added successfully",
      response,
    });
  } catch (error) {
    res.status(404).send({
      message: "Failed to add item",
      error,
    });
  }
});
// get items
router.get("/item", async (req, res) => {
  try {
    const data = await menuItem.find();
    res.status(200).send({
      totalItem: data.length,
      message: "Items fetched successfully",
      data,
    });
  } catch (error) {
    res.status(404).send({
      message: "Failed to fetch items",
      error,
    });
  }
});

// update items
router.put("/updateItem/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const updatedItem = req.body;
    const response = await menuItem.findByIdAndUpdate(itemId, updatedItem, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return res.status(404).send({ message: "Item not found" });
    }
    res.status(201).send({
      message: "Item updated successfully",
      response,
    });
  } catch (error) {
    res.status(404).send({
      message: "Failed to update item",
      error,
    });
  }
});
// delet item 
router.delete('/item/:id',async(req,res)=>{
    try {
        const itemId = req.params.id

        const response = await menuItem.findByIdAndDelete(itemId)
        if(!response){
            return res.status(404).send({message: 'Item not found'})
        }
        res.status(204).send({message: 'Item deleted successfully'})
    } catch (error) {
        res.status(404).send({
            message: 'Failed to delete item',
            error: error
        })
    }
})
module.exports = router;
