# app/routes/membership_routes.py

from flask import Blueprint, request, jsonify
from ..models.membership import Membership
from app import db
from flask_jwt_extended import jwt_required

membership_bp = Blueprint('membership_bp', __name__)

@membership_bp.route('/memberships', methods=['GET'])
@jwt_required()
def get_memberships():
    memberships = Membership.query.all()
    return jsonify([m.serialize() for m in memberships])

@membership_bp.route('/memberships/<int:id>', methods=['GET'])
@jwt_required()
def get_membership(id):
    membership = Membership.query.get_or_404(id)
    return jsonify(membership.serialize())

@membership_bp.route('/memberships', methods=['POST'])
@jwt_required()
def create_membership():
    data = request.get_json()
    membership = Membership(**data)
    db.session.add(membership)
    db.session.commit()
    return jsonify(membership.serialize()), 201

@membership_bp.route('/memberships/<int:id>', methods=['PATCH'])
@jwt_required()
def update_membership(id):
    membership = Membership.query.get_or_404(id)
    data = request.get_json()
    for key, value in data.items():
        setattr(membership, key, value)
    db.session.commit()
    return jsonify(membership.serialize())

@membership_bp.route('/memberships/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_membership(id):
    membership = Membership.query.get_or_404(id)
    db.session.delete(membership)
    db.session.commit()
    return jsonify({"message": "Deleted"})
