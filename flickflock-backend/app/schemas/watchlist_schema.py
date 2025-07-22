from marshmallow import Schema, fields

class WatchlistSchema(Schema):
    id = fields.Int(dump_only=True)
    user_id = fields.Int(required=True)
    movie_series_id = fields.Int(required=True)
    status = fields.Str(required=True)
    notes = fields.Str()
    added_at = fields.DateTime(dump_only=True)

    
