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

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "username": self.user.username if self.user else None,
            "club_id": self.club_id,
            "club_name": self.club.name if self.club else None,
            "role": self.role,
            "joined_at": self.joined_at.isoformat() if self.joined_at else None
        }
