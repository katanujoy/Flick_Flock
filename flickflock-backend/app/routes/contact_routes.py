from flask import Blueprint, request, jsonify
from marshmallow import ValidationError
from app import db
from ..models.contact import ContactMessage
from ..schemas.contact_schema import ContactMessageSchema

contact_bp = Blueprint('contact_bp', __name__)
schema = ContactMessageSchema()

@contact_bp.route('/contact', methods=['POST'])
def create_contact_message():
    try:
        data = request.get_json()
        validated = schema.load(data)
        message = ContactMessage(**validated)
        db.session.add(message)
        db.session.commit()
        return schema.dump(message), 201
    except ValidationError as err:
        return {"errors": err.messages}, 400
