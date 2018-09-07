import string
import json

from requests_oauthlib import OAuth1Session
from config.props import CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET


def get_resource_tokens():
    # create an object of OAuth1Session
    request_token = OAuth1Session(client_key=CONSUMER_KEY, client_secret=CONSUMER_SECRET)
    # twitter endpoint to get request token
    url = 'https://api.twitter.com/oauth/request_token'

    # get request_token_key, request_token_secret and other details
    data = request_token.get(url)

    # split the string to get relevant data
    data_token = string.split(data.text, '&')
    ro_key = string.split(data_token[0], '=')
    ro_secret = string.split(data_token[1], '=')

    resource_owner_key = ro_key[1]
    resource_owner_secret = ro_secret[1]
    resource = [resource_owner_key, resource_owner_secret]

    return json.dumps(resource)


def verify_credentials_and_get_data():
    oauth_user = OAuth1Session(client_key=CONSUMER_KEY,
                               client_secret=CONSUMER_SECRET,
                               resource_owner_key=ACCESS_TOKEN,
                               resource_owner_secret=ACCESS_TOKEN_SECRET)
    url_user = 'https://api.twitter.com/1.1/account/verify_credentials.json'
    params = {"include_email": 'true'}
    user_data = oauth_user.get(url_user, params=params)

    return user_data.text
