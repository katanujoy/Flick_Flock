from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_migrate import Migrate

db = SQLAlchemy(metadata=metadata)
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)
    api = Api(app)

    from .routes.club_routes import ClubResource
    from .routes.comment_routes import CommentResource
    from .routes.post_routes import PostResource
    from .routes.recommendations_routes import RecommendationResource
    from .routes.watchlists_routes import WatchlistResource
    from .routes.membership_routes import membership_bp
    from .routes.user_routes import user_bp
    app.register_blueprint(user_bp)
    app.register_blueprint(follow_bp)
    app.register_blueprint(movies_bp)
    app.register_blueprint(report_bp)
    app.register_blueprint(movies_series_bp)  

    return app