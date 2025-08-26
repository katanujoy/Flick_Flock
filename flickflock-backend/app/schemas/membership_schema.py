from marshmallow import Schema, fields

class MembershipSchema(Schema):
    id = fields.Int(dump_only=True)
    user_id = fields.Int(required=True)
    club_id = fields.Int(required=True)
    role = fields.Str(allow_none=True)
    joined_at = fields.DateTime(dump_only=True)
