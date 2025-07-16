from ..config import db
from sqlalchemy import func
from sqlalchemy_serializer import Serializermixin

class Posts(db.Model, Serializermixin):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'), nullable=False)
    club_id = db.Column(db.Integer,db.ForeignKey('clubs.id'), nullable=False)
    movie_series_id = db.Column(db.Integer,db.ForeignKey('movie_series.id'), nullable=False)
    content = db.Column(db.String)
    rating = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=func.now())

    # Relationships
    user = db.relationship("User", back_populates = "posts")
    club = db.relationship("Club", back_populates = "posts")
    movie_series = db.relationship("Movie_series", back_populates = "posts")

    def __repr__(self):
        return f"<Post id={self.id} || user_id:{self.user_id} || post_id:{self.post_id} || movies_series_id:{self.movies_series_id} ||content={self.content} || rating={self.rating} || timestamp={self.created_at}"