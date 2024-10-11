const Product = require("../models/products.model");

const createProduct = async (req, res) => {
  const { name, description, price, stock, image_url } = req.body;

  try {
    const newProduct = await Product.create({
      name,
      description,
      price,
      stock,
      image_url,
    });

    res.status(201).json({
      message: "Product created!",
      product: {
        id: newProduct.product_id,
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        stock: newProduct.stock,
        image_url: newProduct.image_url,
        created_at: newProduct.created_at,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while creating product" });
  }
};


const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching products" });
  }
};

module.exports = { createProduct, getAllProducts };
