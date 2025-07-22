from flask import request
from flask_restful import Resource
from ..models.recommendations import Recommendation
from app import db
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..schemas.recommendation_schema import RecommendationSchema
from marshmallow import ValidationError

recommendation_schema = RecommendationSchema()
recommendation_schema_many = RecommendationSchema(many=True)

class RecommendationResource(Resource):

    @jwt_required()
    def get(self):
        recommendations = Recommendation.query.all()
        return recommendation_schema_many.dump(recommendations), 200

    @jwt_required()
    def post(self):
        data = request.get_json()
        user_id = get_jwt_identity()

        try:
            validated_data = recommendation_schema.load(data)
        except ValidationError as err:
            return {"errors": err.messages}, 400

        new_recommendation = Recommendation(
            user_id=user_id,
            movie_series_id=validated_data["movie_series_id"],
            recommended_reason=validated_data.get("recommended_reason")
        )

        db.session.add(new_recommendation)
        db.session.commit()
        return recommendation_schema.dump(new_recommendation), 201

    @jwt_required()
    def patch(self):
        data = request.get_json()
        recommendation_id = data.get("id")

        if not recommendation_id:
            return {"message": "Missing recommendation ID"}, 400

        recommendation = Recommendation.query.get(recommendation_id)
        if not recommendation:
            return {"message": "Recommendation not found"}, 404

        current_user = get_jwt_identity()
        if recommendation.user_id != current_user:
            return {"error": "Unauthorized"}, 403

        if "recommended_reason" in data:
            recommendation.recommended_reason = data["recommended_reason"]

        db.session.commit()
        return recommendation_schema.dump(recommendation), 200

    @jwt_required()
    def delete(self):
        data = request.get_json()
        recommendation_id = data.get("id")

        if not recommendation_id:
            return {"message": "Recommendation ID is required"}, 400

        recommendation = Recommendation.query.get_or_404(
            recommendation_id,
            description="Recommendation not found"
        )

        current_user = get_jwt_identity()
        if recommendation.user_id != current_user:
            return {"error": "Unauthorized"}, 403

        response = recommendation_schema.dump(recommendation)

        db.session.delete(recommendation)
        db.session.commit()

        return response, 200
