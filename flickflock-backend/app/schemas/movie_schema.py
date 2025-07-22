from marshmallow import Schema, fields, validate

class MovieSeriesSchema(Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str(required=True, validate=validate.Length(min=1, max=100))
    description = fields.Str(allow_none=True)
    genre = fields.Str(allow_none=True)
    type = fields.Str(required=True, validate=validate.OneOf(["movie", "series"]))
