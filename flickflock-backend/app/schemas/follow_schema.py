from marshmallow import Schema, fields

class FollowSchema(Schema):
    id = fields.Int(dump_only=True)
    follower_id = fields.Int(required=True)  
    followed_id = fields.Int(required=True)  
    created_at = fields.DateTime(dump_only=True)
