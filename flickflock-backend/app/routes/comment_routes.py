from flask import request
from flask_restful import Resource
from ..models.comments import Comment  
from app import db
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..schemas.comment_schema import CommentSchema
from marshmallow import ValidationError

class CommentResource(Resource):

    @jwt_required
    def get(self):
        comments = Comment.query.all()
        schema = CommentSchema(many=True)
        return schema.dump(comments), 200

    @jwt_required
    def post(self):
        data = request.get_json()
        user_id = get_jwt_identity()

        schema = CommentSchema()

        # Validate input
        try:
            validated_data = schema.load(data)
        except ValidationError as err:
            return {"errors": err.messages}, 400

        comment = Comment(
            user_id=user_id,
            post_id=validated_data["post_id"],
            content=validated_data["content"]
        )

        db.session.add(comment)
        db.session.commit()

        return schema.dump(comment), 201

    @jwt_required
    def patch(self):
        data = request.get_json()
        schema = CommentSchema(partial=True)

        # Validate input
        try:
            validated_data = schema.load(data)
        except ValidationError as err:
            return {"errors": err.messages}, 400

        comment_id = validated_data.get("id")
        if not comment_id:
            return {"message": "Missing comment ID"}, 400

        comment = Comment.query.get(comment_id)
        if not comment:
            return {"message": "Comment not found"}, 404

        # Apply updates
        if "content" in validated_data:
            comment.content = validated_data["content"]

        db.session.commit()
        return schema.dump(comment), 200

    @jwt_required   
    def delete(self):
        data = request.get_json()
        comment_id = data.get("id")

        if not comment_id:
            return {"error": "Comment ID is required"}, 400

        comment = Comment.query.get(comment_id)
        if not comment:
            return {"error": "Comment not found"}, 404

        schema = CommentSchema()
        comment_data = schema.dump(comment)

        db.session.delete(comment)
        db.session.commit()

        return comment_data, 200 
