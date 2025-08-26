from app import db
from sqlalchemy import func
from sqlalchemy_serializer import SerializerMixin

class Watchlist(db.Model,SerializerMixin):
    __tablename__ = "watchlist"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    movie_series_id = db.Column(db.Integer, db.ForeignKey('movies_series.id'), nullable=False)

    user = db.relationship('User', back_populates='watchlist')
    movie_series = db.relationship('MovieSeries', back_populates='watchlists')


    # Relationships
    user = db.relationship("User", back_populates="watchlists")
    movie_series = db.relationship("MovieSeries", back_populates="watchlists")

    def __repr__(self):
        return f"<Watchlist id={self.id} user_id={self.user_id} movie_series_id={self.movie_series_id} status={self.status}>"