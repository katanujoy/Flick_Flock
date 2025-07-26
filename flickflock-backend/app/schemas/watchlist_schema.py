from marshmallow import Schema, fields

class WatchlistSchema(Schema):
    id = fields.Int(dump_only=True)
    user_id = fields.Int(dump_only=True)
    movie_series_id = fields.Int(required=True)
