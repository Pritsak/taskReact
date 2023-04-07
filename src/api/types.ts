import { Comment } from "../models/comment";

export interface ProductPayloadRequest {
    imageUrl: string;
    name: string;
    count: number;
    size: {
        width: number;
        height: number;
    }
    weight: string;
    comments: Array<Comment>
}