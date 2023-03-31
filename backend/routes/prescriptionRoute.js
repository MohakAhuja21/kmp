const express = require("express");
const router = express.Router();
const {
  createPrescription,
  getAllPrescriptions,
  getAdminPrescriptions,
  deletePrescription,
} = require("../controllers/prescriptionController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/create").post(isAuthenticatedUser, createPrescription);

router
  .route("/allprescriptions")
  .get(isAuthenticatedUser, getAllPrescriptions);

router
  .route("/admin/prescriptions")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminPrescriptions);

router
  .route("/admin/prescription/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deletePrescription);

module.exports = router;
