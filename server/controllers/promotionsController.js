const ItemPromotion = require('../models/promotionsModel');
const createItemPromotion = async (req, res) => {
  try {
    const { items, discount, startDate, endDate } = req.body;
    const itemPromotion = new ItemPromotion({
      items,
      discount,
      startDate,
      endDate,
    });
    await itemPromotion.save();
    res.status(201).json({ message: 'Item promotion created successfully', itemPromotion });
  } catch (error) {
    console.log('Failed to create item promotion', error);
    res.status(500).json({ error: 'Failed to create item promotion' });
  }
};
const getAllItemPromotions = async (req, res) => {
  try {
    const itemPromotions = await ItemPromotion.find().populate('items'); // Assuming the 'items' field in the 'ItemPromotion' model references the 'Item' model
    res.json(itemPromotions);
  } catch (error) {
    console.log('Failed to retrieve item promotions', error);
    res.status(500).json({ error: 'Failed to retrieve item promotions' });
  }
};
module.exports = {
  createItemPromotion,
  getAllItemPromotions,
};