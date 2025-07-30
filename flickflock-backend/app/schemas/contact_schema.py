from marshmallow import Schema, fields

class ContactMessageSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    email = fields.Email(required=True)
    subject = fields.Str(allow_none=True)
    message = fields.Str(required=True)
    created_at = fields.DateTime(dump_only=True)
