from ..config import db
from sqlalchemy import func
from sqlalchemy_serializer import Serializermixin

class Club(db.Model, Serializermixin):
    __tablename__ = "clubs"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    genre = db.Column(db.String)
    created_by = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=func.now())


    # Relationships
    user = db.relationship("User", back_populates = "clubs")


    def __repr__(self):
        return f"<Club id={self.id}, name={self.name}, description={self.description}, genre={self.genre}, created_by={self.created_by}, created_at={self.created_at}>"
