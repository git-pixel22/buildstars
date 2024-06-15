import mongoose, {Schema} from "mongoose";

const likeSchema = new Schema(
    {
        likedUser: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        likedByUser: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)

export const Like = mongoose.model("Like", likeSchema);