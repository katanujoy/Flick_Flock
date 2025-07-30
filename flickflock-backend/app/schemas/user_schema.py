from marshmallow import Schema, fields

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True)
    email = fields.Email(required=True)
    password = fields.Str(load_only=True)
    bio = fields.Str(allow_none=True)
    favorite_genres = fields.List(fields.Str(), allow_none=True)
    created_at = fields.DateTime(dump_only=True)