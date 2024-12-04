const Product = require('../model/Product.js'); 
const Users = require('../model/user.js');
const cloudinary = require('../library/cloudynaryConfig.js');
const Order = require('../model/order.js');


// Controller untuk menambahkan Item di cart
const addToCart = async (req, res) => {
    console.log("Added", req.body.itemId);

    try {
        let userData = await Users.findOne({ _id: req.user.id });

        if (!userData.cartData) {
            userData.cartData = {};
        }

        userData.cartData[req.body.itemId] = (userData.cartData[req.body.itemId] || 0) + 1;

        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send({success:true , message: "Added"});
    } catch (error) {
        res.status(500).send({ errors: "An error occurred while adding to cart" });
    }
};

// Controller untuk menghapus item dari cart
const removeFromCart = async (req, res) => {
    console.log("Removed", req.body.itemId);

    try {
        let userData = await Users.findOne({ _id: req.user.id });

        if (!userData.cartData) {
            userData.cartData = {};
        }

        if (userData.cartData[req.body.itemId] > 0) {
            userData.cartData[req.body.itemId] -= 1;

            if (userData.cartData[req.body.itemId] === 0) {
                delete userData.cartData[req.body.itemId];
            }

            await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
            res.send({success:true , message: "Deleted"});
        } else {
            res.status(400).send({ errors: "Item not found in cart or already at zero quantity" });
        }
    } catch (error) {
        res.status(500).send({ errors: "An error occurred while removing from cart" });
    }
};

const getCart = async (req,res)=>{
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
}
const clearCart = async(req,res)=>{
    console.log();
    try{
        let userData = await Users.findOne({_id:req.user.id});
        if(userData && userData.cartData ) {
            
            for (var key in userData.cartData) {
                console.log(key + ': ' + userData.cartData[key])
                userData.cartData[key] = 0;
                }
                
            userData.markModified('cartData');  // Marks the cartData field as modified
            await userData.save();
            res.send({ success: true, message: "Cart cleared" });
        } else {
            res.status(400).send({ errors: "No cart data to clear" });
        }
    }catch (err) {
    res.status(500).send({ errors: "An error occurred while clearing the cart" });
    console.log(err.message);}
}

// Controller untuk menambahkan product
const addProduct = async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id });
    if(!userData.isAdmin){
        res.status(401).send({error: "User is not an Admin"})
        return 0;
    }
    let products = await Product.find({});
    let id = 1;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        sub_category: req.body.sub_category,
        price: req.body.price,
    });
    console.log(product);
    await product.save();
    console.log("Saved")

    res.json({
        success: true,
        name: req.body.name,
    });
};

// Controller untuk menghapus produk di database
const removeProduct = async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id });
    if(!userData.isAdmin){
        res.status(401).send({error: "User is not an Admin"})
        return 0;
    }
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("removed")

    res.json({
        success: true,
        name: req.body.name
    });
};

// Controller mengambil semua produk di database
const getAllProducts = async (req, res) => {
    let products = await Product.find({});
    console.log("semua Produk diambil")
    res.send(products);
};

// Controller untuk mencari produk yang sesuai yang diketik
const searchProducts = async (req, res) => {
    const query = req.query.query;
    try {
        const results = await Product.find({
            $or: [
                { name: new RegExp(query, 'i') },
                { category: new RegExp(query, 'i') },
                { sub_category: new RegExp(query, 'i') },
            ],
        });
        if (results.length === 0) {
            res.send("No results found");
        } else {
            res.json(results);
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

// Controller untuk mendapatkan koleksi baru
const getNewCollections = async (req, res) => {
    let products = await Product.find({});
    let new_collection = products.slice(1).slice(-8);

    console.log('NewCollection Fetched');
    res.send(new_collection);
};

const getRelatedProduct = async(req, res)=>{

    try {
        const productId = req.query.productId; // Get productId from query
        const product = await Product.findOne({id: productId}); // Fetch product details
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
        const relatedProducts = await Product.find({category: product.category })
        res.json(relatedProducts);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
}

// Controller untuk mendapatkan produk popular di office
const getPopularInOffice = async (req, res) => {
    let product = await Product.find({ category: "office" });
    let popular_in_office = product.slice(0, 4);

    console.log('Popular in Office fetched');
    res.send(popular_in_office);
};

const UploadIMG = async(req,res)=>{
    let userData = await Users.findOne({ _id: req.user.id });
    if(!userData.isAdmin){
        res.status(401).send({error: "User is not an Admin"})
        return 0;
    }else{
        try {
            // Check if file exists
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }
    
            // Upload image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path);
    
            // Respond with image URL from Cloudinary
            res.status(200).json({ success: true, image_url: result.secure_url });
        } catch (err) {
            console.error('Error uploading image:', err);
            res.status(500).json({ error: 'Failed to upload image' });
        }
       
    }
}

const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findOne({ id: Number(id) });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ product });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getTransactions = async (req, res)=>{
    let userData = await Users.findOne({ _id: req.user.id });
    if(!userData.isAdmin){
        res.status(401).send({error: "User is not an Admin"})
        return 0;
    }
    else{
        try {
            const transactions = await Order.find({});
            if (!transactions) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json({transactions});
        } catch (error) {
            console.error('Error fetching product:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
   
}

const deleteTransaction = async (req, res)=>{
    let userData = await Users.findOne({ _id: req.user.id });
    if(!userData.isAdmin){
        res.status(401).send({error: "User is not an Admin"})
        return 0;
    }
    else{
        try {
            console.log("Id transaksi: "+req.body.id);
            
            const transactions = await Order.findOneAndDelete({_id: req.body.id});
            if (!transactions) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json({transactions});
        } catch (error) {
            console.error('Error fetching product:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
       
    }
}

module.exports = {
    addToCart,
    removeFromCart,
    getCart,
    clearCart,
    addProduct,
    removeProduct,
    getAllProducts,
    getNewCollections,
    getPopularInOffice,
    getRelatedProduct,
    searchProducts,
    UploadIMG,
    getProductById,
    getTransactions,
    deleteTransaction,
}