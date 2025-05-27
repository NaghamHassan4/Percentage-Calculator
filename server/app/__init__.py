from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO
import secrets

db = SQLAlchemy()
socketio = SocketIO(cors_allowed_origins="*", async_mode='threading')

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = secrets.token_hex(16)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///marketeers_app.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    CORS(app, supports_credentials=True)
    db.init_app(app)
    socketio.init_app(app)

    from app.routes.auth_routes import auth_bp
    from app.routes.data_routes import data_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(data_bp, url_prefix='/api/data')

    from app.sockets import register_socket_events
    register_socket_events(socketio)

    from flask import jsonify
    @app.route('/health', methods=['GET'])
    def health_check():
        return jsonify({
            'status': 'healthy',
            'websocket': 'enabled'
        })

    with app.app_context():
        from app.models import DataItem
        db.create_all()
        if DataItem.query.count() == 0:
            db.session.add_all([
                DataItem(db_value=v) for v in [15.0, 25.0, 12.0, 85.0, 50.0, 800.0, 75.0, 92.0]
            ])
            db.session.commit()

    return app
