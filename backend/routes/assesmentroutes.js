const express = require("express");
const router = express.Router();
const {getAllAssesment,getAssesment,updateAssesment,createAssesments} = require('../controllers/assesmentcontroller')
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);

router.route("/").post(createAssesments);
router.route("/all").get(getAllAssesment);
router.route("/").get(getAssesment);
router.route("/:id").put(updateAssesment)

module.exports = router;