# CRUD for Followers
# app/routes/follow_routes.py
from flask import Blueprint, request, jsonify
from app.models.follow import Follow
from app import db
from flask_jwt_extended import jwt_required


follow_bp = Blueprint('follow_bp', __name__)

@jwt_required
@follow_bp.route('/follows', methods=['GET'])
def get_follows():
    follows = Follow.query.all()
    return jsonify([f.serialize() for f in follows])

@jwt_required
@follow_bp.route('/follows/<int:id>', methods=['GET'])
def get_follow(id):
    follow = Follow.query.get_or_404(id)
    return jsonify(follow.serialize())

@jwt_required
@follow_bp.route('/follows', methods=['POST'])
def create_follow():
    data = request.get_json()
    follow = Follow(**data)
    db.session.add(follow)
    db.session.commit()
    return jsonify(follow.serialize()), 201

@jwt_required
@follow_bp.route('/follows/<int:id>', methods=['DELETE'])
def delete_follow(id):
    follow = Follow.query.get_or_404(id)
    db.session.delete(follow)
    db.session.commit()
    return jsonify({"message": "Unfollowed"})
