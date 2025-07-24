from app import db
from sqlalchemy import func

class Membership(db.Model):
    __tablename__ = 'memberships'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    club_id = db.Column(db.Integer, db.ForeignKey('clubs.id'), nullable=False)
    role = db.Column(db.String(50))
    joined_at = db.Column(db.DateTime, default=func.now())

    # Relationships
    user = db.relationship("User", back_populates="memberships")
    club = db.relationship("Club", back_populates="memberships")
    