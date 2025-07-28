from app import db
from sqlalchemy_serializer import serializerMixin


class Payment(db.Model,serializerMixin):
    __tablename__ = 'mpesa'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)


    def __repl__(self):
        return f"<Id: {self.id} || {self.user_id} || {self.amount}>"