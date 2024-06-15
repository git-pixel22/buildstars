import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js"; // Assuming there's a User model
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Like } from '../models/like.model.js';

const toggleUserLike = async (likedUserId, userId) => {
    if (!isValidObjectId(likedUserId)) throw new ApiError(400, "Invalid Liked User Id");
    if (!isValidObjectId(userId)) throw new ApiError(400, "Invalid User Id");

    const likedUser = await User.findById(likedUserId);
    if (!likedUser) throw new ApiError(404, "No User Found");

    const isLiked = await Like.findOne({ user: likedUserId, likedBy: userId });

    let response;
    try {
        response = isLiked ?
            await Like.deleteOne({ user: likedUserId, likedBy: userId }) :
            await Like.create({ user: likedUserId, likedBy: userId });
    } catch (error) {
        console.error("toggleUserLike error ::", error);
        throw new ApiError(500, error?.message || "Internal server error in toggleUserLike");
    }

    return { response, isLiked };
}

const toggleUserLikeHandler = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { response, isLiked } = await toggleUserLike(userId, req.user?._id);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { response },
                isLiked ? "Removed Like Successfully" : "Liked Successfully"
            )
        );
});

export { toggleUserLikeHandler };
