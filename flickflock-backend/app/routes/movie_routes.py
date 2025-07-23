# app/routes/movies_series.py
from flask import Blueprint, request, jsonify
from flask_restful import Resource
from flask import request
from app import db
from ..models.movie_series import MovieSeries
from flask_jwt_extended import jwt_required


movies_bp = Blueprint('movies_bp', __name__, url_prefix='/api/movies')

@jwt_required
@movies_bp.route('', methods=['GET'])
def get_movies():
    movies = MovieSeries.query.all()
    return jsonify([movie.title for movie in movies])

@jwt_required
@movies_bp.route('/<int:id>', methods=['GET'])
def get_movie(id):
    movie = MovieSeries.query.get_or_404(id)
    return jsonify({"title": movie.title, "description": movie.description, "type": movie.type})

@jwt_required
@movies_bp.route('', methods=['POST'])
def create_movie():
    data = request.get_json()
    movie = MovieSeries(title=data['title'], description=data.get('description'), genre=data.get('genre'), type=data['type'])
    db.session.add(movie)
    db.session.commit()
    return jsonify({"message": "Movie/Series created"}), 201

@jwt_required
@movies_bp.route('/<int:id>', methods=['PUT'])
def update_movie(id):
    movie = MovieSeries.query.get_or_404(id)
    data = request.get_json()
    movie.title = data.get('title', movie.title)
    movie.description = data.get('description', movie.description)
    db.session.commit()
    return jsonify({"message": "Movie/Series updated"})

@jwt_required
@movies_bp.route('/<int:id>', methods=['DELETE'])
def delete_movie(id):
    movie = MovieSeries.query.get_or_404(id)
    db.session.delete(movie)
    db.session.commit()
    return jsonify({"message": "Movie/Series deleted"})


class MoviesResourceSearch(Resource):
    def get(self):
        # Get query params
        search = request.args.get('search', '', type=str)
        page = request.args.get('page', 1, type=int)
        limit = request.args.get('limit', 10, type=int)
        offset = (page - 1) * limit

        # Base query with optional search
        query = MovieSeries.query
        if search:
            query = query.filter(MovieSeries.title.ilike(f"%{search}%"))

        total = query.count()
        movies = query.offset(offset).limit(limit).all()

        return {
            "page": page,
            "limit": limit,
            "total": total,
            "search": search,
            "results": [movie.to_dict() for movie in movies]
        }, 200