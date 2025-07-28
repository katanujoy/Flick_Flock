from marshmallow import Schema, fields

class CommentSchema(Schema):
    id = fields.Int(dump_only=True)  
    user_id = fields.Int(required=True)
    post_id = fields.Int(required=True)
    content = fields.Str(required=True) 
    created_at = fields.DateTime(dump_only=True)  