from app import db
from werkzeug.security import check_password_hash

# Association table for user likes (many-to-many with MovieSeries)
user_likes = db.Table(
    'user_likes',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('movie_series_id', db.Integer, db.ForeignKey('movies_series.id'), primary_key=True)
)

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    bio = db.Column(db.Text)
    favorite_genres = db.Column(db.JSON)
    created_at = db.Column(db.DateTime, default=db.func.now())

    # Relationships
    posts = db.relationship('Post', back_populates='user', cascade="all, delete-orphan")
    comments = db.relationship('Comment', back_populates='user', cascade="all, delete-orphan")
    clubs = db.relationship('Club', back_populates='user', cascade="all, delete-orphan")
    memberships = db.relationship('Membership', back_populates='user', cascade="all, delete-orphan")
    watchlists = db.relationship('Watchlist', back_populates='user', cascade="all, delete-orphan")
    recommendations = db.relationship('Recommendation', back_populates='user', cascade="all, delete-orphan")
    liked_content = db.relationship('MovieSeries', secondary=user_likes, back_populates='liked_by_users')
    followers = db.relationship('Follow', foreign_keys='Follow.followed_id', back_populates='followed', cascade="all, delete-orphan")
    following = db.relationship('Follow', foreign_keys='Follow.follower_id', back_populates='follower', cascade="all, delete-orphan")
    reports = db.relationship('Report', back_populates='user', cascade="all, delete-orphan")

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f"<User {self.username}>"