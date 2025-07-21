# app/routes/users.py
from flask import Blueprint, request, jsonify
from app import db
from app.models.user import User

user_bp = Blueprint('user_bp', __name__, url_prefix='/api/users')

@user_bp.route('', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.username for user in users])

@user_bp.route('/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get_or_404(id)
    return jsonify({"username": user.username, "email": user.email})

@user_bp.route('', methods=['POST'])
def create_user():
     data = request.get_json()
     email = data.get("email")
     password = data.get("password")
 
     if User.query.filter_by(email=email).first():
         return {"msg": "Email already registered"}, 409

     new_user = User(email=email)
     new_user.set_password(password)

     db.session.add(new_user)
     db.session.commit()
     return {"msg": "User registered successfully"}, 201

@user_bp.route('/<int:id>', methods=['PUT'])
def update_user(id):
    user = User.query.get_or_404(id)
    data = request.get_json()
    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)
    db.session.commit()
    return jsonify({"message": "User updated"})

@user_bp.route('/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted"})

