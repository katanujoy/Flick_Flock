from marshmallow import Schema, fields

class RecommendationSchema(Schema):
    id = fields.Int(dump_only=True)
    user_id = fields.Int(dump_only=True)
    movie_series_id = fields.Int(required=True)
    recommended_reason = fields.Str(allow_none=True)
    created_at = fields.DateTime(dump_only=True)
