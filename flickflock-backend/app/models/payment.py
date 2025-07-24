from app import db
from sqlalchemy import func

class Payment(db.Model):
    __tablename__ = 'payments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    currency = db.Column(db.String(10), default='KES')  # Kenyan Shilling
    status = db.Column(db.String(20), default='pending')  # pending, completed, failed
    purpose = db.Column(db.String(100))  # e.g., 'club_membership', 'premium_upgrade'
    phone_number = db.Column(db.String(15), nullable=False)  # M-Pesa phone
    transaction_id = db.Column(db.String(100), unique=True)  # M-Pesa transaction code
    created_at = db.Column(db.DateTime, default=func.now())

    # Relationship
    user = db.relationship("User", back_populates="payments")
