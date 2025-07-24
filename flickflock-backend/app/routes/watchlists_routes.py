from flask import request
from flask_restful import Resource
from ..models.watchlist import Watchlist
from app import db
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..schemas.watchlist_schema import WatchlistSchema
from marshmallow import ValidationError

watchlist_schema = WatchlistSchema()
watchlist_schema_many = WatchlistSchema(many=True)

class WatchlistResource(Resource):

    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        watchlists = Watchlist.query.filter_by(user_id=user_id).all()
        return watchlist_schema_many.dump(watchlists), 200

    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        data = request.get_json()

        try:
            validated_data = watchlist_schema.load(data)
        except ValidationError as err:
            return {"errors": err.messages}, 400

        new_watchlist = Watchlist(
            user_id=user_id,
            movie_series_id=validated_data["movie_series_id"],
            status=validated_data["status"],
            notes=validated_data.get("notes")
        )

        db.session.add(new_watchlist)
        db.session.commit()

        return watchlist_schema.dump(new_watchlist), 201

    @jwt_required()
    def delete(self):
        data = request.get_json()
        watchlist_id = data.get("id")
        if not watchlist_id:
            return {"message": "Watchlist ID is required"}, 400

        watchlist = Watchlist.query.get_or_404(watchlist_id, description="Watchlist entry not found")

        current_user = get_jwt_identity()
        if watchlist.user_id != current_user:
            return {"error": "Unauthorized"}, 403

        response = watchlist_schema.dump(watchlist)

        db.session.delete(watchlist)
        db.session.commit()

        return response, 200
