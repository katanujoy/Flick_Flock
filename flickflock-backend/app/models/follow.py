from app import db

class Follow(db.Model):
    __tablename__ = 'follows'

    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    followed_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    follower = db.relationship('User', foreign_keys=[follower_id], back_populates='following')
    followed = db.relationship('User', foreign_keys=[followed_id], back_populates='followers')

    def __repr__(self):
        return f"<Follow {self.follower_id} -> {self.followed_id}>"

    def serialize(self):
        return {
            'id': self.id,
            'follower_id': self.follower_id,
            'follower_username': self.follower.username if self.follower else None,
            'followed_id': self.followed_id,
            'followed_username': self.followed.username if self.followed else None,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
