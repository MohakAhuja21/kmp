const Prescription = require("../models/prescriptionModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/errorhandler");

exports.createPrescription = catchAsyncError(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.uploader.upload(images[i], {
      folder: "prescriptions",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id; //get user id for whom the prescription is created

  const prescription = await Prescription.create(req.body);

  res.status(201).json({
    success: true,
    prescription,
  });
});

exports.getAdminPrescriptions = catchAsyncError(async (req, res, next) => {
  const prescriptions = await Prescription.find();

  res.status(200).json({
    success: true,
    prescriptions,
  });
});

exports.deletePrescription = catchAsyncError(async (req, res, next) => {
    const prescription = await Prescription.findById(req.params.id);
    if (!prescription) {
      return next(new ErrorHandler("Prescription not found", 404));
    }
  
    /**-------> Deleting Images From Cloudinary*******************/
    for (let i = 0; i < prescription.images.length; i++) {
      await cloudinary.uploader.destroy(prescription.images[i].public_id);
    }
  
    await prescription.remove();
    
    res.status(200).json({
      success: true,
      message: "Prescription deleted successfully",
    });
  });

  exports.getAllPrescriptions = catchAsyncError(async (req, res, next) => {
    const prescriptions = await Prescription.find({ user: req.user.id });
  
    res.status(200).json({
      success: true,
      prescriptions,
    });
  });
  
