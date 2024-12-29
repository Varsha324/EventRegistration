const express = require("express");
const router = express.Router();
const {getEvent,getEvents,deleteEvents,updateEvents,createEvents} = require('../controllers/registrationcontroller');
router.route("/").get(getEvents)

router.route("/").post(createEvents);

router.route("/:id").put(updateEvents);

router.route("/:id").delete(deleteEvents);

router.route("/:id").get(getEvent);


module.exports = router;