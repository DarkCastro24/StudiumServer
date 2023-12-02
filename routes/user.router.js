const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

// /api/user/... 
router.get("/", 
    userController.getAll
);

router.post("/profile/:userId/", 
    userController.addSubject
);

router.delete("/profile/:userId/:subjectId", 
    userController.deleteSubject
);

router.get("/profile/:userId", 
    userController.getProfile
);

router.post('/filter', 
    userController.filterUsers);

router.patch("/profile/:userId", 
    userController.updateProfile
);

router.delete("/:userId", 
    userController.deleteUser
);

module.exports = router;
