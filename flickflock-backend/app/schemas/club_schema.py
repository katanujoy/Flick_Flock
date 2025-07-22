from marshmallow import fields, Schema

class ClubSchema(Schema):

    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    description = fields.Str(required=True)
    genre = fields.Str(allow_none=True)
    created_by = fields.Int(required=True)
    created_at = fields.DateTime(dump_only=True)