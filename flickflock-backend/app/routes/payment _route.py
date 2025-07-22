from flask import Blueprint, request, jsonify
from app import db
from app.models.payment import Payment
from app.schemas.payment_schema import payment_schema
from sqlalchemy.exc import IntegrityError

payments_bp = Blueprint('payments', __name__)

@payments_bp.route('/payments/mpesa', methods=['POST'])
def create_mpesa_payment():
    data = request.get_json()

    required_fields = ['user_id', 'amount', 'phone_number', 'purpose']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        new_payment = Payment(
            user_id=data['user_id'],
            amount=data['amount'],
            phone_number=data['phone_number'],
            purpose=data['purpose'],
            status='pending',
            transaction_id=f"MPESA-{data['phone_number'][-4:]}-{data['amount']:.0f}"  # placeholder ID(JOY REMEMBER TO CHANGE THIS)
        )
        db.session.add(new_payment)
        db.session.commit()

        return payment_schema.jsonify(new_payment), 201

    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Duplicate transaction or invalid data"}), 400
