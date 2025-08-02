from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import MetaData
from flask_cors import CORS
from flask_restful import Api
from datetime import timedelta
from flask_jwt_extended import JWTManager

# Setup metadata naming convention
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s"
})

db = SQLAlchemy(metadata=metadata)
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    # JWT Configuration
    app.config["JWT_SECRET_KEY"] = "supersecretkey"
    app.config["JWT_TOKEN_LOCATION"] = ["headers"]
    app.config["JWT_HEADER_NAME"] = "Authorization"
    app.config["JWT_HEADER_TYPE"] = "Bearer"
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=30)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt = JWTManager(app)

    # ✅ CORS setup: allow frontend dev server (Vite) to make requests
    CORS(
        app,
        resources={r"/api/*": {"origins": "http://localhost:5175"}},
        supports_credentials=True
    )

    # Setup RESTful API
    api = Api(app)

    # Import resources & blueprints
    from .routes.club_routes import ClubResource
    from .routes.comment_routes import CommentResource
    from .routes.post_routes import PostResource, PostDetailResource
    from .routes.recommendations_routes import RecommendationResource, RecommendationDetailResource
    from .routes.watchlists_routes import WatchlistResource
    from .routes.auth_routes import Login
    from .routes.membership_routes import membership_bp
    from .routes.contact_routes import contact_bp
    from .routes.user_routes import user_bp
    from .routes.follow_routes import follow_bp
    from .routes.movie_routes import movies_bp
    from .routes.report_routes import report_bp
    from .routes.mpesadaraja_routes import MpesaDarajaResource

    # Add API endpoints
    api.add_resource(ClubResource, '/api/clubs')
    api.add_resource(CommentResource, '/api/comments')
    api.add_resource(PostResource, '/api/posts')
    api.add_resource(PostDetailResource, '/api/posts/<int:post_id>')
    api.add_resource(RecommendationResource, '/api/recommendations')
    api.add_resource(RecommendationDetailResource, '/api/recommendations/<int:recommendation_id>')
    api.add_resource(WatchlistResource, '/api/watchlist')
    api.add_resource(Login, "/api/login")  # ✅ Updated to have /api prefix
    api.add_resource(MpesaDarajaResource, '/api/mpesa/stkpush')

    # Register blueprints
    app.register_blueprint(membership_bp)
    app.register_blueprint(contact_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(follow_bp)
    app.register_blueprint(movies_bp)
    app.register_blueprint(report_bp)

    return app
