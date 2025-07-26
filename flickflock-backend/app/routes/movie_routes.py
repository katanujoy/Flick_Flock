from flask import Blueprint, request, jsonify
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from ..models.movie_series import MovieSeries
from ..schemas.movie_schema import MovieSeriesSchema


movies_bp = Blueprint('movies_bp', __name__, url_prefix='/api/movies')
schema = MovieSeriesSchema()
schemas = MovieSeriesSchema(many=True)

@jwt_required()
@movies_bp.route('', methods=['GET'])
def get_movies():
    movies = MovieSeries.query.all()
    return jsonify(schemas.dump(movies)), 200

@jwt_required()
@movies_bp.route('/<int:id>', methods=['GET'])
def get_movie(id):
    movie = MovieSeries.query.get_or_404(id)
    return jsonify(schema.dump(movie)), 200

@jwt_required()
@movies_bp.route('', methods=['POST'])
def create_movie():
    data = request.get_json()
    try:
        validated_data = schema.load(data)
        movie = MovieSeries(**validated_data)
        db.session.add(movie)
        db.session.commit()
        return jsonify(schema.dump(movie)), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@jwt_required()
@movies_bp.route('/<int:id>', methods=['PUT'])
def update_movie(id):
    movie = MovieSeries.query.get_or_404(id)
    data = request.get_json()
    try:
        validated_data = schema.load(data, partial=True)
        for key, value in validated_data.items():
            setattr(movie, key, value)
        db.session.commit()
        return jsonify(schema.dump(movie)), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@jwt_required
@movies_bp.route('/<int:id>', methods=['DELETE'])
def delete_movie(id):
    movie = MovieSeries.query.get_or_404(id)
    db.session.delete(movie)
    db.session.commit()
    return jsonify({"message": "Movie/Series deleted"}), 200


class MoviesResourceSearch(Resource):
    @jwt_required()
    def get(self):
        search = request.args.get('search', '', type=str)
        page = request.args.get('page', 1, type=int)
        limit = request.args.get('limit', 10, type=int)
        offset = (page - 1) * limit

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
            "results": schema.dump(movies, many=True)
        }, 200

