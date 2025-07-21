from flask import request
from flask_restful import Resource
from models.watchlist import Watchlist
from ..config import db

class WatchlistResource(Resource):
    def get(self):
        watchlists = Watchlist.query.all()
        return [watchlist.to_dict() for watchlist in watchlists], 200

    def post(self):
        data = request.get_json()

        user_id = data.get("user_id") #implement JWT
        movie_series_id = data.get("movie_series_id")
        status = data.get("status")
        notes = data.get("notes")

        if not all([user_id,movie_series_id,status,notes]):
            return {"message": "user_id, movie_series_id, and status are required"}, 400

        watchlist = Watchlist(
            user_id=user_id,
            movie_series_id=movie_series_id,
            status=status,
            notes=notes
        )

        db.session.add(watchlist)
        db.session.commit()
        return watchlist.to_dict(), 201
    
    def delete(self):
        data = request.get_json()
        watchlist_id = data.get("id")

        if not watchlist_id:
            return {"message": "Watchlist ID is required"}, 400

        watchlist = Watchlist.query.get_or_404(watchlist_id, description="Watchlist entry not found")
        watchlist_dict = watchlist.to_dict()

        db.session.delete(watchlist)
        db.session.commit()

        return watchlist_dict, 200

   
