from app import db

class Follow(db.Model):
    __tablename__ = 'follows'

    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    followed_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    # Relationship to the follower (user who follows someone)
    follower = db.relationship(
        'User',
        foreign_keys=[follower_id],
        backref=db.backref('following', lazy='dynamic')
    )

    # Relationship to the followed (user being followed)
    followed = db.relationship(
        'User',
        foreign_keys=[followed_id],
        backref=db.backref('followers', lazy='dynamic')
    )
    follower = db.relationship('User', foreign_keys=[follower_id], back_populates='following')
    followed = db.relationship('User', foreign_keys=[followed_id], back_populates='followers')
