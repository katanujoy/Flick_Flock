from app import db
from sqlalchemy import func
from sqlalchemy_serializer import SerializerMixin

class Watchlist(db.Model, SerializerMixin):
    __tablename__ = "watchlists"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    movie_series_id = db.Column(db.Integer, db.ForeignKey('movie_series.id'), nullable=False)    
    status = db.Column(db.String(20), nullable=False)
    notes = db.Column(db.Text)
    added_at = db.Column(db.DateTime, default=func.now())


    # Relationships
    user = db.relationship("User", back_populates = "watchlists")
    movie_series = db.relationship("MovieSeries", back_populates = "watchlists")

    def __repr__(self):
        return f"<Watchlist id={self.id} user_id={self.user_id} movie_series_id={self.movie_series_id} status={self.status}>"
