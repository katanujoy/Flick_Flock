from flask_restful import Resource
from flask import request
from models.clubs import Club
from ..config import db

class ClubRoute(Resource):
    def get(self):
        clubs = Club.query.all()
        return [club.to_dict() for club in clubs], 200

    def post(self):
        data = request.get_json()
        user_id = data.get("created_by")  # Replace with session-based ID

        new_club = Club(
            name=data.get("name"),
            description=data.get("description"),
            genre=data.get("genre"),
            created_by=user_id
        )

        db.session.add(new_club)
        db.session.commit()

        return new_club.to_dict(), 201

    def patch(self):
        data = request.get_json()

        club_id = data.get("id")
        if not club_id:
            return {"error": "Club ID is required"}, 400

        club = Club.query.get(club_id)
        if not club:
            return {"error": "Club not found"}, 404

        # Update only fields provided
        if "name" in data:
            club.name = data["name"]
        if "description" in data:
            club.description = data["description"]
        if "genre" in data:
            club.genre = data["genre"]

        db.session.commit()

        return club.to_dict(), 200

    def delete(self):
        data = request.get_json()

        club_id = data.get("id")
        if not club_id:
            return {"error": "Club ID is required"}, 400

        club = Club.query.get(club_id)
        if not club:
            return {"error": "Club not found"}, 404
        
        club_dict = club.to_dict()

        db.session.delete(club)
        db.session.commit()

        return club_dict, 200
