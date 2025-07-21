from flask import request
from flask_restful import Resource
from models.posts import Post
from app import db
from flask_jwt_extended import jwt_required


class PostResource(Resource):

    @jwt_required
    def get(self):
        posts = Post.query.all()
        return [post.to_dict() for post in posts], 200

    @jwt_required
    def post(self):
        data = request.get_json()

        user_id = data.get("user_id") # change implementation with JWT auth
        club_id = data.get("club_id")
        movie_series_id = data.get("movie_series_id")
        content = data.get("content")
        rating = data.get("rating")


        if not all([user_id, club_id, movie_series_id, content]):
            return {"message": "Missing required fields"}, 400

        new_post = Post(
            user_id=user_id,
            club_id=club_id,
            movie_series_id=movie_series_id,
            content=content,
            rating=rating,
        )

        db.session.add(new_post)
        db.session.commit()

        return new_post.to_dict(), 201

    @jwt_required
    def patch(self):
        data = request.get_json()

        post_id = data.get("id")
        content = data.get("content")
        rating = data.get("rating")

        if not post_id:
            return {"message": "Missing post ID"}, 400

        post = Post.query.get(post_id)
        if not post:
            return {"message": "Post not found"}, 404

        if content:
            post.content = content
        if rating is not None:
            post.rating = rating

        db.session.commit()
        return post.to_dict(), 200

    @jwt_required 
    def delete(self):
        data = request.get_json()

        post_id = data.get("id")
        if not post_id:
            return {"error": "Psot ID not found"}, 404
        
        post = Post.query.get_or_404(post_id, description = "Post not found")

        post_dict = post.to_dict()

        db.session.delete(post)
        db.session.commit()

        return post_dict, 200

