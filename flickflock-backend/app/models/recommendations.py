from app import db
from sqlalchemy import func
from sqlalchemy_serializer import SerializerMixin

class Recommendation(db.Model, SerializerMixin):
    __tablename__ = "recommendations"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    movie_series_id = db.Column(db.Integer, db.ForeignKey('movies_series.id'), nullable=False)
    recommended_reason = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=func.now())


    # Relationships
    user = db.relationship("User", back_populates = "recommendations")
    movie_series = db.relationship("Movie_series", back_populates = "recommendations")


    def __repr__(self):
        return (
            f"<Recommendation id={self.id} user_id={self.user_id} "
            f"movie_series_id={self.movie_series_id} reason={self.recommended_reason} timestamp={self.created_at}>"
        )
