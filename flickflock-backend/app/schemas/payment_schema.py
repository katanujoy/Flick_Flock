from marshmallow import Schema, fields

class PaymentSchema(Schema):
    id = fields.Int(dump_only=True)
    user_id = fields.Int(required=True)
    amount = fields.Float(required=True)
    currency = fields.Str(dump_default='KES')
    status = fields.Str(dump_default='pending')
    purpose = fields.Str()
    phone_number = fields.Str(required=True)
    transaction_id = fields.Str()
    created_at = fields.DateTime(dump_only=True)
