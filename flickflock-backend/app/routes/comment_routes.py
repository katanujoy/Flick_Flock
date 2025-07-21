from flask import request, jsonify
from flask_restful import Resource
from models.comments import Comment  
from ..config import db

class CommentResource(Resource):

    def get(self):
        comments = Comment.query.all()
        return [comment.to_dict() for comment in comments], 200

    def post(self):
        data = request.get_json()

        user_id = data.get("user_id") # implement and replace with JWT auth 
        post_id = data.get("post_id")
        content = data.get("content")

        if not user_id or not post_id or not content:
            return {"message": "Missing required fields"}, 400

        comment = Comment(
            user_id=user_id,
            post_id=post_id,
            content=content
        )

        db.session.add(comment)
        db.session.commit()

        return comment.to_dict(), 201

    def patch(self):
        data = request.get_json()
        comment_id = data.get("id")
        content = data.get("content")

        if not comment_id:
            return {"message": "Missing comment ID"}, 400

        comment = Comment.query.get(comment_id)

        if not comment:
            return {"message": "Comment not found"}, 404

        if content:
            comment.content = content

        db.session.commit()
        return comment.to_dict(), 200
    
    def delete(self):
        data = request.get_json()

        comment_id = data.get("id")
        if not comment_id:
            return {
                "error": "Comment ID is required"
            }, 400


        comment = Comment.query.get(comment_id)
        if not comment:
            return {
                "error": "Comment not found"
            }, 404

        comment_dict = comment.to_dict()

        db.session.delete(comment)
        db.session.commit()

        return comment_dict, 200
