from app import db
from sqlalchemy import func
from sqlalchemy_serializer import SerializerMixin

class Comment(db.Model, SerializerMixin):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    content = db.Column(db.String)    
    created_at = db.Column(db.DateTime, default=func.now())

    # Relationships
    user = db.relationship("User", back_populates="comments")
    post = db.relationship("Post", back_populates="comments")

    def __repr__(self):
        return f"<Comment id={self.id} user_id={self.user_id} post_id={self.post_id} content={self.content} created_at={self.created_at}>"