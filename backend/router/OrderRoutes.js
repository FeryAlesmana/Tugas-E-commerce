const express = require('express');
const router = express.Router();
const Order = require('../model/order');

// dibuat untuk menampilkan orederan yang sudah dibayar dan akan di review
// Endpoint untuk mengambil semua order
router.get('/orders/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    const order = await Order.findOne({ 'products.id': productId }); // Pastikan order memiliki produk dengan productId tersebut
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ paymentIntentId: order.paymentIntentId }); // Asumsi order memiliki paymentIntentId
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
router.get('/orders/user', async (req, res)=>{
  let userData = await Users.findOne({_id:req.user.id});
  if(!userData){
    return res.status(404).json({error: 'User not found'});
  }
  const order = await Order.find({})
})
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find(); // Mengambil semua order dari koleksi Order
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;