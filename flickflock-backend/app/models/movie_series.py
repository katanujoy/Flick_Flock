from app import db

class MovieSeries(db.Model):
    __tablename__ = 'movies_series'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    genre = db.Column(db.String(50))
    type = db.Column(db.String(10), nullable=False)  # 'movie' or 'series'

    liked_by = db.relationship("User", secondary='likes', back_populates="liked")
    reports = db.relationship("Report", back_populates="movie", cascade="all, delete-orphan")
