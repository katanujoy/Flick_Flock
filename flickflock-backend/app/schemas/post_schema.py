from marshmallow import Schema, fields

class PostSchema(Schema):
    id = fields.Int(dump_only=True)
    user_id = fields.Int(dump_only=True)
    club_id = fields.Int(required=True)
    movie_series_id = fields.Int(required=True)
    content = fields.Str(allow_none=True)
    rating = fields.Int(allow_none=True)
    created_at = fields.DateTime(dump_only=True)
