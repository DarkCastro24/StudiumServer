const express = require("express");
const router = express.Router();

const tutoringController = require("../controllers/tutoring.controller");

// /api/tutoring/...
router.get("/email/:cursoId", 
    tutoringController.getTutorings);

router.get("/:cursoId", 
    tutoringController.getAll);

router.post("/:cursoId", 
    tutoringController.save);

router.delete("/:cursoId/:username",
    tutoringController.delete);

module.exports = router;