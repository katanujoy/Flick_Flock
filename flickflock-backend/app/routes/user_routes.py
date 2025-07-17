from flask import Blueprint, jsonify

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/users')
def get_users():
    return jsonify({"message": "Hello from user routes!"})
