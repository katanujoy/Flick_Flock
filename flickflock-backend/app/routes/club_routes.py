from flask_restful import Resource
from flask import request
from ..models.clubs import Club
from app import db
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..schemas.club_schema import ClubSchema
from marshmallow import ValidationError

class ClubResource(Resource):
    @jwt_required()
    def get(self):
        clubs = Club.query.all()
        return [club.to_dict() for club in clubs], 200

    @jwt_required()
    def post(self):
        data = request.get_json()
        user_id = get_jwt_identity()

        schema = ClubSchema()
        try:
            validated_data = schema.load(data)
        except ValidationError as err:
            return {"errors": err.messages}, 400

        new_club = Club(
            name=validated_data["name"],
            description=validated_data["description"],
            genre=validated_data["genre"],
            created_by=user_id
        )

        db.session.add(new_club)
        db.session.commit()

        return schema.dump(new_club), 201

    @jwt_required()
    def patch(self):
        data = request.get_json()

        club_id = data.get("id")
        if not club_id:
            return {"error": "Club ID is required"}, 400

        club = Club.query.get(club_id)
        if not club:
            return {"error": "Club not found"}, 404

        schema = ClubSchema()
        try:
            validated_data = schema.load(data, partial=True)
        except ValidationError as err:
            return {"errors": err.messages}, 400

        # Apply updates using validated fields only
        for field, value in validated_data.items():
            setattr(club, field, value)

        db.session.commit()
        return schema.dump(club), 200

    @jwt_required()
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
