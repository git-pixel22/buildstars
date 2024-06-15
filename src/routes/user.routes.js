import { Router } from "express";
import { 
    logoutUser, 
    loginUser, 
    registerUser, 
    refreshAccessToken, 
    changePassword, 
    getCurrentUser, 
    updateAvatar, 
    getUserProfile, } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
    ]),
    registerUser
)

router.route("/login").post(loginUser)


// secured routes (routes for logged in users)
router.route("/logout").post(verifyJWT ,logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changePassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-avatar").patch(verifyJWT, upload.single("avatar"), updateAvatar)
router.route("/u/:username").get(verifyJWT, getUserProfile)

export default router