from functools import wraps

from flask import Blueprint, jsonify, request, session
from app import bcrypt, db
from app.models import User, FoodLog

main = Blueprint("main", __name__)


def login_required(route_function):
    @wraps(route_function)
    def wrapped(*args, **kwargs):
        user_id = session.get("user_id")

        if not user_id:
            return jsonify({
                "error": "Authentication required"
            }), 401

        return route_function(*args, **kwargs)

    return wrapped


@main.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy"}), 200


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

    if User.query.filter_by(username=username).first():
        return jsonify({
            "error": "Username already exists"
        }), 409

    if User.query.filter_by(email=email).first():
        return jsonify({
            "error": "Email already exists"
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
        "message": "Signup successful",
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


@main.route("/food-logs", methods=["GET"])
@login_required
def get_food_logs():
    user_id = session["user_id"]

    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 10, type=int)

    page = max(page, 1)
    per_page = min(max(per_page, 1), 50)

    pagination = (
        FoodLog.query
        .filter_by(user_id=user_id)
        .order_by(FoodLog.created_at.desc())
        .paginate(
            page=page,
            per_page=per_page,
            error_out=False
        )
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
            "pages": pagination.pages
        }
    }), 200


@main.route("/food-logs", methods=["POST"])
@login_required
def create_food_log():
    data = request.get_json() or {}

    product_name = data.get("product_name", "").strip()

    if not product_name:
        return jsonify({
            "error": "Product name is required"
        }), 400

    rating = data.get("rating")

    if rating is not None:
        try:
            rating = int(rating)
        except (TypeError, ValueError):
            return jsonify({
                "error": "Rating must be a number"
            }), 400

        if rating < 1 or rating > 5:
            return jsonify({
                "error": "Rating must be between 1 and 5"
            }), 400

    food_log = FoodLog(
        product_name=product_name,
        barcode=data.get("barcode"),
        notes=data.get("notes"),
        rating=rating,
        user_id=session["user_id"]
    )

    db.session.add(food_log)
    db.session.commit()

    return jsonify({
        "message": "Food log created successfully",
        "food_log": food_log.to_dict()
    }), 201


@main.route("/food-logs/<int:food_log_id>", methods=["GET"])
@login_required
def get_food_log(food_log_id):
    food_log = db.session.get(FoodLog, food_log_id)

    if not food_log:
        return jsonify({
            "error": "Food log not found"
        }), 404

    if food_log.user_id != session["user_id"]:
        return jsonify({
            "error": "You do not have permission to access this food log"
        }), 403

    return jsonify({
        "food_log": food_log.to_dict()
    }), 200


@main.route("/food-logs/<int:food_log_id>", methods=["PATCH"])
@login_required
def update_food_log(food_log_id):
    food_log = db.session.get(FoodLog, food_log_id)

    if not food_log:
        return jsonify({
            "error": "Food log not found"
        }), 404

    if food_log.user_id != session["user_id"]:
        return jsonify({
            "error": "You do not have permission to update this food log"
        }), 403

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
        rating = data["rating"]

        if rating is not None:
            try:
                rating = int(rating)
            except (TypeError, ValueError):
                return jsonify({
                    "error": "Rating must be a number"
                }), 400

            if rating < 1 or rating > 5:
                return jsonify({
                    "error": "Rating must be between 1 and 5"
                }), 400

        food_log.rating = rating

    db.session.commit()

    return jsonify({
        "message": "Food log updated successfully",
        "food_log": food_log.to_dict()
    }), 200


@main.route("/food-logs/<int:food_log_id>", methods=["DELETE"])
@login_required
def delete_food_log(food_log_id):
    food_log = db.session.get(FoodLog, food_log_id)

    if not food_log:
        return jsonify({
            "error": "Food log not found"
        }), 404

    if food_log.user_id != session["user_id"]:
        return jsonify({
            "error": "You do not have permission to delete this food log"
        }), 403

    db.session.delete(food_log)
    db.session.commit()

    return jsonify({
        "message": "Food log deleted successfully"
    }), 200
