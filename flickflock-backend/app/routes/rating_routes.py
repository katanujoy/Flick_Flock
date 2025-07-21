# CRUD for Ratings
# app/routes/rating_routes.py
from flask import Blueprint, request, jsonify
from app.models.rating import Rating
from app import db
from flask_jwt_extended import jwt_required


rating_bp = Blueprint('rating_bp', __name__)

@jwt_required
@rating_bp.route('/ratings', methods=['GET'])
def get_ratings():
    ratings = Rating.query.all()
    return jsonify([r.serialize() for r in ratings])

@jwt_required
@rating_bp.route('/ratings/<int:id>', methods=['GET'])
def get_rating(id):
    rating = Rating.query.get_or_404(id)
    return jsonify(rating.serialize())

@jwt_required
@rating_bp.route('/ratings', methods=['POST'])
def create_rating():
    data = request.get_json()
    rating = Rating(**data)
    db.session.add(rating)
    db.session.commit()
    return jsonify(rating.serialize()), 201

@jwt_required
@rating_bp.route('/ratings/<int:id>', methods=['PATCH'])
def update_rating(id):
    rating = Rating.query.get_or_404(id)
    data = request.get_json()
    for key, value in data.items():
        setattr(rating, key, value)
    db.session.commit()
    return jsonify(rating.serialize())

@jwt_required
@rating_bp.route('/ratings/<int:id>', methods=['DELETE'])
def delete_rating(id):
    rating = Rating.query.get_or_404(id)
    db.session.delete(rating)
    db.session.commit()
    return jsonify({"message": "Rating deleted"})
