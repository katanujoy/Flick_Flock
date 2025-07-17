from app import db

# Association table for user likes (many-to-many)
user_likes = db.Table('user_likes',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('content_id', db.Integer, db.ForeignKey('movies_series.id'), primary_key=True)
)

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    # Relationships
    reviews = db.relationship('Review', back_populates='user', cascade="all, delete-orphan")
    liked_content = db.relationship('MovieSeries', secondary=user_likes, back_populates='liked_by_users')

    def __repr__(self):
        return f'<User {self.username}>'
