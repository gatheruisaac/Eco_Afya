from flask import Blueprint, jsonify, request, session
from app import db, bcrypt
from app.models import User


main = Blueprint("main", __name__)


@main.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Eco Afya Phase 2 API is running"
    })


@main.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy"
    })


@main.route("/signup", methods=["POST"])
def signup():
    data = request.get_json() or {}

    username = data.get("username", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not username or not email or not password:
        return jsonify({
            "error": "Username, email, and password are required"
        }), 400

    if len(password) < 6:
        return jsonify({
            "error": "Password must be at least 6 characters"
        }), 400

    existing_user = User.query.filter(
        (User.username == username) | (User.email == email)
    ).first()

    if existing_user:
        return jsonify({
            "error": "Username or email already exists"
        }), 409

    password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    user = User(
        username=username,
        email=email,
        password_hash=password_hash
    )

    db.session.add(user)
    db.session.commit()

    session["user_id"] = user.id

    return jsonify({
        "message": "Account created successfully",
        "user": user.to_dict()
    }), 201


@main.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}

    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not email or not password:
        return jsonify({
            "error": "Email and password are required"
        }), 400

    user = User.query.filter_by(email=email).first()

    if not user or not bcrypt.check_password_hash(
        user.password_hash,
        password
    ):
        return jsonify({
            "error": "Invalid email or password"
        }), 401

    session["user_id"] = user.id

    return jsonify({
        "message": "Login successful",
        "user": user.to_dict()
    }), 200


@main.route("/check-session", methods=["GET"])
def check_session():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({
            "authenticated": False
        }), 200

    user = db.session.get(User, user_id)

    if not user:
        session.clear()

        return jsonify({
            "authenticated": False
        }), 200

    return jsonify({
        "authenticated": True,
        "user": user.to_dict()
    }), 200


@main.route("/logout", methods=["POST"])
def logout():
    session.clear()

    return jsonify({
        "message": "Logged out successfully"
    }), 200