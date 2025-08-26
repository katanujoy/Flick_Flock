from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from ..models.follow import Follow
from ..schemas.follow_schema import FollowSchema

follow_bp = Blueprint('follow_bp', __name__)

follow_schema = FollowSchema()
follows_schema = FollowSchema(many=True)


@follow_bp.route('/follows', methods=['GET'])
@jwt_required()
def get_follows():
    follows = Follow.query.all()
    return jsonify(follows_schema.dump(follows)), 200


@follow_bp.route('/follows/<int:id>', methods=['GET'])
@jwt_required()
def get_follow(id):
    follow = Follow.query.get_or_404(id)
    return jsonify(follow_schema.dump(follow)), 200


@follow_bp.route('/follows', methods=['POST'])
@jwt_required()
def create_follow():
    json_data = request.get_json()
    if not json_data:
        return jsonify({"error": "No input data provided"}), 400

    try:
        current_user_id = get_jwt_identity()
        json_data['follower_id'] = current_user_id
        data = follow_schema.load(json_data)
    except Exception as err:
        return jsonify({"error": str(err)}), 422

    follow = Follow(**data)
    db.session.add(follow)
    db.session.commit()

    return jsonify(follow_schema.dump(follow)), 201


@follow_bp.route('/follows/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_follow(id):
    follow = Follow.query.get_or_404(id)
    db.session.delete(follow)
    db.session.commit()
    return jsonify({"message": "Unfollowed"}), 200
