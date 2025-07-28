from marshmallow import Schema, fields

class ReportSchema(Schema):
    id = fields.Int(dump_only=True)
    reporter_id = fields.Int(required=True)
    post_id = fields.Int(required=True)
    reason = fields.Str(allow_none=True)
    status = fields.Str(dump_only=True)  
    created_at = fields.DateTime(dump_only=True)
