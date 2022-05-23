#!/usr/bin/env python3
import os
import time
from uuid import uuid4

from flask import Flask, abort, request, jsonify, g, url_for
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_httpauth import HTTPBasicAuth
from flask_cors import CORS
import jwt
from sqlalchemy import ForeignKey, Table, create_engine
from sqlalchemy.orm import relationship, sessionmaker, scoped_session
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.ext.declarative import declarative_base
from authlib.integrations.flask_client import OAuth

Base = declarative_base()

# initialization
app = Flask(__name__, static_url_path='', static_folder='./static')
app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy dog'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
CORS(app)

# extensions
db = SQLAlchemy(app)
migrate = Migrate(app, db)
auth = HTTPBasicAuth()
oauth = OAuth(app)

engine = create_engine('sqlite:///db.sqlite3', connect_args={'check_same_thread': False})
Session = sessionmaker(bind=engine, autocommit=False, autoflush=False)
LocalSession = scoped_session(Session)
Base.query = LocalSession.query_property()


class User(Base):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(128), index=True)
    avatar_path = db.Column(db.String(512),
                            default="https://globalassets.starbucks.com/assets/f12bc8af498d45ed92c5d6f1dac64062.jpg")
    firstName = db.Column(db.String(32))
    lastName = db.Column(db.String(32))
    password_hash = db.Column(db.String(128))
    orders = relationship("Order")

    def hash_password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def generate_auth_token(self, expires_in=600000):
        return jwt.encode(
            {'id': self.id, 'exp': time.time() + expires_in},
            app.config['SECRET_KEY'], algorithm='HS256')

    @staticmethod
    def verify_auth_token(token):
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'],
                              algorithms=['HS256'])
        except:
            return
        return User.query.get(data['id'])

    def to_json(self):
        return {
            "id": self.id,
            "email": self.email,
            "avatar_path": self.avatar_path if self.avatar_path.startswith('http') else f"http://localhost:5000{self.avatar_path}",
            "firstName": self.firstName,
            "lastName": self.lastName
        }


class Order(Base):
    __tablename__ = "order"
    id = db.Column(db.Integer, primary_key=True)
    productId = db.Column(db.String(12))
    isCold = db.Column(db.Boolean, default=False)
    isCreamy = db.Column(db.Boolean, default=False)
    size = db.Column(db.String(3))
    quantity = db.Column(db.Integer)
    nbSugars = db.Column(db.Integer)
    nbIces = db.Column(db.Integer, default=0)
    price = db.Column(db.Integer, default=1)
    storeAddress = db.Column(db.String(52), default="12 rue de Bellecour, 69002 Lyon")
    user_id = db.Column(db.Integer, ForeignKey('users.id'))

    def to_json(self):
        return {
            "id": self.id,
            "productId": self.productId,
            "isCold": self.isCold,
            "isCreamy": self.isCreamy,
            "size": self.size,
            "quantity": self.quantity,
            "nbSugars": self.nbSugars,
            "nbIces": self.nbIces,
            "price": self.price,
            "storeAddress": self.storeAddress
        }


@auth.verify_password
def verify_password(email_or_token, password):
    # first try to authenticate by token
    user = User.verify_auth_token(email_or_token)
    if not user:
        # try to authenticate with email/password
        user = User.query.filter_by(email=email_or_token).first()
        if not user or not user.verify_password(password):
            return False
    g.user = user
    return True


@app.route('/api/users', methods=['POST'])
def new_user():
    email = request.json.get('email')
    password = request.json.get('password')
    firstName = request.json.get('firstName')
    lastName = request.json.get('lastName')
    if email is None or password is None:
        abort(400)  # missing arguments
    if User.query.filter_by(email=email).first() is not None:
        abort(400)  # existing user
    user = User(email=email, firstName=firstName, lastName=lastName)
    user.hash_password(password)

    db.session.add(user)
    db.session.commit()
    return (user.to_json(), 201,
            {'Location': url_for('get_user', id=user.id, _external=True)})


@app.route('/facebook/')
def facebook():
    # Facebook Oauth Config
    FACEBOOK_CLIENT_ID = "1066263394311051"
    FACEBOOK_CLIENT_SECRET = '5a68c4569231878ed1d58803bf56d578'
    oauth.register(
        name='facebook',
        client_id=FACEBOOK_CLIENT_ID,
        client_secret=FACEBOOK_CLIENT_SECRET,
        access_token_url='https://graph.facebook.com/oauth/access_token',
        access_token_params=None,
        authorize_url='https://www.facebook.com/dialog/oauth',
        authorize_params=None,
        api_base_url='https://graph.facebook.com/',
        client_kwargs={'scope': 'email'},
    )
    redirect_uri = url_for('facebook_auth', _external=True)
    return oauth.facebook.authorize_redirect(redirect_uri)


@app.route('/facebook/auth/')
def facebook_auth():
    token = oauth.facebook.authorize_access_token()
    resp = oauth.facebook.get(
        'https://graph.facebook.com/me?fields=id,name,email,picture{url}')
    profile = resp.json()

    print("Facebook User ", profile)
    user = User.query.filter_by(email=profile.get("email")).first()
    if user is None:
        firstName, lastName = profile.get("name").split()
        user = User(email=profile.get("email"), firstName=firstName, lastName=lastName, avatar_path=profile["picture"]["data"]["url"])
        db.session.add(user)
        db.session.commit()
    localToken = user.generate_auth_token(600000)

    return jsonify("token", localToken.decode('ascii'))

@app.route('/google/')
def google():

    # Google Oauth Config
    # Get client_id and client_secret from environment variables
    # For developement purpose you can directly put it
    # here inside double quotes
    GOOGLE_CLIENT_ID = "427462438516-p75iidujcpba0kb2nocek901j7v2937j.apps.googleusercontent.com"
    GOOGLE_CLIENT_SECRET = "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"

    CONF_URL = 'https://accounts.google.com/.well-known/openid-configuration'
    oauth.register(
        name='google',
        client_id=GOOGLE_CLIENT_ID,
        client_secret=GOOGLE_CLIENT_SECRET,
        server_metadata_url=CONF_URL,
        client_kwargs={
            'scope': 'openid email profile'
        }
    )

    # Redirect to google_auth function
    redirect_uri = url_for('google_auth', _external=True)
    return oauth.google.authorize_redirect(redirect_uri)

@app.route('/google/auth/')
def google_auth():
    token = oauth.google.authorize_access_token()
    userInfo = oauth.google.parse_id_token(token, None)

    user = User.query.filter_by(email=userInfo.get("email")).first()

    if not user:
        user = User(email=userInfo.get("email"),
                    firstName=userInfo.get("family_name"), lastName=userInfo.get("given_name"),
                    avatar_path=userInfo["picture"])
        db.session.add(user)
        db.session.commit()
    localToken = user.generate_auth_token(600000)

    return jsonify("token", localToken.decode('ascii'))


@app.route('/api/users', methods=['GET'])
@auth.login_required
def get_info_current_user():
    user = User.verify_auth_token(auth.current_user())

    return user.to_json()


@app.route('/api/users', methods=["UPDATE", "PUT"])
@auth.login_required
def update_user():

    form = request.form.to_dict()

    user = User.query.get(form.get("id"))
    user.firstName = form["firstName"] if form.get("firstName") else user.firstName
    user.lastName = form["lastName"] if form.get("lastName") else user.lastName
    user.email = form["email"] if form.get("email") else user.email
    user.password_hash = user.hash_password(form["password"]) if form.get("password") else user.password_hash

    if request.files.get("avatar_path"):
        file = request.files["avatar_path"]
        filename = os.path.join('static', f"{uuid4()}_{file.filename}")

        file.save(filename)
        user.avatar_path = filename

    LocalSession.commit()
    return user.to_json()


@app.route('/api/users/<int:id>')
def get_user(id):
    user = User.query.get(id)
    if not user:
        abort(400)
    return jsonify({'email': user.email,
                    'firstName': user.firstName,
                    'lastName': user.lastName})


@app.route('/api/token')
@auth.login_required
def get_auth_token():
    token = g.user.generate_auth_token(600000)
    return jsonify({'token': token.decode('ascii'), 'duration': 600000})


@app.route('/api/resource')
@auth.login_required
def get_resource():
    return jsonify({'data': 'Hello, %s!' % g.user.email})


@app.route('/api/order', methods=['POST'])
@auth.login_required
def post_order():
    user = User.verify_auth_token(auth.current_user())

    orders = request.json.get("orders")
    for order_json in orders:
        order = Order(productId=order_json.get("productId", "0"),
                      isCold=order_json.get("isCold", False),
                      isCreamy=order_json.get("isCreamy", True),
                      size=order_json.get("size", "M"),
                      quantity=order_json.get("quantity", 1),
                      nbSugars=order_json.get("nbSugars", 1),
                      nbIces=order_json.get("nbIces"),
                      price=order_json.get("price", 1),
                      storeAddress=order_json.get("storeAddress"),
                      user_id=user.id)
        db.session.add(order)
    db.session.commit()
    return jsonify("orders", orders)


@app.route('/api/order')
@auth.login_required
def get_order():
    user = User.verify_auth_token(auth.current_user())
    order = db.session.query(Order).filter_by(user_id=user.id, id=request.json.get("orderId")).first()
    if not order:
        return abort(404)
    return order.to_json()


@app.route('/api/order', methods=["DELETE"])
@auth.login_required
def delete_order():
    user = User.verify_auth_token(auth.current_user())
    order = db.session.query(Order).filter_by(user_id=user.id, id=request.json.get("orderId")).first()

    if not order:
        return abort(404)

    db.session.delete(order)
    db.session.commit()
    return order.to_json()


@app.route('/api/orders')
@auth.login_required
def get_all_orders():
    user = User.verify_auth_token(auth.current_user())
    orders = Order.query.filter_by(user_id=user.id)
    return {"orders": [order.to_json() for order in orders]}, 200


if __name__ == '__main__':
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)
    migrate.init_app(app, db)
    app.run(debug=True)
