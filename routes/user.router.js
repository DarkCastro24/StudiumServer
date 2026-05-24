const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { authentication, authorization } = require("../middleware/auth.middleware");
const {isOwner} = require("../middleware/ownership.middleware");
const ROLES = require("../data/roles.constants.json");

// /api/user/... 

// GET ALL users, preffered for admin users only
router.get("/",
    authentication,
    authorization([ROLES.ADMIN, ROLES.SYSADMIN]),
    userController.getAll
);

// post a subject of interest for themselves, only the users for themselves
router.post("/profile/:userId/",
    authentication,
    authorization(ROLES.USER),
    isOwner,
    userController.addSubject
);

// delete a subject only owner can delete its own interest
router.delete("/profile/:userId/:subjectId",
    authentication,
    authorization(ROLES.USER),
    isOwner,
    userController.deleteSubject
);

// GET a profile, everyone authenticated can look for someones profile
router.get("/profile/:userId",
    authentication,
    userController.getProfile
);

// Filter users for search, everyone authenticated can search
router.post('/filter',
    authentication,
    userController.filterUsers);

// update the user profile
router.patch("/profile/:userId",
    authentication,
    isOwner,
    userController.updateProfile
);

// update password
router.put("/profile/:userId",
    authentication,
    isOwner,
    userController.updatePassword
);

// delete user account, only admin can
router.delete("/:userId",
    authentication,
   authorization(ROLES.ADMIN, ROLES.SYSADMIN),
    userController.deleteUser
);

module.exports = router;
