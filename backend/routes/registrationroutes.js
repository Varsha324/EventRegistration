const express = require("express");
const router = express.Router();
const {getEvent,getEvents,deleteEvents,updateEvents,createEvents,getAllEvents} = require('../controllers/registrationcontroller');
const validateToken = require("../middleware/validateTokenHandler");



router.use(validateToken);

router.route("/all").get(getAllEvents)

router.route("/").get(getEvents)

router.route("/").post(createEvents);

router.route("/:id").put(updateEvents);

router.route("/:id").delete(deleteEvents);

router.route("/:id").get(getEvent);




module.exports = router;