from flask import request
from flask_restful import Resource
from ..models.posts import Post
from app import db
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..schemas.post_schema import PostSchema
from marshmallow import ValidationError

post_schema = PostSchema()
post_schema_many = PostSchema(many=True)

class PostResource(Resource):

    @jwt_required()
    def get(self):
        posts = Post.query.all()
        return post_schema_many.dump(posts), 200

    @jwt_required()
    def post(self):
        data = request.get_json()
        user_id = get_jwt_identity()

        try:
            validated_data = post_schema.load(data)
        except ValidationError as err:
            return {"errors": err.messages}, 400

        # Set the user_id from JWT
        new_post = Post(
            user_id=user_id,
            club_id=validated_data["club_id"],
            movie_series_id=validated_data["movie_series_id"],
            content=validated_data["content"],
            rating=validated_data.get("rating")
        )

        db.session.add(new_post)
        db.session.commit()

        return post_schema.dump(new_post), 201


class PostDetailResource(Resource):
    @jwt_required()
    def patch(self,post_id):
        post = Post.query.get(post_id)
        if not post:
            return {"message": "Post not found"}, 404

        current_user = get_jwt_identity()
        if post.user_id != current_user:
            return {"error": "Unauthorized"}, 403

        data = request.get_json()

        # Allow partial update
        if "content" in data:
            post.content = data["content"]
        if "rating" in data:
            post.rating = data["rating"]

        db.session.commit()
        return post_schema.dump(post), 200

    @jwt_required()
    def delete(self, post_id):
        post = Post.query.get(post_id)
        if not post:
            return {"error": "Post not found"}, 404

        current_user = get_jwt_identity()
        if post.user_id != current_user:
            return {"error": "Unauthorized"}, 403

        post_dict = post_schema.dump(post)
        db.session.delete(post)
        db.session.commit()

        return post_dict, 200
