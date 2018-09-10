from flask import Flask, request
from source import account_tweet, resource_tokens
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/kb/*": {"origins": "*"}})


@app.route("/kb/xping", methods=['GET'])
def index():
    return 'pong'


@app.route("/kb/tweetToApplication", methods=['POST'])
def tweet_to_account():
    return account_tweet.tweet_to_main_account(request.form)


@app.route("/kb/getToken", methods=['GET'])
def get_token():
    return resource_tokens.get_resource_tokens()


# @app.route("/kb/getUserData", methods=['GET'])
# def get_user_data():
#     return resource_tokens.verify_credentials_and_get_data()


@app.route("/kb/fetchUserData", methods=['GET'])
def fetch_user_data_tokens():
    return resource_tokens.fetch_access_tokens(request.args)


if __name__ == "__main__":
        app.run(debug=True)
