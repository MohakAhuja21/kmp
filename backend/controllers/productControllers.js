const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const APiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

//Create Product
exports.createProduct = catchAsyncError(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.images = imagesLinks;
  req.body.user = req.user.id; //this line get user id for whom it create product

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//Get All Products
exports.getAllProducts = catchAsyncError(async (req, res) => {
  const resultPerPage = 9;
  const productCount = await Product.countDocuments();

  const apiFeature = new APiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;
  let filterProductCount = products.length;

  apiFeature.pagination(resultPerPage);

  // const products = await Product.find(); --> both line code work same but "Product.find()" use too much then we pass the querry
  products = await apiFeature.query.clone();
  res.status(200).json({
    success: true,
    products,
    productCount,
    resultPerPage,
    filterProductCount,
  });
});

// Get All Product (Admin)
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

//Get Product Details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const category = product.category;
  const currentProductSaltComposition = product.salt_composition;
  const currentProductPrice = product.price;

  const query = {
    category: category,
    _id: { $ne: product._id },
  };

  if (currentProductSaltComposition) {
    query.salt_composition = currentProductSaltComposition;
  }

  const similarProducts = await Product.find({
    ...query,
    ...(currentProductSaltComposition
      ? { salt_composition: { $ne: currentProductSaltComposition } }
      : {}),
  });

  const hasSimilarProducts = similarProducts.length > 0;
  const similarProductIds = similarProducts.map((p) => p._id);

  const substituteProducts = await Product.find({
    ...query,
    price: { $lt: currentProductPrice },
    _id: { $nin: similarProductIds },
  }).sort({ price: 1 });

  const hasSubstituteProducts =
    substituteProducts.length > 0 &&
    substituteProducts[0].price < currentProductPrice;

  const lowestPrice = substituteProducts[0]?.price;
  const percentageCheaper = lowestPrice
    ? Math.round(
        ((currentProductPrice - lowestPrice) / currentProductPrice) * 100
      )
    : 0;

  res.status(200).json({
    success: true,
    product,
    substituteProducts,
    hasSubstituteProducts,
    lowestPrice,
    percentageCheaper,
    similarProducts,
    hasSimilarProducts,
  });
});

//Update Product
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  //   /**----> Images start here */
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    /*** delete images from cloudinary */
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.images = imagesLinks;
  } /***images end */

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//Delete Product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  /**-------> Deleting Images From Cloudinary*******************/
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
});
