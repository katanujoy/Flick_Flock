from flask import request
from flask_restful import Resource
from models.recommendations import Recommendation
from app import db
from flask_jwt_extended import jwt_required


class RecommendationResource(Resource):

    @jwt_required
    def get(self):
        recommendations = Recommendation.query.all()
        return [recommendation.to_dict() for recommendation in recommendations], 200

    @jwt_required
    def post(self):
        data = request.get_json()

        user_id = data.get("user_id") #replace with  JWT auth
        movie_series_id = data.get("movie_series_id")
        recommended_reason = data.get("recommended_reason")

        if not user_id or not movie_series_id:
            return {"message": "user_id and movie_series_id are required"}, 400

        recommendation = Recommendation(
            user_id=user_id,
            movie_series_id=movie_series_id,
            recommended_reason=recommended_reason
        )

        db.session.add(recommendation)
        db.session.commit()
        return recommendation.to_dict(), 201

    @jwt_required
    def patch(self):
        data = request.get_json()
        recommendation_id = data.get("id")

        if not recommendation_id:
            return {"message": "Missing recommendation ID"}, 400

        recommendation = Recommendation.query.get(recommendation_id)
        if not recommendation:
            return {"message": "Recommendation not found"}, 404

        recommendation.recommended_reason = data.get("recommended_reason", recommendation.recommended_reason)
        db.session.commit()
        return recommendation.to_dict(), 200

    @jwt_required   
    def delete(self):
        data = request.get_json()
        recommendation_id = data.get("id")

        if not recommendation_id:
            return {"message": "Recommendation ID is required"}, 400

        recommendation = Recommendation.query.get_or_404(recommendation_id, description="Recommendation not found")
        recommendation_dict = recommendation.to_dict()

        db.session.delete(recommendation)
        db.session.commit()

        return recommendation_dict, 200

