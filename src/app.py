"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_jwt_extended import JWTManager, create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_cors import CORS
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

app.config["JWT_SECRET_KEY"] = "limon"
jwt = JWTManager(app)

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False



MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

CORS(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

@app.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    existing_user = User.query.filter_by(email=email).first()

    if email and password:

        if existing_user:
            # The user was not found on the database
            return jsonify({"msg": "Usuario ya existente"}), 401
        else:
            # Create a new token with the user id inside
            new_user = User(email=email,password=password)
 
            db.session.add(new_user)
            db.session.commit()

            access_token = create_access_token(identity=new_user.id)

            return jsonify({ "message":"Usuario creado", "token": access_token, "user_id": new_user.id }), 201
    else:
        return jsonify({"msg": "Campos incompletos"}), 401
    

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    # Query your database for email and password
    user = User.query.filter_by(email=email, password=password).first()

    if user:
        
        # Create a new token with the user id inside
        access_token = create_access_token(identity=user.id)
        return jsonify({ "message":"Inicio de sesión correcto","token": access_token, "user_id": user.id })
    
    else:
        # The user was not found on the database
        return jsonify({"message": "Usuario no existe"}), 401


# Protect a route with jwt_required, which will kick out requests without a valid JWT
@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user:
        return jsonify({"Usuario logeado": True, "id": user.id }), 200
    else:
        return jsonify({"Usuario logeado": False, "message": "No autorizada"}), 400
    

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
