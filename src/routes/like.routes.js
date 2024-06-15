import { Router } from 'express';
import {
    toggleUserLikeHandler,
} from "../controllers/like.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/toggle/v/:userId").post(toggleUserLikeHandler);
export default router