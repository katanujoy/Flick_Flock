from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_migrate import Migrate
from flask_cors import CORS
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import MetaData

# Setup metadata naming convention
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s"
})

db = SQLAlchemy(metadata=metadata)
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    app.config["JWT_SECRET_KEY"] = "supersecretkey"  
    app.config["JWT_TOKEN_LOCATION"] = ["headers"]
    app.config["JWT_HEADER_NAME"] = "Authorization"
    app.config["JWT_HEADER_TYPE"] = "Bearer"
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = 18000

    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)
    api = Api(app)

    from flask_jwt_extended import JWTManager
    jwt = JWTManager(app)

    # Import routes/resources here to avoid circular imports
    from .routes.club_routes import ClubResource
    from .routes.comment_routes import CommentResource
    from .routes.post_routes import PostResource
    from .routes.recommendations_routes import RecommendationResource
    from .routes.watchlists_routes import WatchlistResource
    from .routes.auth_routes import Login
    from .routes.membership_routes import membership_bp
    from .routes.user_routes import user_bp
    from .routes.follow_routes import follow_bp
    from .routes.movie_routes import movies_bp
    from .routes.report_routes import report_bp
    from .routes.mpesadaraja_routes import MpesaDarajaResource

    api.add_resource(ClubResource, '/clubs')
    api.add_resource(CommentResource, '/comments')
    api.add_resource(PostResource, '/posts')
    api.add_resource(RecommendationResource, '/recommendations')
    api.add_resource(WatchlistResource, '/watchlist')
    api.add_resource(Login, "/login")
    api.add_resource(MpesaDarajaResource, '/mpesa/stkpush')
    app.register_blueprint(membership_bp)    
    app.register_blueprint(user_bp)
    app.register_blueprint(follow_bp)
    app.register_blueprint(movies_bp)
    app.register_blueprint(report_bp)

    return app