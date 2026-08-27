from flask import Blueprint, jsonify


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