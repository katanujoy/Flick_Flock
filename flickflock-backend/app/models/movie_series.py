from app import db
from app.models.user import user_likes

class MovieSeries(db.Model):
    __tablename__ = 'movies_series'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    genre = db.Column(db.String(50))
    type = db.Column(db.String(10), nullable=False) 
    release_year = db.Column(db.Integer)
    poster_url = db.Column(db.String) 
    download_link = db.Column(db.String) 

    # Relationships
    liked_by_users = db.relationship('User', secondary=user_likes, back_populates='liked_content')
    posts = db.relationship('Post', back_populates='movie_series', cascade="all, delete-orphan")
    watchlists = db.relationship('Watchlist', back_populates='movie_series', cascade="all, delete-orphan")
    recommendations = db.relationship('Recommendation', back_populates='movie_series', cascade="all, delete-orphan")

    def __repr__(self):
        return f"<MovieSeries {self.title} ({self.type})>"