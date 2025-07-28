from flask import Blueprint, request, jsonify
from app import db
from ..models.user import User

user_bp = Blueprint('user_bp', __name__, url_prefix='/api/users')

@user_bp.route('', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.username for user in users])

@user_bp.route('/<int:id>', methods=['GET', 'PUT', 'PATCH', 'DELETE'])
def handle_user(id):
    user = User.query.get_or_404(id)

    if request.method == 'GET':
        return jsonify({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "bio": user.bio,
            "favorite_genres": user.favorite_genres
        })

    elif request.method == 'PUT':
        data = request.get_json()
        user.username = data.get('username')
        user.email = data.get('email')
        user.bio = data.get('bio', '')
        user.favorite_genres = data.get('favorite_genres', [])
        db.session.commit()
        return jsonify({"message": "User fully updated"})

    elif request.method == 'PATCH':
        data = request.get_json()
        if 'username' in data:
            user.username = data['username']
        if 'email' in data:
            user.email = data['email']
        if 'bio' in data:
            user.bio = data['bio']
        if 'favorite_genres' in data:
            user.favorite_genres = data['favorite_genres']
        db.session.commit()
        return jsonify({"message": "User partially updated"})

    elif request.method == 'DELETE':
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User deleted"})

@user_bp.route('/register', methods=['POST'])
def create_user():
    data = request.get_json()

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    bio = data.get("bio", "")
    favorite_genres = data.get("favorite_genres", [])

    if User.query.filter((User.email == email) | (User.username == username)).first():
        return {"msg": "Email or username already registered"}, 409

    new_user = User(
        username=username,
        email=email,
        bio=bio,
        favorite_genres=favorite_genres
    )
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return {"msg": "User registered successfully"}, 201

@user_bp.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()

    if user and user.check_password(password):
        return jsonify({
            "success": True,
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "bio": user.bio,
                "favorite_genres": user.favorite_genres
            }
        })
    else:
        return jsonify({"success": False, "message": "Invalid username or password"}), 401
