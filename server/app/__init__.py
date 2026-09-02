import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_cors import CORS

from config import Config


db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()


def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)

    allowed_origins = [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://eco-afya.vercel.app",
    ]

    extra_origins = os.getenv("FRONTEND_URL", "")

    allowed_origins.extend(
        origin.strip()
        for origin in extra_origins.split(",")
        if origin.strip()
    )

    CORS(
        app,
        supports_credentials=True,
        origins=allowed_origins,
    )

    from app.routes import main
    app.register_blueprint(main)

    return app