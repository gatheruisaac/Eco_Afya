from flask import Blueprint, jsonify, request, session
from app import db, bcrypt
from app.models import User, FoodLog

main = Blueprint("main", __name__)


# -------------------------
# Health Check
# -------------------------

@main.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy"}), 200


# -------------------------
# Authentication
# -------------------------

@main.route("/signup", methods=["POST"])
def signup():
    data = request.get_json() or {}

    username = data.get("username", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not username or not email or not password:
        return jsonify({
            "error": "Username, email and password are required"
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

    return jsonify({
        "message": "Account created successfully",
        "user": user.to_dict()
    }), 201


@main.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}

    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

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


@main.route("/logout", methods=["POST"])
def logout():
    session.clear()

    return jsonify({
        "message": "Logged out successfully"
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


# -------------------------
# FoodLog Helper
# -------------------------

def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return None

    return db.session.get(User, user_id)


# -------------------------
# FoodLog CRUD
# -------------------------

@main.route("/food-logs", methods=["GET"])
def get_food_logs():
    user = get_current_user()

    if not user:
        return jsonify({
            "error": "Authentication required"
        }), 401

    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 10, type=int)

    page = max(page, 1)
    per_page = min(max(per_page, 1), 50)

    pagination = FoodLog.query.filter_by(
        user_id=user.id
    ).order_by(
        FoodLog.created_at.desc()
    ).paginate(
        page=page,
        per_page=per_page,
        error_out=False
    )

    return jsonify({
        "food_logs": [
            food_log.to_dict()
            for food_log in pagination.items
        ],
        "pagination": {
            "page": pagination.page,
            "per_page": pagination.per_page,
            "total": pagination.total,
            "pages": pagination.pages,
            "has_next": pagination.has_next,
            "has_prev": pagination.has_prev
        }
    }), 200


@main.route("/food-logs", methods=["POST"])
def create_food_log():
    user = get_current_user()

    if not user:
        return jsonify({
            "error": "Authentication required"
        }), 401

    data = request.get_json() or {}

    product_name = data.get("product_name", "").strip()

    if not product_name:
        return jsonify({
            "error": "Product name is required"
        }), 400

    food_log = FoodLog(
        product_name=product_name,
        barcode=data.get("barcode"),
        notes=data.get("notes"),
        rating=data.get("rating"),
        user_id=user.id
    )

    db.session.add(food_log)
    db.session.commit()

    return jsonify({
        "message": "Food log created successfully",
        "food_log": food_log.to_dict()
    }), 201


@main.route("/food-logs/<int:food_log_id>", methods=["GET"])
def get_food_log(food_log_id):
    user = get_current_user()

    if not user:
        return jsonify({
            "error": "Authentication required"
        }), 401

    food_log = FoodLog.query.filter_by(
        id=food_log_id,
        user_id=user.id
    ).first()

    if not food_log:
        return jsonify({
            "error": "Food log not found"
        }), 404

    return jsonify({
        "food_log": food_log.to_dict()
    }), 200


@main.route("/food-logs/<int:food_log_id>", methods=["PATCH"])
def update_food_log(food_log_id):
    user = get_current_user()

    if not user:
        return jsonify({
            "error": "Authentication required"
        }), 401

    food_log = FoodLog.query.filter_by(
        id=food_log_id,
        user_id=user.id
    ).first()

    if not food_log:
        return jsonify({
            "error": "Food log not found"
        }), 404

    data = request.get_json() or {}

    if "product_name" in data:
        product_name = str(data["product_name"]).strip()

        if not product_name:
            return jsonify({
                "error": "Product name cannot be empty"
            }), 400

        food_log.product_name = product_name

    if "barcode" in data:
        food_log.barcode = data["barcode"]

    if "notes" in data:
        food_log.notes = data["notes"]

    if "rating" in data:
        food_log.rating = data["rating"]

    db.session.commit()

    return jsonify({
        "message": "Food log updated successfully",
        "food_log": food_log.to_dict()
    }), 200


@main.route("/food-logs/<int:food_log_id>", methods=["DELETE"])
def delete_food_log(food_log_id):
    user = get_current_user()

    if not user:
        return jsonify({
            "error": "Authentication required"
        }), 401

    food_log = FoodLog.query.filter_by(
        id=food_log_id,
        user_id=user.id
    ).first()

    if not food_log:
        return jsonify({
            "error": "Food log not found"
        }), 404

    db.session.delete(food_log)
    db.session.commit()

    return "", 204