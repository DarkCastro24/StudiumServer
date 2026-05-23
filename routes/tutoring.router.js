const express = require("express");
const router = express.Router();

const tutoringController = require("../controllers/tutoring.controller");
const { authentication, authorization } = require("../middleware/auth.middleware");
const { isOwnerOrAdmin, canAccessResources } = require("../middleware/ownership.middleware");

// /api/tutoring/...
// obtener los nombres de usuario de todos los tutorados de un curso
router.get("/email/:cursoId", 
    authentication,
    isOwnerOrAdmin,
    tutoringController.getTutorings);

router.get("/:cursoId", 
    authentication,
    canAccessResources,
    tutoringController.getAll);

router.post("/:cursoId", 
    authentication,
    isOwnerOrAdmin,
    tutoringController.save);

router.delete("/:cursoId/:username",
    authentication,
    isOwnerOrAdmin,
    tutoringController.delete);

module.exports = router;