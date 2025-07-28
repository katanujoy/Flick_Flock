from flask import request
from flask_restful import Resource
from ..models.watchlist import Watchlist
from ..models.movie_series import MovieSeries
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
        
        existing = Watchlist.query.filter_by(
            user_id=user_id,
            movie_series_id=validated_data["movie_series_id"]
        ).first()
        if existing:
            return {"message": "Movie already in watchlist"}, 400

        new_watchlist = Watchlist(
             user_id=user_id,
            movie_series_id=validated_data["movie_series_id"]
        )

        db.session.add(new_watchlist)
        db.session.commit()

        return watchlist_schema.dump(new_watchlist), 201

    @jwt_required()
    def delete(self):
        data = request.get_json()

        watchlist_id = data.get("id")
        if not watchlist_id:
            return {"error": "Watchlist ID is required"}, 400

        watchlist = Watchlist.query.get(watchlist_id)
        if not watchlist:
            return {"error": "Watchlist entry not found"}, 404

        current_user = get_jwt_identity()
        if watchlist.user_id != current_user:
            return {"error": "Unauthorized"}, 403

        deleted_data = watchlist_schema.dump(watchlist)

        db.session.delete(watchlist)
        db.session.commit()

        return {
            "message": "Watchlist entry deleted",
            "deleted": deleted_data
        }, 200


# SEARCH API
class WatchlistResourceSearch(Resource):
    def get(self):
        search = request.args.get('search', '', type=str)
        page = request.args.get('page', 1, type=int)
        limit = request.args.get('limit', 10, type=int)
        offset = (page - 1) * limit

        query = db.session.query(Watchlist).join(MovieSeries)
        if search:
            query = query.filter(MovieSeries.title.ilike(f"%{search}%"))

        total = query.count()
        movies = query.offset(offset).limit(limit).all()

        return {
            "page": page,
            "limit": limit,
            "total": total,
            "search": search,
            "results": watchlist_schema_many.dump(movies)
        }, 200
