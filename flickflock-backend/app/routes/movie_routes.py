from flask import Blueprint, request, jsonify
from app import db
from app.models.movies_series import MovieSeries

movies_bp = Blueprint('movies_bp', __name__, url_prefix='/api/movies')

@movies_bp.route('', methods=['GET'])
def get_movies():
    movies = MovieSeries.query.all()
    return jsonify([
        {
            "id": movie.id,
            "title": movie.title,
            "description": movie.description,
            "genre": movie.genre,
            "type": movie.type
        } for movie in movies
    ])

@movies_bp.route('/<int:id>', methods=['GET'])
def get_movie(id):
    movie = MovieSeries.query.get_or_404(id)
    return jsonify({
        "id": movie.id,
        "title": movie.title,
        "description": movie.description,
        "genre": movie.genre,
        "type": movie.type
    })

@movies_bp.route('', methods=['POST'])
def create_movie():
    data = request.get_json()
    try:
        movie = MovieSeries(
            title=data['title'],
            description=data.get('description'),
            genre=data.get('genre'),
            type=data['type']
        )
        db.session.add(movie)
        db.session.commit()
        return jsonify({"message": "Movie/Series created", "id": movie.id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@movies_bp.route('/<int:id>', methods=['PUT'])
def update_movie(id):
    movie = MovieSeries.query.get_or_404(id)
    data = request.get_json()
    movie.title = data.get('title', movie.title)
    movie.description = data.get('description', movie.description)
    movie.genre = data.get('genre', movie.genre)
    movie.type = data.get('type', movie.type)
    db.session.commit()
    return jsonify({"message": "Movie/Series updated"})

@movies_bp.route('/<int:id>', methods=['DELETE'])
def delete_movie(id):
    movie = MovieSeries.query.get_or_404(id)
    db.session.delete(movie)
    db.session.commit()
    return jsonify({"message": "Movie/Series deleted"})
