import { Body, Route, Tags } from "tsoa";
import type { NewComment } from "../models/Comment";
import type { CommentCreationResponse } from "../types";
import { PrismaClient } from "@prisma/client";

@Route("/posts/:id/comments")
@Tags("Comments")
export class CommentsControler {

  prisma = new PrismaClient();

  public async createComment(@Body() comment: NewComment): Promise<CommentCreationResponse> {

    console.table(comment);

    try {
      const newPost = await this.prisma.comment.create({
        data: {
          Content: comment.Content,
          postId: comment.postId,
          userId: comment.userId
        },
      }); 

      return {
        message: "¡Comentario creado!",
        comment: newPost
      }
    }
    catch (error) {
      throw error;
    }
    finally {
      await this.prisma.$disconnect();
    }
  }


}