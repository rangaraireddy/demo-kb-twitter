from flask import Flask, request
from source import account_tweet, resource_tokens

app = Flask(__name__)


@app.route("/xping", methods=['GET'])
def index():
    return 'pong'


@app.route("/tweetToApplication", methods=['POST'])
def tweet_to_rrr():
    return account_tweet.tweet_to_main_account(request.form)


@app.route("/getToken", methods=['GET'])
def get_token():
    return resource_tokens.get_resource_tokens()


@app.route("/getUserData", methods=['GET'])
def get_user_data():
    return resource_tokens.verify_credentials_and_get_data()


if __name__ == "__main__":
        app.run(debug=True)
