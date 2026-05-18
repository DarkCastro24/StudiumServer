const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const {authentication, authorization} = require("../middleware/auth.middleware");
const ROLES = require("../data/roles.constants.json");

// /api/user/... 
router.get("/", 
    // authentication,
    // authorization(ROLES.ADMIN),
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

router.put("/profile/:userId", 
    userController.updatePassword
);

router.delete("/:userId", 
    userController.deleteUser
);

module.exports = router;
